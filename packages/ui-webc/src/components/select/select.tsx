import {
  Component,
  type ComponentInterface,
  Element,
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

  @Prop() name!: string;

  @Element() el!: HTMLElement;

  private optionObserver?: MutationObserver;

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
        />
        <span
          class="select-icon"
          style={{ "--icon-chevron": `url(${chevronIcon})` }}
          aria-hidden="true"
        />
      </div>
    );
  }

  componentDidLoad() {
    super.componentDidLoad();
    this.syncOptions();

    // Stencil's scoped-slot polyfill places slotted children at the host root,
    // which is not a valid location for `<option>` elements (they only render
    // inside a `<select>`). Frameworks that mount the host before populating
    // its children — Lustre, Vue, Solid in some configs, plain
    // `appendChild` loops — also defeat the polyfill's once-on-mount capture.
    //
    // To work consistently across frameworks we project options ourselves:
    // move every `<option>`/`<optgroup>` light child of the host into the
    // inner `<select>`, and keep them in sync as children are added/removed.
    this.optionObserver = new MutationObserver(() => this.syncOptions());
    this.optionObserver.observe(this.el, { childList: true });
  }

  connectedCallback() {
    if (this.optionObserver) {
      this.optionObserver.observe(this.el, { childList: true });
      this.syncOptions();
    }
  }

  disconnectedCallback() {
    this.optionObserver?.disconnect();
  }

  private syncOptions() {
    const innerSelect = this.el.querySelector<HTMLSelectElement>(
      ":scope > .select-wrapper > select.select",
    );
    if (!innerSelect) return;

    const stranded = Array.from(this.el.children).filter(
      (child): child is HTMLOptionElement | HTMLOptGroupElement =>
        child.tagName === "OPTION" || child.tagName === "OPTGROUP",
    );
    if (stranded.length === 0) return;

    for (const child of stranded) {
      innerSelect.appendChild(child);
    }

    // Re-apply the controlled value once the projected options actually
    // exist; setting `value` on a select before its options are present is a
    // no-op in browsers.
    if (this.value !== undefined && this.value !== null) {
      innerSelect.value = this.value;
    }
  }
}
