import {
  Component,
  type ComponentInterface,
  Host,
  h,
  Mixin,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import xIcon from "@tabler/icons/outline/x.svg";
import { inputMixin } from "../../mixins/inputMixin";

export type Size = "medium" | "large";
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
  @Prop() size: Size = "medium";

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

  @Prop() name!: string;

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

  /**
   * Raw SVG string for an icon to display at the leading edge of the input.
   * Import with the `?raw` suffix, e.g. `import searchIcon from
   * "@tabler/icons/outline/search.svg?raw"`.
   */
  @Prop() icon?: string;

  /**
   * When true, a clear button is shown at the trailing edge whenever the
   * input has a value. Clicking it resets the input to empty and emits
   * scoutInputChange.
   */
  @Prop() clearable: boolean = false;

  @State() private _hasValue: boolean = false;

  private nativeInput!: HTMLInputElement;

  componentWillLoad() {
    super.componentWillLoad();
    this._hasValue = !!this.value;
  }

  @Watch("value")
  watchValue(newVal: string) {
    this._hasValue = !!newVal;
  }

  onInput() {
    super.onInput();
    this._hasValue = !!this.nativeInput?.value;
  }

  clearValue() {
    if (this.nativeInput) {
      this.nativeInput.value = "";
      this.onInput();
    }
  }

  render() {
    const sizeClass = this.size === "large" ? "large" : "";
    const iconClass = this.icon ? "has-icon" : "";
    const clearClass = this.clearable ? "has-clear" : "";
    const showClear = this.clearable && this._hasValue;

    return (
      <Host class={`${sizeClass} ${iconClass} ${clearClass}`}>
        {this.icon && (
          <span
            class="icon"
            style={{
              "--icon": `url("data:image/svg+xml,${encodeURIComponent(this.icon)}")`,
            }}
            aria-hidden="true"
          />
        )}
        <input
          ref={(el) => {
            this.setInputRef(el);
            this.nativeInput = el as HTMLInputElement;
          }}
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
        {showClear && (
          <button
            class="clear-btn"
            type="button"
            aria-label="Rensa"
            onClick={() => this.clearValue()}
          >
            <span
              class="clear-icon"
              style={{ "--icon-x": `url(${xIcon})` }}
              aria-hidden="true"
            />
          </button>
        )}
      </Host>
    );
  }
}
