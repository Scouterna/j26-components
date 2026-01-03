import { Component, h, Prop } from "@stencil/core";

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
  @Prop() titleText?: string;

  render() {
    return (
      <header class="container">
        <slot name="prefix" />
        <div class="title">{this.titleText}</div>
        <slot name="suffix" />
      </header>
    );
  }
}
