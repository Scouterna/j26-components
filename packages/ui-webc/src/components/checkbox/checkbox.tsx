import {
  Component,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";
import checkIcon from "@tabler/icons/outline/check.svg";

@Component({
  tag: "scout-checkbox",
  styleUrl: "checkbox.css",
  scoped: true,
})
export class ScoutCheckbox {
  @Prop() checked: boolean = false;

  @Prop() disabled: boolean = false;

  /**
   * Use this prop if you need to connect your checkbox with another element describing its use, other than the property label.
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
    const checkbox = event.target as HTMLInputElement;

    this.scoutChecked.emit({
      checked: checkbox.checked,
      element: checkbox,
    });
  }

  render() {
    const Tag = this.label?.length ? "label" : "div";
    return (
      <Tag>
        <input
          id={this.ariaId}
          type="checkbox"
          value={this.value}
          name={this.name}
          class="checkbox"
          style={{ "--icon-checkbox": `url(${checkIcon})` }}
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
