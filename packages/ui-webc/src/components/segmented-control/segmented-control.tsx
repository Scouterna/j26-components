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
   * Size of the input element. Large fields are typically used for prominent
   * inputs, such as a top search field on a page, while medium fields are used
   * for regular form inputs.
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

  render() {
    const sizeClass = this.size === "small" ? "small" : "";
    const noTransitionClass = this.enableAnimations ? "" : "no-transition";

    return (
      <Host class={`${sizeClass} ${noTransitionClass}`}>
        <slot />
        {this.getIndicator()}
      </Host>
    );
  }

  componentDidLoad() {
    this.updateChildrenAttributes();
    this.calculateIndicatorSizes();

    // This is a hack and it won't work on slow devices, but in most cases it
    // prevents the indicator from animating prematurely.
    setTimeout(() => {
      this.enableAnimations = true;
    }, 50);
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
    // Get left padding of container
    const baseLeft = parseFloat(getComputedStyle(this.el).paddingLeft) || 0;

    this.widths = Array.from(this.el.children).map(
      (child) => (child as HTMLElement).offsetWidth,
    );
    this.lefts = this.widths.map(
      (_, index) =>
        this.widths.slice(0, index).reduce((acc, w) => acc + w, 0) + baseLeft,
    );

    console.log("Calculated widths:", this.widths);
  }
}
