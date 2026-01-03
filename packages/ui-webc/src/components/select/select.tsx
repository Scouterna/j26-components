import {
  Component,
  type ComponentInterface,
  h,
  Mixin,
  Prop,
} from "@stencil/core";
import chevronIcon from "@tabler/icons/outline/chevron-down.svg";
import { inputMixin } from "../../mixins/inputMixin";

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

  componentWillLoad(): Promise<void> | void {
    this.ariaId = `_${Math.random().toString(36).substring(2, 9)}`;
    this._scoutFieldId.emit(this.ariaId);
  }

  render() {
    return (
      <div class="select-wrapper">
        <select
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
