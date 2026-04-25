import {
  Component,
  type ComponentInterface,
  Host,
  h,
  Prop,
} from "@stencil/core";

import SymbolAdventurer from "./symbols/adventurer.svg";
import SymbolChallenger from "./symbols/challenger.svg";
import SymbolDiscoverer from "./symbols/discoverer.svg";
import SymbolFamilyScout from "./symbols/family-scout.svg";
import SymbolRover from "./symbols/rover.svg";
import SymbolTracker from "./symbols/tracker.svg";

@Component({
  tag: "scout-loader",
  styleUrl: "loader.css",
  shadow: true,
})
export class ScoutLoader implements ComponentInterface {
  @Prop() text?: string;
  @Prop() size?: "xs" | "sm" | "base" | "lg" | "xl" = "base";

  private symbols = [
    SymbolFamilyScout,
    SymbolTracker,
    SymbolDiscoverer,
    SymbolAdventurer,
    SymbolChallenger,
    SymbolRover,
  ];

  private symbolElements: HTMLDivElement[] = new Array(this.symbols.length);

  private currentSymbolIndex = 1;

  componentDidLoad(): void {
    this.showElement(this.symbolElements[0]);
  }

  render() {
    return (
      <Host class={this.size === "base" ? "" : this.size}>
        <div class="frame">{this.getSymbols()}</div>
        {this.text && <div class="text">{this.text}</div>}
      </Host>
    );
  }

  showElement(el: HTMLDivElement) {
    el.classList.remove("animate-out");
    el.classList.add("animate-in");
  }

  hideElement(el: HTMLDivElement) {
    el.classList.remove("animate-in");
    el.classList.add("animate-out");
  }

  next() {
    const currIndex = this.currentSymbolIndex;
    const prevIndex =
      (currIndex - 1 + this.symbols.length) % this.symbols.length;

    this.showElement(this.symbolElements[currIndex]);
    this.hideElement(this.symbolElements[prevIndex]);

    this.currentSymbolIndex += 1;
    if (this.currentSymbolIndex >= this.symbols.length) {
      this.currentSymbolIndex = 0;
    }
  }

  tickDone(event: AnimationEvent) {
    if (event.animationName === "slide-in") {
      this.next();
    }
  }

  getSymbols() {
    return this.symbols.map((symbol, index) => (
      <div
        ref={(el) => {
          if (!el) {
            console.error("Symbol element is null");
            return;
          }
          this.symbolElements[index] = el;
        }}
        class="symbol"
        style={{ "--symbol": `url(${symbol})` }}
        onAnimationEnd={(event) => this.tickDone(event)}
      />
    ));
  }
}
