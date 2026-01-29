import {
  Component,
  type ComponentInterface,
  h,
  Mixin,
  Prop,
} from "@stencil/core";
import chevronIcon from "@tabler/icons/outline/chevron-down.svg";
import { inputMixin } from "../../mixins/inputMixin";

/**
 * The select component is a dropdown menu that allows users to select one
 * option from a list. When used in a form, make sure to wrap it in a Field
 * component to display a label, help text, and error messages.
 */
@Component({
  tag: "scout-select",
  styleUrl: "select.css",
  scoped: true,
})
export class ScoutSelect
  extends Mixin(inputMixin)
  implements ComponentInterface
{
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

  render() {
    return (
      <div class="select-wrapper">
        <select
          ref={(el) => this.setInputRef(el)}
          id={this.ariaId}
          name={this.name}
          class="select"
          disabled={this.disabled}
          onChange={() => this.onInput()}
          onBlur={() => this.onBlur()}
          onInvalid={() => this.onInvalid()}
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
