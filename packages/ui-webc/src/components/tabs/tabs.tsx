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

/**
 * The tabs component is used to create a tabbed interface. It manages the state
 * of which tab is active and displays an indicator under the active tab. Use
 * `ScoutTabsTab` components to define the individual tabs.
 *
 * Currently there is no support for navigational tabs. Navigation has to be
 * handled programatically for now.
 */
@Component({
  tag: "scout-tabs",
  styleUrl: "tabs.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutTabs implements ComponentInterface {
  @Element() el: HTMLElement;

  @Prop()
  public value: number = 0;

  @State()
  private widths: number[] = [];

  @State()
  private lefts: number[] = [];

  @Event()
  public scoutChange: EventEmitter<{ value: number }>;

  render() {
    return (
      <Host>
        <slot />
        {this.getIndicator()}
      </Host>
    );
  }

  componentDidLoad() {
    this.updateChildrenClasses();
    this.calculateIndicatorSizes();
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
    const tabs = Array.from(this.el.children);
    const clickedIndex = tabs.indexOf(target);

    if (clickedIndex !== -1 && clickedIndex !== this.value) {
      this.scoutChange.emit({ value: clickedIndex });
    }
  }

  @Watch("value")
  updateChildrenClasses() {
    Array.from(this.el.children).forEach((child, index) => {
      const tab = child as HTMLElement;
      if (index === this.value) {
        tab.setAttribute("data-active", "true");
      } else {
        tab.removeAttribute("data-active");
      }
    });
  }

  @Watch("value")
  calculateIndicatorSizes() {
    this.widths = Array.from(this.el.children).map(
      (child) => (child as HTMLElement).offsetWidth,
    );
    this.lefts = this.widths.map((_, index) =>
      this.widths.slice(0, index).reduce((acc, w) => acc + w, 0),
    );
  }
}
