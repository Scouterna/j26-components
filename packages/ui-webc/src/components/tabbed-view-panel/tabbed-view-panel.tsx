import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "scout-tabbed-view-panel",
  styleUrl: "tabbed-view-panel.css",
  shadow: true,
})
export class ScoutTabbedViewPanel {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
