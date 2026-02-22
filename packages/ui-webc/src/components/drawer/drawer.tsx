import {
  Component,
  type ComponentInterface,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
} from "@stencil/core";
import { isMobile } from "../../utils/utils";

const backIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>';
const closeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>';

@Component({
  tag: "scout-drawer",
  styleUrl: "drawer.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutDrawer implements ComponentInterface {
  /**
   * Open/closestate of the drawer.
   */
  @Prop() open: boolean = false;
  /**
   * Open/closestate of the drawer.
   */
  @Prop() title: string = "";
  /**
   * Render back button.
   */
  @Prop() backButton: boolean = false;
  /**
   * Render close button.
   */
  @Prop() closeButton: boolean = false;
  /**
   * Backdrop for the drawer. Will also make it clickable to close the drawer.
   */
  @Prop() backdrop: boolean = false;

  @State() openState: "opening" | "closing" | "open" | "close" = "close";

  /**
   * Fired when clicking backButton (<-)
   */
  @Event() backButtonClicked: EventEmitter<void>;
  /**
   * Fired when clicking backButton (X)
   */
  @Event() exitButtonClicked: EventEmitter<void>;

  onBackButtonClick() {
    this.backButtonClicked.emit();
  }
  onExitButtonClick() {
    this.exitButtonClicked.emit();
  }

  render() {
    const shouldRenderHeader =
      this.title || this.backButton || this.closeButton;
    // const animateDrawer = (direction: "open" | "close") => {};
    return (
      <div>
        {this.backdrop && (
          // biome-ignore lint/a11y/noStaticElementInteractions: <closable backdrop>
          <div
            onKeyDown={() => {}}
            onChange={() => this.onExitButtonClick()}
            class={`backdrop ${this.open ? "backdrop-visible" : "backdrop-hidden"}`}
          ></div>
        )}
        <div
          onAnimationStart={() => {}}
          onAnimationEnd={() => {}}
          class={`drawer--container-${isMobile() ? "desktop" : "desktop"} ${this.open ? "open" : "closed"}`}
        >
          {shouldRenderHeader && (
            <div class="header">
              {this.backButton && (
                // biome-ignore lint/a11y/useButtonType: <not needed>
                <button
                  class="back-button"
                  onClick={() => this.onBackButtonClick()}
                >
                  <span class="icon" innerHTML={backIcon}></span>
                </button>
              )}
              {this.closeButton && (
                // biome-ignore lint/a11y/useButtonType: <not needed>
                <button
                  class="close-button"
                  onClick={() => this.onExitButtonClick()}
                >
                  <span class="icon" innerHTML={closeIcon} />
                </button>
              )}
              {this.title && <h3 class="title">{this.title}</h3>}
            </div>
          )}
          <slot />
        </div>
      </div>
    );
  }
}
