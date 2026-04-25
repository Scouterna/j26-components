import { Component, Event, type EventEmitter, h, Prop } from "@stencil/core";
import clsx from "clsx";

export type ItemType = "button" | "link";

/**
 * A bottom bar item used within the bottom bar for navigation. Should not be
 * used outside of a bottom bar.
 */
@Component({
  tag: "scout-bottom-bar-item",
  styleUrl: "bottom-bar-item.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutBottomBarItem {
  /**
   * The type of the bottom bar item, either a button or a link.
   */
  @Prop() type: ItemType = "button";

  /**
   * An optional link to navigate to when the item is clicked. Only used when
   * `type` is set to "link".
   */
  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;

  /**
   * An icon to display above the label. Must be an SVG string.
   */
  @Prop() icon!: string;

  /**
   * The label to display below the icon.
   */
  @Prop() label!: string;

  /**
   * Whether the item is currently active. Should be set to true when the item
   * represents the current page.
   */
  @Prop() active?: boolean;

  @Event() scoutClick!: EventEmitter<void>;

  render() {
    const Tag = this.type === "link" ? "a" : "button";

    const props =
      this.type === "link"
        ? {
            href: this.href,
            target: this.target,
            // This might not be our job, but better safe than sorry.
            rel:
              this.rel ??
              (this.target === "_blank" ? "noopener noreferrer" : undefined),
          }
        : {};

    return (
      <Tag
        class={clsx("button", this.active && "active")}
        onClick={() => this.scoutClick.emit()}
        {...props}
      >
        <span class="icon" innerHTML={this.icon} />
        <span class="label">{this.label}</span>
      </Tag>
    );
  }
}
