import {
  Component,
  type ComponentInterface,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";
import chevronIcon from "@tabler/icons/outline/chevron-down.svg";

@Component({
  tag: "scout-select",
  styleUrl: "select.css",
  scoped: true,
})
export class ScoutSelect implements ComponentInterface {
  /**
   * Value of the select element, in case you want to control it yourself.
   */
  @Prop() value: string = "";

  /**
   * Whether the select is disabled. Disabled selects are not editable, excluded
   * from tab order and are not validated.
   */
  @Prop() disabled: boolean = false;

  @Prop() name: string;

  /**
   * Custom validation function run on top of the implicit validation performed
   * by the browser. Return a string with the validation message to mark the
   * select as invalid, or null to mark it as valid.
   */
  @Prop() validate?: (value: string) => string | null;

  @Event() scoutInputChange: EventEmitter<{
    value: string;
    element: HTMLSelectElement;
  }>;
  @Event() scoutBlur: EventEmitter<void>;

  /**
   * Internal event used for form field association.
   */
  @Event() _scoutFieldId: EventEmitter<string>;

  @State() ariaId: string;

  componentWillLoad(): Promise<void> | void {
    this.ariaId = `_${Math.random().toString(36).substring(2, 9)}`;
    this._scoutFieldId.emit(this.ariaId);
  }

  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;

    if (this.validate) {
      const validationMessage = this.validate(select.value);
      select.setCustomValidity(validationMessage ?? "");
    }

    this.scoutInputChange.emit({
      value: select.value,
      element: select,
    });
  }

  render() {
    return (
      <div class="select-wrapper">
        <select
          id={this.ariaId}
          name={this.name}
          class="select"
          disabled={this.disabled}
          onChange={(e) => this.onChange(e)}
          onBlur={() => this.scoutBlur.emit()}
        >
          <slot />
        </select>
        <span
          class="select-icon"
          style={{ "--icon-chevron": `url(${chevronIcon})` }}
          aria-hidden="true"
        />
      </div>
    );
  }
}
