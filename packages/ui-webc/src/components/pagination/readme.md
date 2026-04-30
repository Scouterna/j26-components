# scout-pagination

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                     | Description                                                                | Type     | Default |
| ------------------------- | ----------------------------- | -------------------------------------------------------------------------- | -------- | ------- |
| `maxAmountOfPagesShowing` | `max-amount-of-pages-showing` | Will always included first and last page, plus "..." if exceeded.          | `number` | `5`     |
| `pages`                   | `pages`                       | Total number of pages.                                                     | `number` | `0`     |
| `paginationAriaLabel`     | `pagination-aria-label`       | Pagination aria label to describe what type of nav it is. E.g "Pagination" | `string` | `""`    |
| `selectedIndex`           | `selected-index`              | Which page that is selected.                                               | `number` | `0`     |


## Events

| Event                  | Description                                                        | Type                                      |
| ---------------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| `scoutPaginationClick` | Emitted when clicking a page. Use event data to set selectedIndex. | `CustomEvent<{ selectedIndex: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
