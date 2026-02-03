import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "scout-tabs-tab",
  styleUrl: "tabs-tab.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutTabsTab {
  @Prop()
  active: boolean = false;

  render() {
    return (
      <button class="button-native" type="button">
        <div class="inner-container">
          <slot />
        </div>
      </button>
    );
  }
}
