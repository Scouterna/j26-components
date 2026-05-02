import {
  Event,
  type EventEmitter,
  type MixedInCtor,
  Prop,
  State,
  Watch,
} from "@stencil/core";

export const inputMixin = <B extends MixedInCtor>(Base: B) => {
  class InputMixin extends Base {
    /**
     * Custom validation message. If set, the input is considered invalid by the
     * browser, and if wrapped by a field component, the message is displayed.
     * If not set, the input is considered valid.
     */
    @Prop() validity?: string;

    /**
     * Event emitted when the input value changes. If you want to do custom
     * validation, use the `scoutValidate` event instead to ensure forms are
     * blocked by the browser when invalid.
     */
    @Event() scoutInputChange: EventEmitter<{
      value: string;
      element: HTMLElement;
    }>;
    @Event() scoutBlur: EventEmitter<void>;

    /**
     * Event emitted when the input needs to be validated. This is where you
     * implement your custom validation. Set any possible validation message
     * using the `validity` prop.
     */
    @Event() scoutValidate: EventEmitter<{
      value: string;
      element: HTMLElement;
    }>;

    /**
     * Internal event used for form field validation.
     */
    @Event() _scoutValidityChanged: EventEmitter<{ element: HTMLElement }>;

    /**
     * Internal event used for form field validation.
     */
    @Event() _scoutInvalid: EventEmitter<void>;

    /**
     * Internal event used for form field association.
     */
    @Event() _scoutFieldId: EventEmitter<string>;

    @State() ariaId: string;

    // JS private field (#) instead of TypeScript's `private` — anonymous classes returned by mixins
    // trigger TS4094 with TypeScript private/protected, which causes Stencil to skip type declaration
    // generation for all components using this mixin.
    // Read more here: https://github.com/stenciljs/core/pull/6613/changes#diff-50fa239140ccfeb37c678dbf29fb9012d8e1639c1bae4e6f93ae8f6b64e7b679R113-R118
    #inputElement:
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
      this.emitValidityEvent();
    }

    onInput() {
      this.emitValidityEvent();
      this.scoutInputChange.emit({
        value: this.#inputElement.value,
        element: this.#inputElement,
      });
    }

    onBlur() {
      this.scoutBlur.emit();
    }

    onInvalid() {
      this._scoutInvalid.emit();
    }

    emitValidityEvent(value?: string) {
      this.scoutValidate.emit({
        value: value ?? this.#inputElement.value,
        element: this.#inputElement,
      });
    }

    @Watch("validity")
    runValidation() {
      this.#inputElement.setCustomValidity(this.validity ?? "");
      this._scoutValidityChanged.emit({ element: this.#inputElement });
    }

    setInputRef(
      el:
        | HTMLButtonElement
        | HTMLInputElement
        | HTMLOutputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | undefined,
    ) {
      if (!el) {
        console.error(
          "Input element reference is undefined. This should not happen.",
        );
        return;
      }
      this.#inputElement = el;
    }
  }
  return InputMixin;
};
