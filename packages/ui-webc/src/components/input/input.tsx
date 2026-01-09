import {
  Component,
  type ComponentInterface,
  Host,
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

/**
 * The input component is a basic text input field that can be used to capture
 * user input. It supports various types and input modes for different use
 * cases. When used in a form, make sure to wrap it in a Field component to
 * display a label, help text, and error messages.
 */
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
   * Size of the input element. Large fields are typically used for prominent
   * inputs, such as a top search field on a page, while medium fields are used
   * for regular form inputs.
   */
  @Prop() size: "medium" | "large" = "medium";

  /**
   * Visual variant of the input element. Elevated inputs have a shadow to help
   * them stand out from the background and should only be used when absolutely
   * positioned above other content.
   */
  @Prop() variant: "default" | "elevated" = "default";

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

  /**
   * Placeholder text should rarely be used as it poses a lot of accessibility
   * issues.
   */
  @Prop() placeholder?: string;

  render() {
    const sizeClass = this.size === "large" ? "large" : "";
    const variantClass = this.variant === "elevated" ? "elevated" : "";

    return (
      <Host class={`${sizeClass} ${variantClass}`}>
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
          placeholder={this.placeholder}
          onInput={() => this.onInput()}
          onBlur={() => this.onBlur()}
          onInvalid={() => this.onInvalid()}
        />
      </Host>
    );
  }
}
