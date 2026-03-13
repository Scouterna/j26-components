# scout-tabs

<!-- Auto Generated Below -->


## Overview

The segmented control component is used to create a segmented interface. It
manages the state of which segment is active and displays an indicator under
the active segment. Use button elements to define the individual segments.

## Properties

| Property | Attribute | Description                                                                                                                                                                  | Type                  | Default    |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------- |
| `size`   | `size`    | Size of the input element. Large fields are typically used for prominent inputs, such as a top search field on a page, while medium fields are used for regular form inputs. | `"medium" \| "small"` | `"medium"` |
| `value`  | `value`   | Zero-based index of the currently active segment.                                                                                                                            | `number`              | `0`        |


## Events

| Event         | Description                                                                                                                                                 | Type                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `scoutChange` | Emitted when the active segment changes as a result of a user click. The `value` in the event detail is the zero-based index of the newly selected segment. | `CustomEvent<{ value: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
