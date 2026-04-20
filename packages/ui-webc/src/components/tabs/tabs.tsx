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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

let uidCounter = 0;

/**
 * The tabs component is used to create a tabbed interface. It manages the state
 * of which tab is active and displays an indicator under the active tab. Use
 * `ScoutTabsTab` components to define the individual tabs.
 *
 * Currently there is no support for navigational tabs. Navigation has to be
 * handled programmatically for now.
 */
@Component({
  tag: "scout-tabs",
  styleUrl: "tabs.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutTabs implements ComponentInterface {
  /**
   * Zero-based index of the currently active tab.
   */
  @Prop()
  public value: number = 0;

  /**
   * Fractional tab index used to interpolate the indicator position during a
   * swipe gesture. Set this from `scoutSwipeProgress` events on `scout-tabbed-view`.
   * When undefined the indicator uses `value` with its normal CSS transition.
   */
  @Prop()
  public swipeValue?: number;

  /**
   * Emitted when the active tab changes as a result of a user click.
   * The `value` in the event detail is the zero-based index of the newly selected tab.
   */
  @Event()
  public scoutChange!: EventEmitter<{ value: number }>;

  @State()
  private widths: number[] = [];
  @State()
  private lefts: number[] = [];

  @Element() el!: HTMLElement;

  private resizeObserver?: ResizeObserver;
  private uid: string = "";

  componentWillLoad() {
    if (!this.el.id) {
      this.el.id = `scout-tabs-${++uidCounter}`;
    }
    this.uid = this.el.id;
  }

  render() {
    return (
      <Host role="tablist">
        <slot />
        {this.getIndicator()}
      </Host>
    );
  }

  componentDidLoad() {
    this.updateChildrenClasses();
    this.calculateIndicatorSizes();
    this.resizeObserver = new ResizeObserver(() =>
      this.calculateIndicatorSizes(),
    );
    this.resizeObserver.observe(this.el);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  getIndicator() {
    const count = this.widths.length;
    if (count === 0) {
      return <div aria-hidden="true" class="indicator" />;
    }

    const v = Math.max(0, Math.min(count - 1, this.swipeValue ?? this.value));
    const lo = Math.floor(v);
    const hi = Math.min(count - 1, lo + 1);
    const frac = v - lo;

    const width = lerp(
      this.widths[lo] ?? 0,
      this.widths[hi] ?? this.widths[lo] ?? 0,
      frac,
    );
    const left = lerp(
      this.lefts[lo] ?? 0,
      this.lefts[hi] ?? this.lefts[lo] ?? 0,
      frac,
    );

    // Disable transition while finger is mid-drag (fractional swipeValue) so
    // the indicator tracks the finger without lag. Re-enable for the snap animation.
    const isMidDrag =
      this.swipeValue !== undefined && !Number.isInteger(this.swipeValue);

    const indicatorStyle = {
      width: `${width}px`,
      transform: `translateX(${left}px)`,
      transition: isMidDrag ? "none" : "all 0.3s ease",
    };

    return <div aria-hidden="true" class="indicator" style={indicatorStyle} />;
  }

  @Listen("click", { capture: true })
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tabs = Array.from(this.el.children);
    const clickedIndex = tabs.indexOf(target);

    if (clickedIndex !== -1 && clickedIndex !== this.value) {
      this.scoutChange.emit({ value: clickedIndex });
    }
  }

  @Listen("keydown")
  handleKeyDown(e: KeyboardEvent) {
    const tabs = Array.from(this.el.children) as HTMLElement[];
    const currentIndex = tabs.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === "ArrowRight")
      nextIndex = Math.min(currentIndex + 1, tabs.length - 1);
    else if (e.key === "ArrowLeft") nextIndex = Math.max(currentIndex - 1, 0);
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;
    else return;

    e.preventDefault();
    tabs[nextIndex].focus();
    if (nextIndex !== this.value) {
      this.scoutChange.emit({ value: nextIndex });
    }
  }

  @Watch("value")
  updateChildrenClasses() {
    Array.from(this.el.children).forEach((child, index) => {
      const tab = child as HTMLElement;
      tab.setAttribute("role", "tab");
      tab.setAttribute("id", `${this.uid}-tab-${index}`);
      tab.setAttribute("aria-controls", `${this.uid}-panel-${index}`);
      if (index === this.value) {
        tab.setAttribute("data-active", "true");
        tab.setAttribute("aria-selected", "true");
        tab.setAttribute("tabindex", "0");
      } else {
        tab.removeAttribute("data-active");
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("tabindex", "-1");
      }
    });
  }

  calculateIndicatorSizes() {
    this.widths = Array.from(this.el.children).map(
      (child) => (child as HTMLElement).offsetWidth,
    );
    this.lefts = this.widths.map((_, index) =>
      this.widths.slice(0, index).reduce((acc, w) => acc + w, 0),
    );
  }
}
