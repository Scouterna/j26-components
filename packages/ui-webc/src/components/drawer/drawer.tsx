import {
  Component,
  type ComponentInterface,
  Element,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import focusLock from "dom-focus-lock";

const backIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>';
const exitIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>';

@Component({
  tag: "scout-drawer",
  styleUrl: "drawer.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutDrawer implements ComponentInterface {
  @Element() rootElement: HTMLElement;
  /**
   * Open/closestate of the drawer.
   */
  @Prop() open: boolean = false;
  /**
   * Open/close state of the drawer.
   */
  @Prop() heading: string = "";
  /**
   * Render back button.
   */
  @Prop() showBackButton: boolean = false;
  /**
   * Back button label.
   */
  @Prop() backButtonLabel: string = "";
  /**
   * Render exit button.
   */
  @Prop() showExitButton: boolean = false;
  /**
   * Back button label.
   */
  @Prop() exitButtonLabel: string = "";
  /**
   * Disable backdrop for the drawer. Will also make it clickable to close the drawer.
   */
  @Prop() disableBackdrop: boolean = false;

  /**
   * Disable drawer content padding. Use only if you have specific use case and you need to use full width.
   */
  @Prop() disableContentPadding: boolean = false;

  @State() drawerState: "opening" | "closing" | "open" | "closed" = "closed";
  @State() focusedNode: Element = null;

  componentWillLoad(): Promise<void> | void {
    this.focusedNode = document.activeElement;
  }
  disconnectedCallback(): void {
    this.focusedNode;
  }
  /**
   * Fired when clicking backButton (<-)
   */
  @Event() backButtonClicked: EventEmitter<void>;

  /**
   * Fired when clicking backButton (X). Also sent when clicking the backdrop.
   */
  @Event() exitButtonClicked: EventEmitter<void>;

  onBackButtonClick() {
    this.backButtonClicked.emit();
  }
  onExitButtonClick() {
    this.exitButtonClicked.emit();
  }

  @Watch("open")
  setDialogOpenState(open: boolean) {
    const drawer = this.rootElement.shadowRoot.querySelector(
      ".drawer--container",
    ) as HTMLElement;
    if (open) {
      this.drawerState = "opening";
      focusLock.on(drawer);
    } else {
      focusLock.off(drawer);
      this.drawerState = "closing";
    }
  }

  render() {
    const shouldRenderHeader =
      this.heading || this.showBackButton || this.showExitButton;

    const getDrawerStateClass = (state: string) => {
      switch (state) {
        case "opening":
        case "open":
          return "open";
        case "closing":
          return "close";
      }
    };

    return (
      <div class="drawer">
        {!this.disableBackdrop && (
          // biome-ignore lint/a11y/noStaticElementInteractions: <closable backdrop>
          // biome-ignore lint/a11y/useKeyWithClickEvents: <closable backdrop>
          <div
            onClick={() => {
              this.onExitButtonClick();
            }}
            class={`backdrop ${this.drawerState !== "closed" ? "backdrop-visible" : "backdrop-hidden"}`}
          ></div>
        )}
        <div
          class={`drawer--container ${getDrawerStateClass(this.drawerState)}`}
          onAnimationEnd={() => {
            this.drawerState = this.open ? "open" : "closed";
          }}
        >
          {shouldRenderHeader && (
            <div class="header--wrapper">
              {this.showBackButton && (
                // biome-ignore lint/a11y/useButtonType: <not needed>
                <button
                  class="back-button"
                  onClick={() => this.onBackButtonClick()}
                >
                  <span class="icon" innerHTML={backIcon}>
                    <span class="visually-hidden">{this.backButtonLabel}</span>
                  </span>
                </button>
              )}
              {this.showExitButton && (
                // biome-ignore lint/a11y/useButtonType: <not needed>
                <button
                  class="exit-button"
                  onClick={() => this.onExitButtonClick()}
                >
                  <span class="icon" innerHTML={exitIcon}>
                    <span class="visually-hidden">{this.exitButtonLabel}</span>
                  </span>
                </button>
              )}
              {this.heading && <h3 class="title">{this.heading}</h3>}
            </div>
          )}
          <div class={!this.disableContentPadding && `content--wrapper`}>
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
