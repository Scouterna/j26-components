import { Component, Element, h, Listen } from "@stencil/core";

@Component({
  tag: "scout-list-view",
  styleUrl: "list-view.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutListView {
  @Element() el: HTMLElement;

  @Listen("scoutChecked")
  onScoutChecked(
    event: CustomEvent<{ checked: boolean; element: HTMLInputElement }>,
  ) {
    const { checked, element } = event.detail;

    if (element.type !== "radio" || !element.name || !checked) {
      return;
    }

    const listItems = this.el.querySelectorAll("scout-list-view-item");

    const otherRadios: HTMLInputElement[] = [];

    listItems.forEach((item) => {
      const radios = item.shadowRoot?.querySelectorAll<HTMLInputElement>(
        `input[type="radio"][name="${CSS.escape(element.name)}"]`,
      );

      radios?.forEach((r) => {
        if (r !== element) {
          otherRadios.push(r);
        }
      });
    });

    for (const radio of otherRadios) {
      radio.checked = false;
    }
  }

  render() {
    return (
      // biome-ignore lint/a11y/useSemanticElements: custom-elements are not allowed as children of a <ul>
      <div class="list" role="list">
        <slot />
      </div>
    );
  }
}
