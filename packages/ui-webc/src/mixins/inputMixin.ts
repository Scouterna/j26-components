import {
  Event,
  type EventEmitter,
  type MixedInCtor,
  Prop,
  State,
} from "@stencil/core";

export const inputMixin = <B extends MixedInCtor>(Base: B) => {
  class InputMixin extends Base {
    /**
     * Custom validation function run on top of the implicit validation performed
     * by the browser. Return a string with the validation message to mark the
     * input as invalid, or null to mark it as valid.
     */
    @Prop() validate?: (value: string) => string | null;

    @Event() scoutInputChange: EventEmitter<{
      value: string;
      element: HTMLElement;
    }>;
    @Event() scoutBlur: EventEmitter<void>;

    /**
     * Internal event used for form field validation.
     */
    @Event() _scoutValidate: EventEmitter<{ element: HTMLElement }>;

    /**
     * Internal event used for form field validation.
     */
    @Event() _scoutInvalid: EventEmitter<void>;

    /**
     * Internal event used for form field association.
     */
    @Event() _scoutFieldId: EventEmitter<string>;

    @State() ariaId: string;

    private inputElement:
      | HTMLButtonElement
      | HTMLInputElement
      | HTMLOutputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;

    componentWillLoad() {
      this.ariaId = `_${Math.random().toString(36).substring(2, 9)}`;
      this._scoutFieldId.emit(this.ariaId);
    }

    componentDidLoad() {
      this.runValidation();
    }

    onInput() {
      this.runValidation();
      this.scoutInputChange.emit({
        value: this.inputElement.value,
        element: this.inputElement,
      });
    }

    onBlur() {
      this.scoutBlur.emit();
    }

    onInvalid() {
      this._scoutInvalid.emit();
    }

    runValidation() {
      if (!this.validate) {
        return;
      }

      const validationMessage = this.validate(this.inputElement.value);
      this.inputElement.setCustomValidity(validationMessage ?? "");

      this._scoutValidate.emit({ element: this.inputElement });
    }

    setInputRef(
      el:
        | HTMLButtonElement
        | HTMLInputElement
        | HTMLOutputElement
        | HTMLSelectElement
        | HTMLTextAreaElement,
    ) {
      this.inputElement = el;
    }
  }
  return InputMixin;
};
