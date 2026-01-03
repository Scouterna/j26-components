import { Component, Element, h, Listen, Prop, State } from "@stencil/core";

/**
 * The field component is used to wrap form fields with a label, help text, and
 * error messages. It automatically captures validation events from its child
 * input components and displays error messages accordingly.
 */
@Component({
  tag: "scout-field",
  styleUrl: "field.css",
  scoped: true,
})
export class ScoutField {
  /**
   * Label shown above the field.
   */
  @Prop() label!: string;

  /**
   * Help text shown below the field.
   */
  @Prop() helpText?: string;

  @State() inputId: string;
  @State() errorText: string | null = null;
  @State() errorHidden: boolean = false;

  @Element() hostElement!: HTMLElement;

  @Listen("_scoutFieldId")
  catchFieldId(event: CustomEvent<string>) {
    event.stopPropagation();
    this.inputId = event.detail;
  }

  @Listen("_scoutValidate")
  handleValidation(
    event: CustomEvent<{
      element:
        | HTMLButtonElement
        | HTMLInputElement
        | HTMLOutputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
    }>,
  ) {
    const { element } = event.detail;

    this.errorHidden = true;
    if (element.validity.valid) {
      this.errorText = null;
    } else {
      this.errorText = element.validationMessage;
    }
  }

  @Listen("scoutBlur")
  @Listen("_scoutInvalid")
  showError() {
    this.errorHidden = false;
  }

  render() {
    return (
      <div class="field">
        <label htmlFor={this.inputId} class="label">
          {this.label}
        </label>
        <slot />
        <p class="error-text" aria-live="polite">
          {!this.errorHidden && this.errorText}
        </p>
        {this.helpText && <p class="help-text">{this.helpText}</p>}
      </div>
    );
  }
}
