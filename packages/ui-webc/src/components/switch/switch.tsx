import {
  Component,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "scout-switch",
  styleUrl: "switch.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutSwitch {
  /**
   * Indicates whether the switch is toggled on or off.
   */
  @Prop() toggled: boolean = false;

  @Prop() disabled: boolean = false;

  /**
   * Use this prop if you need to connect your switch with another element describing its use, other than the property label.
   */
  @Prop() ariaLabelledby: string;

  @Prop() label: string;

  @State() ariaId: string;

  @Event() scoutSwitchToggled: EventEmitter<{
    toggled: boolean;
    element: HTMLInputElement;
  }>;
  /**
   * Internal event used for form field association.
   */
  @Event() _scoutFieldId: EventEmitter<string>;

  componentWillLoad(): Promise<void> | void {
    this.ariaId = `_${Math.random().toString(36).substring(2, 9)}`;
    this._scoutFieldId.emit(this.ariaId);
  }

  onClick(event: Event) {
    const switchElement = event.target as HTMLInputElement;

    this.scoutSwitchToggled.emit({
      toggled: switchElement.checked,
      element: switchElement,
    });
  }

  render() {
    const Tag = this.label?.length ? "label" : "div";
    return (
      <Tag>
        {this.label}
        <span class="inlineDivider"></span>
        <input
          class="switch"
          onChange={(event) => this.onClick(event)}
          type="checkbox"
          id={this.ariaId}
          aria-labelledby={this.ariaLabelledby}
          aria-disabled={this.disabled}
          disabled={this.disabled}
          checked={this.toggled}
        />
      </Tag>
    );
  }
}
