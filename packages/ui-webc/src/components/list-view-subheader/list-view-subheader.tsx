import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "scout-list-view-subheader",
  styleUrl: "list-view-subheader.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutListViewSubheader {
  @Prop() text!: string;
  @Prop() headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2";

  render() {
    return (
      <Host role="listitem">
        <this.headingLevel class="heading">{this.text}</this.headingLevel>
      </Host>
    );
  }
}
