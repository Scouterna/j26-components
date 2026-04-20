import {
  Component,
  Element,
  Event,
  type EventEmitter,
  Host,
  h,
  Prop,
  State,
} from "@stencil/core";
import AlertOctagonIcon from "@tabler/icons/outline/alert-octagon.svg";
import AlertTriangleIcon from "@tabler/icons/outline/alert-triangle.svg";
import CircleCheckIcon from "@tabler/icons/outline/circle-check.svg";
import InfoCircleIcon from "@tabler/icons/outline/info-circle.svg";
import SparklesIcon from "@tabler/icons/outline/sparkles.svg";
import SpeakerphoneIcon from "@tabler/icons/outline/speakerphone.svg";
import XIcon from "@tabler/icons/outline/x.svg";

export type CalloutVariant =
  | "info"
  | "tip"
  | "success"
  | "warning"
  | "error"
  | "announcement";

const ICONS: Record<CalloutVariant, string> = {
  info: InfoCircleIcon,
  tip: SparklesIcon,
  success: CircleCheckIcon,
  warning: AlertTriangleIcon,
  error: AlertOctagonIcon,
  announcement: SpeakerphoneIcon,
};

/**
 * An inline callout / alert for conveying status or contextual information.
 * White background with a hairline border tinted by the variant color.
 *
 * Use the `actions` slot to add `scout-button` elements.
 */
@Component({
  tag: "scout-callout",
  styleUrl: "callout.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutCallout {
  @Element() el!: HTMLElement;

  /** Visual intent of the callout. */
  @Prop() variant: CalloutVariant = "info";

  /** Short, bold heading line. */
  @Prop() heading?: string;

  /** Show a dismiss (×) button in the top-right corner. */
  @Prop() dismissible: boolean = false;

  /** Fired when the dismiss button is clicked. */
  @Event() scoutDismiss: EventEmitter<void>;

  @State() private hasActions = false;

  componentDidLoad() {
    this.syncActionsSlot();
  }

  private syncActionsSlot = () => {
    const slot = this.el.shadowRoot?.querySelector(
      'slot[name="actions"]',
    ) as HTMLSlotElement | null;
    this.hasActions =
      !!slot && slot.assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    return (
      <Host data-variant={this.variant}>
        <div class="callout">
          <div
            class="icon"
            aria-hidden="true"
            style={{ "--icon-url": `url(${ICONS[this.variant]})` }}
          />
          <div class={`body${this.dismissible ? " body--dismissible" : ""}`}>
            {this.heading && <div class="title">{this.heading}</div>}
            <div class="description">
              <slot />
            </div>
            <div class={`actions${this.hasActions ? "" : " actions--empty"}`}>
              <slot name="actions" onSlotchange={this.syncActionsSlot} />
            </div>
          </div>
          {this.dismissible && (
            <button
              class="dismiss"
              type="button"
              aria-label="Stäng"
              onClick={() => this.scoutDismiss.emit()}
            >
              <div
                class="dismiss-icon"
                style={{ "--icon-url": `url(${XIcon})` }}
              />
            </button>
          )}
        </div>
      </Host>
    );
  }
}
