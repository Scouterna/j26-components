# scout-button



<!-- Auto Generated Below -->


## Overview

A button component that can be used either as a normal button or as a link.
Will render a `<button>` element when the `type` is set to "button",
"submit", or "reset", and an `<a>` element when the `type` is set to "link".

## Properties

| Property       | Attribute       | Description                                                                   | Type                                                         | Default      |
| -------------- | --------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| `href`         | `href`          |                                                                               | `string`                                                     | `undefined`  |
| `icon`         | `icon`          | An optional icon to display alongside the button text. Must be an SVG string. | `string`                                                     | `undefined`  |
| `iconOnly`     | `icon-only`     |                                                                               | `boolean`                                                    | `false`      |
| `iconPosition` | `icon-position` |                                                                               | `"after" \| "before"`                                        | `"after"`    |
| `rel`          | `rel`           |                                                                               | `string`                                                     | `undefined`  |
| `size`         | `size`          | Size of the button.                                                           | `"large" \| "medium"`                                        | `"medium"`   |
| `target`       | `target`        |                                                                               | `string`                                                     | `undefined`  |
| `type`         | `type`          |                                                                               | `"button" \| "link" \| "reset" \| "submit"`                  | `"button"`   |
| `variant`      | `variant`       | The variant primarily affects the color of the button.                        | `"caution" \| "danger" \| "outlined" \| "primary" \| "text"` | `"outlined"` |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `scoutClick` |             | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
