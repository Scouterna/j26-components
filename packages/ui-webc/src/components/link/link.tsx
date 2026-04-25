import { Component, Event, type EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "scout-link",
  styleUrl: "link.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutLink {
  /**
   * The URL that the link points to. Required when type is set to link
   */
  @Prop() href?: string;

  /**
   * Text to be displayed for the link
   */
  @Prop() label!: string;

  @Prop() rel?: string;

  /**
   * If the label property is not sufficient to describe its use, add an aria-label describing what happens
   * when pressing the button or where the user navigates if it is a link.
   */
  @Prop() linkAriaLabel?: string;

  /**
   * There are two types. If you intend to use it as a button with onclick, a button is rendered, however if you want to you it
   * as a normal link, a link with href is rendered.
   */
  @Prop() type: "link" | "button" = "link";

  /**
   * _blank	Opens the linked document in a new window or tab
   *
   * _self	Opens the linked document in the same frame as it was clicked (this is default)
   *
   * _parent	Opens the linked document in the parent frame
   *
   * _top	Opens the linked document in the full body of the window
   *
   * _framename	Opens the linked document in the named iframe
   */
  @Prop() target?: "_blank" | "_self" | "_parent" | "_top" | "framename" =
    "_self";

  /**
   * Only sent if the link is a button.
   */
  @Event() scoutLinkClick!: EventEmitter<HTMLButtonElement>;

  render() {
    if (this.type === "button") {
      return (
        <button
          type="button"
          aria-label={this.linkAriaLabel || ""}
          onClick={() => this.scoutLinkClick.emit()}
        >
          {this.label}
        </button>
      );
    }

    if (!this.href) {
      throw new Error("Href is requied when type is set to link");
    }

    return (
      <a
        href={this.href}
        target={this.target}
        aria-label={this.linkAriaLabel || ""}
        rel={
          // This might not be our job, but better safe than sorry.
          this.rel ??
          (this.target === "_blank" ? "noopener noreferrer" : undefined)
        }
      >
        {this.label}
      </a>
    );
  }
}
