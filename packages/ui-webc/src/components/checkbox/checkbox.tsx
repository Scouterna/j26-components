import {
  Component,
  type ComponentInterface,
  Event,
  type EventEmitter,
  h,
  Mixin,
  Prop,
} from "@stencil/core";
import checkIcon from "@tabler/icons/outline/check.svg";
import { inputMixin } from "../../mixins/inputMixin";

/**
 * The checkbox component is used to let users select one or more options from a
 * set. For toggling a single option, consider using the Switch component
 * instead. When used in a form, make sure to wrap it in a Field component to
 * display a label, help text, and error messages.
 */
@Component({
  tag: "scout-checkbox",
  styleUrl: "checkbox.css",
  scoped: true,
})
export class ScoutCheckbox
  extends Mixin(inputMixin)
  implements ComponentInterface
{
  @Prop() checked: boolean = false;

  @Prop() disabled: boolean = false;

  /**
   * Use this prop if you need to connect your checkbox with another element describing its use, other than the property label.
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
          ref={(el) => this.setInputRef(el)}
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
