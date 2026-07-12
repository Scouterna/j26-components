import {
  Component,
  type ComponentInterface,
  h,
  Mixin,
  Prop,
  Watch,
} from "@stencil/core";
import { inputMixin } from "../../mixins/inputMixin";

/**
 * The text-area component is a multiline text input field for capturing longer,
 * freeform user input. When used in a form, make sure to wrap it in a Field
 * component to display a label, help text, and error messages.
 */
@Component({
  tag: "scout-text-area",
  styleUrl: "text-area.css",
  scoped: true,
})
export class ScoutTextArea
  extends Mixin(inputMixin)
  implements ComponentInterface
{
  @Prop() name!: string;

  /**
   * Value of the text area, in case you want to control it yourself.
   */
  @Prop() value: string = "";

  /**
   * Initial value of the text area for uncontrolled usage. Unlike `value`, this
   * only sets the value on first render and does not keep the text area in sync
   * with the prop afterwards.
   */
  @Prop() defaultValue?: string;

  /**
   * Number of visible text rows. Controls the initial height of the text area.
   */
  @Prop() rows: number = 3;

  /**
   * Whether the text area is disabled. Disabled fields are not editable,
   * excluded from tab order and are not validated.
   */
  @Prop() disabled: boolean = false;

  /**
   * Placeholder text should rarely be used as it poses a lot of accessibility
   * issues.
   */
  @Prop() placeholder?: string;

  /**
   * Hint for the browser's autocomplete feature. Maps directly to the native
   * `autocomplete` attribute.
   */
  @Prop() autocomplete?: string;

  private nativeTextArea!: HTMLTextAreaElement;

  componentDidLoad() {
    super.componentDidLoad();
    if (this.defaultValue) {
      this.nativeTextArea.value = this.defaultValue;
    }
  }

  @Watch("value")
  watchValue(newVal: string) {
    this.emitValidityEvent(newVal);
  }

  render() {
    return (
      <textarea
        ref={(el) => {
          this.setInputRef(el);
          this.nativeTextArea = el as HTMLTextAreaElement;
        }}
        id={this.ariaId}
        name={this.name}
        class="textarea"
        rows={this.rows}
        value={this.value}
        disabled={this.disabled}
        placeholder={this.placeholder}
        autoComplete={this.autocomplete}
        onInput={() => this.onInput()}
        onBlur={() => this.onBlur()}
        onInvalid={() => this.onInvalid()}
      />
    );
  }
}
