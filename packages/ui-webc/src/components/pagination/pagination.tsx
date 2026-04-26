import {
  Component,
  type ComponentInterface,
  Event,
  type EventEmitter,
  h,
  Prop,
} from "@stencil/core";

const backArrow =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>';
const forwardArrow =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>';

@Component({
  tag: "scout-pagination",
  styleUrl: "pagination.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutPagination implements ComponentInterface {
  /**
   * Which page that is selected.
   */
  @Prop() selectedIndex: number = 0;

  /**
   * Total number of pages.
   */
  @Prop() pages: number = 0;

  /**
   * Pagination aria label to describe what type of nav it is.
   * E.g "Pagination"
   */
  @Prop() paginationAriaLabel: string = "";

  /**
   * Will always included first and last page, plus "..." if exceeded.
   */
  @Prop() maxAmountOfPagesShowing = 5;
  /**
   * Emitted when clicking a page. Use event data to set selectedIndex.
   */
  @Event() scoutPaginationClick: EventEmitter<{
    selectedIndex: number;
  }>;

  render() {
    /**
     * Returns backward button
     */
    const getBackwardPageButton = () => {
      if (this.selectedIndex < 1) {
        return null;
      }
      return (
        <button
          type="button"
          onClick={() => {
            this.scoutPaginationClick.emit({
              selectedIndex: this.selectedIndex - 1,
            });
          }}
          class="arrow"
          innerHTML={backArrow}
        ></button>
      );
    };

    /**
     * Returns forward button
     */
    const getForwardPageButton = () => {
      if (this.selectedIndex + 1 === this.pages) {
        return null;
      }
      return (
        <button
          type="button"
          onClick={() => {
            this.scoutPaginationClick.emit({
              selectedIndex: this.selectedIndex + 1,
            });
          }}
          class="arrow"
          innerHTML={forwardArrow}
        ></button>
      );
    };

    /**
     * Returns the pagination numbers
     */
    const getPaginationButtons = () => {
      const noPagination = [...Array(this.pages)];
      if (this.pages <= this.maxAmountOfPagesShowing) {
        return noPagination.map((_, index) => (
          <button
            type="button"
            onClick={() =>
              this.scoutPaginationClick.emit({ selectedIndex: index })
            }
            class={{
              pageButton: true,
              selected: this.selectedIndex === index,
            }}
          >
            {index + 1}
          </button>
        ));
      }

      const pages: (number | string)[] = [];
      const windowSize = this.maxAmountOfPagesShowing - 2;
      let start = Math.max(
        2,
        this.selectedIndex - Math.floor(windowSize / 2) + 1,
      );
      const end = Math.min(this.pages - 1, start + windowSize - 1);

      if (end - start < windowSize - 1) {
        start = Math.max(2, end - windowSize + 1);
      }

      pages.push(1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < this.pages - 1) pages.push("...");
      pages.push(this.pages);

      return pages.map((page, _) => {
        if (typeof page === "string") {
          return <div>{page}</div>;
        }
        return (
          <button
            type="button"
            onClick={() => {
              this.scoutPaginationClick.emit({ selectedIndex: page - 1 });
            }}
            class={{
              pageButton: true,
              selected: this.selectedIndex === page - 1,
            }}
          >
            {page}
          </button>
        );
      });
    };

    return (
      <nav aria-label={this.paginationAriaLabel} class="pagination">
        {getBackwardPageButton()}
        {getPaginationButtons()}
        {getForwardPageButton()}
      </nav>
    );
  }
}
