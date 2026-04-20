import { Component, h } from "@stencil/core";

@Component({
  tag: "scout-tabs-tab",
  styleUrl: "tabs-tab.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutTabsTab {
  render() {
    return (
      // biome-ignore lint/a11y/noInteractiveElementToNoninteractiveRole: The host carries role="tab" (set by scout-tabs)
      <button
        class="button-native"
        type="button"
        role="presentation"
        tabindex="-1"
      >
        <div class="inner-container">
          <slot />
        </div>
      </button>
    );
  }
}
