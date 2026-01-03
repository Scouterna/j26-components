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
 * The switch component is used to toggle between two states, on and off.
 * Behaves like a checkbox. When used in a form, make sure to wrap it in a Field
 * component to display a label, help text, and error messages.
 */
@Component({
  tag: "scout-switch",
  styleUrl: "switch.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutSwitch
  extends Mixin(inputMixin)
  implements ComponentInterface
{
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
        {this.label}
        <span class="inlineDivider"></span>
        <input
          ref={(el) => this.setInputRef(el)}
          id={this.ariaId}
          type="checkbox"
          class="switch"
          aria-labelledby={this.ariaLabelledby}
          aria-disabled={this.disabled}
          disabled={this.disabled}
          checked={this.toggled}
          onChange={(event) => {
            this.onInput();
            this.onChange(event);
          }}
          onBlur={() => this.onBlur()}
          onInvalid={() => this.onInvalid()}
        />
      </Tag>
    );
  }
}
