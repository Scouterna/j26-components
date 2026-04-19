import { Component, Element, h, Prop, State } from "@stencil/core";

/**
 * The App Bar component is used at the top of a page to display a title and
 * optional prefix and suffix actions. It's typically used to provide a
 * native-like navigation experience.
 */
@Component({
  tag: "scout-app-bar",
  styleUrl: "app-bar.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutAppBar {
  @Element() el!: HTMLScoutAppBarElement;

  @Prop() titleText?: string;

  @State() private hasPrefix = false;
  @State() private hasSuffix = false;

  componentDidLoad() {
    this.hasPrefix = !!this.el.querySelector('[slot="prefix"]');
    this.hasSuffix = !!this.el.querySelector('[slot="suffix"]');
  }

  render() {
    const onSlotChange = (key: "hasPrefix" | "hasSuffix") => (e: Event) => {
      this[key] =
        (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length >
        0;
    };

    return (
      <header class="container">
        <div class={`prefix ${this.hasPrefix ? "has-content" : ""}`.trim()}>
          <slot name="prefix" onSlotchange={onSlotChange("hasPrefix")} />
        </div>
        <div class="title">{this.titleText}</div>
        <div class={`suffix ${this.hasSuffix ? "has-content" : ""}`.trim()}>
          <slot name="suffix" onSlotchange={onSlotChange("hasSuffix")} />
        </div>
      </header>
    );
  }
}
