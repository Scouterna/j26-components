# scout-callout



<!-- Auto Generated Below -->


## Overview

An inline callout / alert for conveying status or contextual information.
White background with a hairline border tinted by the variant color.

Use the `actions` slot to add `scout-button` elements.

## Properties

| Property      | Attribute     | Description                                        | Type                                                                     | Default     |
| ------------- | ------------- | -------------------------------------------------- | ------------------------------------------------------------------------ | ----------- |
| `dismissible` | `dismissible` | Show a dismiss (×) button in the top-right corner. | `boolean`                                                                | `false`     |
| `heading`     | `heading`     | Short, bold heading line.                          | `string`                                                                 | `undefined` |
| `variant`     | `variant`     | Visual intent of the callout.                      | `"announcement" \| "error" \| "info" \| "success" \| "tip" \| "warning"` | `"info"`    |


## Events

| Event          | Description                               | Type                |
| -------------- | ----------------------------------------- | ------------------- |
| `scoutDismiss` | Fired when the dismiss button is clicked. | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
