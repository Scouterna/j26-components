import {
  Component,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "scout-radio-button",
  styleUrl: "radio-button.css",
  scoped: true,
})
export class ScoutRadioButton {
  @Prop() checked: boolean = false;

  @Prop() disabled: boolean = false;

  /**
   * Use this prop if you need to connect your radio button with another element describing its use, other than the property label.
   */
  @Prop() ariaLabelledby: string;

  @Prop() label: string;

  @Prop() value: string;

  @Prop() name: string;

  @State() ariaId: string;

  @Event() scoutChecked: EventEmitter<{
    checked: boolean;
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

  onChange(event: Event) {
    const radio = event.target as HTMLInputElement;

    this.scoutChecked.emit({
      checked: radio.checked,
      element: radio,
    });
  }

  render() {
    const Tag = this.label?.length ? "label" : "div";
    return (
      <Tag>
        <input
          id={this.ariaId}
          type="radio"
          value={this.value}
          name={this.name}
          class="radio"
          aria-labelledby={this.ariaLabelledby}
          aria-disabled={this.disabled}
          disabled={this.disabled}
          checked={this.checked}
          onChange={(event) => this.onChange(event)}
        />
        {this.label}
      </Tag>
    );
  }
}
