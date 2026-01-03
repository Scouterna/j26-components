import { Component, Event, type EventEmitter, h, Prop } from "@stencil/core";

export type Variant = "primary" | "outlined" | "text" | "caution" | "danger";

/**
 * A simple button component.
 */
@Component({
  tag: "scout-button",
  styleUrl: "button.css",
  scoped: true,
})
export class ScoutButton {
  @Prop() type: "button" | "submit" | "reset" | "link" = "button";

  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;

  /**
   * The variant primarily affects the color of the button.
   */
  @Prop() variant: Variant = "outlined";

  /**
   * An optional icon to display alongside the button text. Must be an SVG string.
   */
  @Prop() icon?: string;
  @Prop() iconPosition: "before" | "after" = "after";
  @Prop() iconOnly: boolean = false;

  @Event() scoutClick: EventEmitter<void>;

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
        : {
            type: this.type,
          };

    const icon = this.icon && <span class="icon" innerHTML={this.icon} />;

    return (
      <Tag
        class={`button ${this.variant} ${this.iconOnly ? "icon-only" : ""}`}
        onClick={() => this.scoutClick.emit()}
        {...props}
      >
        {this.iconPosition === "before" && icon}
        <span class="content">
          <slot />
        </span>
        {this.iconPosition === "after" && icon}
      </Tag>
    );
  }
}
