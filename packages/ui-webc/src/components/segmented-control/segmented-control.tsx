import {
  Component,
  type ComponentInterface,
  Element,
  Event,
  type EventEmitter,
  Host,
  h,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core";

export type Size = "small" | "medium";

/**
 * The segmented control component presents a set of options where exactly one
 * option is active at a time.
 *
 * The component displays an indicator under the selected option and emits a
 * `scoutChange` event when the user picks a different option, so you can update
 * `value`.
 *
 * Use button elements as the slotted segment options.
 */
@Component({
  tag: "scout-segmented-control",
  styleUrl: "segmented-control.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutSegmentedControl implements ComponentInterface {
  /**
   * Visual size of the segmented control.
   * Use `small` for dense layouts and `medium` for the default size.
   */
  @Prop() size: Size = "medium";

  /**
   * Zero-based index of the currently active segment.
   */
  @Prop()
  public value: number = 0;

  /**
   * Emitted when the active segment changes as a result of a user click.
   * The `value` in the event detail is the zero-based index of the newly selected segment.
   */
  @Event()
  public scoutChange!: EventEmitter<{ value: number }>;

  @State()
  private widths: number[] = [];
  @State()
  private lefts: number[] = [];

  @State()
  private enableAnimations = false;

  @Element() el!: HTMLElement;

  private resizeObserver?: ResizeObserver;
  private wrapperEl?: HTMLDivElement;

  render() {
    const sizeClass = this.size === "small" ? "small" : "";
    const noTransitionClass = this.enableAnimations ? "" : "no-transition";

    return (
      <Host>
        <div
          class={`wrapper ${sizeClass} ${noTransitionClass}`}
          ref={(el) => {
            this.wrapperEl = el as HTMLDivElement;
          }}
        >
          <slot />
          {this.getIndicator()}
        </div>
      </Host>
    );
  }

  componentDidLoad() {
    this.updateChildrenAttributes();
    this.calculateIndicatorSizes();

    // Re-measure the indicator whenever the wrapper (and therefore the slotted
    // buttons) is resized — for example when the component is placed inside a
    // flex parent that redistributes space after mount, or when the viewport
    // changes. Without this, the indicator stays at its mount-time width.
    this.resizeObserver = new ResizeObserver(() =>
      this.calculateIndicatorSizes(),
    );
    if (this.wrapperEl) this.resizeObserver.observe(this.wrapperEl);

    requestAnimationFrame(() => {
      this.enableAnimations = true;
    });
  }

  connectedCallback() {
    if (this.resizeObserver && this.wrapperEl) {
      this.resizeObserver.observe(this.wrapperEl);
      this.calculateIndicatorSizes();
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  getIndicator() {
    const width = this.widths[this.value] || 0;
    const left = this.lefts[this.value] || 0;

    const indicatorStyle = {
      width: `${width}px`,
      transform: `translateX(${left}px)`,
    };

    return <div aria-hidden="true" class="indicator" style={indicatorStyle} />;
  }

  @Listen("click", { capture: true })
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const buttons = Array.from(this.el.children);
    const clickedIndex = buttons.indexOf(target);

    if (clickedIndex !== -1 && clickedIndex !== this.value) {
      this.scoutChange.emit({ value: clickedIndex });
    }
  }

  @Watch("value")
  updateChildrenAttributes() {
    Array.from(this.el.children).forEach((child, index) => {
      const button = child as HTMLElement;
      button.role = "radio";
      if (index === this.value) {
        button.ariaChecked = "true";
      } else {
        button.ariaChecked = "false";
      }
    });
  }

  @Watch("value")
  calculateIndicatorSizes() {
    const baseLeft = this.wrapperEl
      ? parseFloat(getComputedStyle(this.wrapperEl).paddingLeft) || 0
      : 0;

    this.widths = Array.from(this.el.children).map(
      (child) => (child as HTMLElement).offsetWidth,
    );
    this.lefts = this.widths.map(
      (_, index) =>
        this.widths.slice(0, index).reduce((acc, w) => acc + w, 0) + baseLeft,
    );
  }
}
