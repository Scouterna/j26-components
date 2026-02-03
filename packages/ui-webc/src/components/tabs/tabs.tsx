import { Component, Element, Host, h, State } from "@stencil/core";

@Component({
  tag: "scout-tabs",
  styleUrl: "tabs.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutTabs {
  @Element() el: HTMLElement;

  @State()
  private activeTabIndex = -1;

  private observer: MutationObserver;

  render() {
    return (
      <Host>
        <slot />
        {this.getIndicator()}
      </Host>
    );
  }

  // Observe children and update indicator position
  componentDidLoad() {
    this.setInitialActiveTab();

    this.setUpObserver();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setUpObserver() {
    this.observer = new MutationObserver((mutations) =>
      this.handleMutation(mutations),
    );

    this.observer.observe(this.el, {
      subtree: true,
      childList: true,
      attributeFilter: ["data-active"],
    });
  }

  handleMutation(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (
        mutation.target instanceof HTMLElement &&
        mutation.target.hasAttribute("data-active")
      ) {
        this.setActiveElement(mutation.target);
        break;
      }
    }
  }

  setInitialActiveTab() {
    const children = Array.from(this.el.children);
    const activeChild = children.find((child) =>
      child.hasAttribute("data-active"),
    );
    if (activeChild) {
      this.setActiveElement(activeChild);
    }
  }

  setActiveElement(el: Element) {
    this.activeTabIndex = Array.from(this.el.children).indexOf(el);
  }

  getIndicator() {
    const widths = Array.from(this.el.children).map(
      (child) => (child as HTMLElement).offsetWidth,
    );
    const lefts = widths.map((_, index) =>
      widths.slice(0, index).reduce((acc, w) => acc + w, 0),
    );

    const width = widths[this.activeTabIndex] || 0;
    const left = lefts[this.activeTabIndex] || 0;

    const indicatorStyle = {
      width: `${width}px`,
      transform: `translateX(${left}px)`,
    };

    return <div aria-hidden="true" class="indicator" style={indicatorStyle} />;
  }
}
