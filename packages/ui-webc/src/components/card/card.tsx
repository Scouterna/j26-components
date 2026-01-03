import { Component, h } from "@stencil/core";

/**
 * A general surface to hold various types of content.
 */
@Component({
  tag: "scout-card",
  styleUrl: "card.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutCard {
  render() {
    return (
      <div class="card">
        <slot />
      </div>
    );
  }
}
