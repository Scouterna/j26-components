import {
  Component,
  type ComponentInterface,
  Element,
  Event,
  type EventEmitter,
  Host,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "scout-tabbed-view",
  styleUrl: "tabbed-view.css",
  shadow: true,
})
export class ScoutTabbedView implements ComponentInterface {
  @Element() el!: HTMLElement;

  /**
   * Zero-based index of the currently active panel.
   */
  @Prop() public value: number = 0;

  /**
   * The `id` of the associated `scout-tabs` element. When omitted the component
   * looks for a preceding `scout-tabs` sibling automatically.
   */
  @Prop() public tabsId?: string;

  /**
   * Emitted when a swipe gesture completes and lands on a different panel.
   */
  @Event() public scoutChange!: EventEmitter<{ value: number }>;

  /**
   * Emitted continuously during a swipe with a fractional panel index,
   * suitable for driving the `swipe-value` prop on `scout-tabs`.
   */
  @Event() public scoutSwipeProgress!: EventEmitter<{ swipeValue: number }>;

  @State() private dragOffsetPx: number = 0;
  @State() private isDragging: boolean = false;
  @State() private activeIndex: number = 0;

  private linkedTabsId: string = "";

  componentWillLoad() {
    this.activeIndex = this.value;
  }

  componentDidLoad() {
    this.linkedTabsId =
      this.tabsId ??
      (this.el.previousElementSibling?.tagName === "SCOUT-TABS"
        ? (this.el.previousElementSibling as HTMLElement).id
        : "");
    this.updatePanelAttributes();
  }

  @Watch("value")
  onValueChange() {
    this.activeIndex = this.value;
    this.updatePanelAttributes();
  }

  private updatePanelAttributes() {
    Array.from(this.el.children).forEach((child, i) => {
      const panel = child as HTMLElement;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("tabindex", i === this.value ? "0" : "-1");
      if (this.linkedTabsId) {
        panel.setAttribute("id", `${this.linkedTabsId}-panel-${i}`);
        panel.setAttribute(
          "aria-labelledby",
          `${this.linkedTabsId}-tab-${i}`,
        );
      }
    });
  }

  private startX: number = 0;
  private startY: number = 0;
  private dragIntentDetermined: boolean = false;
  private isHorizontalDrag: boolean = false;
  private trackEl?: HTMLDivElement;

  private get tabCount(): number {
    return this.el.children.length;
  }

  private get containerWidth(): number {
    return this.trackEl?.offsetWidth ?? this.el.offsetWidth;
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.dragIntentDetermined = false;
    this.isHorizontalDrag = false;
    this.dragOffsetPx = 0;
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    if (!this.dragIntentDetermined) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      this.dragIntentDetermined = true;
      this.isHorizontalDrag = Math.abs(dx) > Math.abs(dy);
      if (this.isHorizontalDrag) {
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
        this.isDragging = true;
      }
    }

    if (!this.isHorizontalDrag) return;

    const w = this.containerWidth;
    // Clamp so the track can't be dragged past the first or last panel
    const minOffset = -(this.tabCount - 1 - this.value) * w;
    const maxOffset = this.value * w;
    this.dragOffsetPx = Math.max(minOffset, Math.min(maxOffset, dx));

    const swipeValue = w > 0 ? this.value - this.dragOffsetPx / w : this.value;
    this.scoutSwipeProgress.emit({ swipeValue });
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    if (!this.isHorizontalDrag) return;

    const threshold = this.containerWidth * 0.3;
    let newValue = this.value;
    if (this.dragOffsetPx < -threshold) {
      newValue = Math.min(this.value + 1, this.tabCount - 1);
    } else if (this.dragOffsetPx > threshold) {
      newValue = Math.max(this.value - 1, 0);
    }

    this.activeIndex = newValue;
    this.dragOffsetPx = 0;
    this.isDragging = false;
    this.isHorizontalDrag = false;
    this.dragIntentDetermined = false;

    // Emit final integer position so the indicator snaps (with transition) to the target tab
    this.scoutSwipeProgress.emit({ swipeValue: newValue });

    if (newValue !== this.value) {
      this.scoutChange.emit({ value: newValue });
    }
  };

  private handlePointerCancel = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    if (!this.isHorizontalDrag) return;

    // System-cancelled gesture (incoming call, zoom takeover) — always snap back
    this.activeIndex = this.value;
    this.dragOffsetPx = 0;
    this.isDragging = false;
    this.isHorizontalDrag = false;
    this.dragIntentDetermined = false;

    this.scoutSwipeProgress.emit({ swipeValue: this.value });
  };

  render() {
    const transform = `translateX(calc(-${this.activeIndex * 100}% + ${this.dragOffsetPx}px))`;
    const transition = this.isDragging ? "none" : "transform 0.3s ease";

    return (
      <Host>
        <div
          class="track"
          ref={(el) => {
            this.trackEl = el as HTMLDivElement;
          }}
          style={{ transform, transition }}
          onPointerDown={this.handlePointerDown}
          onPointerMove={this.handlePointerMove}
          onPointerUp={this.handlePointerUp}
          onPointerCancel={this.handlePointerCancel}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
