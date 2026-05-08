import {
  Component,
  Event,
  type EventEmitter,
  Host,
  h,
  Prop,
} from "@stencil/core";

import ChevronRightIcon from "@tabler/icons/outline/chevron-right.svg";

export type ItemType = "button" | "link" | "radio" | "checkbox";

export type ActionType = "chevron" | null;

@Component({
  tag: "scout-list-view-item",
  styleUrl: "list-view-item.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutListViewItem {
  @Prop() icon?: string;
  @Prop() primary?: string;
  @Prop() secondary?: string;
  @Prop() type: ItemType = "button";

  /**
   * The action to display on the right side of the item. For example, a
   * chevron. This is purely visual and does not affect the behavior of the item
   * in any way. Not visible when the type is "radio" or "checkbox".
   */
  @Prop() action: ActionType = null;

  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;

  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() checked?: boolean;

  @Prop() disabled?: boolean;

  @Event() scoutClick!: EventEmitter<void>;

  @Event() scoutChecked!: EventEmitter<{
    checked: boolean;
    element: HTMLInputElement;
  }>;

  render() {
    const isSelectable = this.type === "radio" || this.type === "checkbox";

    const Tag = this.type === "link" ? "a" : isSelectable ? "label" : "button";

    const linkProps =
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
      <Host role="listitem">
        <Tag
          class="button"
          {...linkProps}
          onClick={!isSelectable ? () => this.scoutClick.emit() : undefined}
        >
          {this.getPrefix()}
          {this.getContent()}
          {this.getSuffix()}
        </Tag>
      </Host>
    );
  }

  private getPrefix() {
    if (!this.icon) {
      return null;
    }

    return <div class="prefix-icon" innerHTML={this.icon} />;
  }

  private getContent() {
    return (
      <div class="content">
        {this.primary && <div class="primary">{this.primary}</div>}
        {this.secondary && <div class="secondary">{this.secondary}</div>}
      </div>
    );
  }

  private getSuffix() {
    if (this.type === "radio") {
      return (
        <scout-radio-button
          name={this.name}
          value={this.value}
          checked={this.checked}
          disabled={this.disabled}
          label=""
          onScoutChecked={(e) => this.scoutChecked.emit(e.detail)}
        />
      );
    }

    if (this.type === "checkbox") {
      return (
        <scout-checkbox
          name={this.name}
          value={this.value}
          checked={this.checked}
          disabled={this.disabled}
          onScoutChecked={(e) => this.scoutChecked.emit(e.detail)}
        />
      );
    }

    if (this.action === "chevron") {
      return (
        <div class="suffix-icon">
          <div class="icon" style={{ "--icon": `url(${ChevronRightIcon})` }} />
        </div>
      );
    }

    return null;
  }
}
