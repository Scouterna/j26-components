# scout-segmented-control

<!-- Auto Generated Below -->


## Overview

The segmented control component presents a set of options where exactly one
option is active at a time.

The component displays an indicator under the selected option and emits a
`scoutChange` event when the user picks a different option, so you can update
`value`.

Use button elements as the slotted segment options.

## Properties

| Property | Attribute | Description                                                                                            | Type                  | Default    |
| -------- | --------- | ------------------------------------------------------------------------------------------------------ | --------------------- | ---------- |
| `size`   | `size`    | Visual size of the segmented control. Use `small` for dense layouts and `medium` for the default size. | `"medium" \| "small"` | `"medium"` |
| `value`  | `value`   | Zero-based index of the currently active segment.                                                      | `number`              | `0`        |


## Events

| Event         | Description                                                                                                                                                 | Type                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `scoutChange` | Emitted when the active segment changes as a result of a user click. The `value` in the event detail is the zero-based index of the newly selected segment. | `CustomEvent<{ value: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
