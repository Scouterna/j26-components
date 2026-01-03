import {
  Component,
  type ComponentInterface,
  h,
  Mixin,
  Prop,
} from "@stencil/core";
import { inputMixin } from "../../mixins/inputMixin";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  // Hack to suggest above value but still allow any other string value
  | (string & {});

export type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url"
  // Hack to suggest above value but still allow any other string value
  | (string & {});

@Component({
  tag: "scout-input",
  styleUrl: "input.css",
  scoped: true,
})
export class ScoutInput
  extends Mixin(inputMixin)
  implements ComponentInterface
{
  /**
   * Type of input element. If you need a number input, read the accessibility
   * section of this MDN article first:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number#accessibility
   */
  @Prop() type: InputType = "text";

  /**
   * Input mode hints for devices with dynamic keyboards.
   */
  @Prop() inputmode?: InputMode;

  /**
   * Regex pattern for input validation.
   */
  @Prop() pattern?: string;

  /**
   * Value of the input element, in case you want to control it yourself.
   */
  @Prop() value: string = "";

  @Prop() name: string;

  /**
   * Whether the input is disabled. Disabled inputs are not editable, excluded
   * from tab order and are not validated.
   */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <input
        ref={(el) => this.setInputRef(el)}
        id={this.ariaId}
        type={this.type}
        name={this.name}
        inputMode={this.inputmode}
        pattern={this.pattern}
        class="input"
        value={this.value}
        disabled={this.disabled}
        onInput={() => this.onInput()}
        onBlur={() => this.onBlur()}
        onInvalid={() => this.onInvalid()}
      />
    );
  }
}
