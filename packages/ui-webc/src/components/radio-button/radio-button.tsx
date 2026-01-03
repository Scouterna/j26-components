import {
  Component,
  type ComponentInterface,
  Event,
  type EventEmitter,
  h,
  Mixin,
  Prop,
} from "@stencil/core";
import { inputMixin } from "../../mixins/inputMixin";

/**
 * The radio button component is used to let users select one option from a set.
 * When used in a form, make sure to wrap it in a Field component to display a
 * label, help text, and error messages.
 */
@Component({
  tag: "scout-radio-button",
  styleUrl: "radio-button.css",
  scoped: true,
})
export class ScoutRadioButton
  extends Mixin(inputMixin)
  implements ComponentInterface
{
  @Prop() checked: boolean = false;

  @Prop() disabled: boolean = false;

  /**
   * Use this prop if you need to connect your radio button with another element describing its use, other than the property label.
   */
  @Prop() ariaLabelledby: string;

  @Prop() label: string;

  @Prop() value: string;

  @Prop() name: string;

  @Event() scoutChecked: EventEmitter<{
    checked: boolean;
    element: HTMLInputElement;
  }>;

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
          ref={(el) => this.setInputRef(el)}
          id={this.ariaId}
          type="radio"
          value={this.value}
          name={this.name}
          class="radio"
          aria-labelledby={this.ariaLabelledby}
          aria-disabled={this.disabled}
          disabled={this.disabled}
          checked={this.checked}
          onChange={(event) => {
            this.onInput();
            this.onChange(event);
          }}
          onBlur={() => this.onBlur()}
          onInvalid={() => this.onInvalid()}
        />
        {this.label}
      </Tag>
    );
  }
}
