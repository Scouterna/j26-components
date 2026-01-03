# scout-switch

<!-- Auto Generated Below -->


## Overview

The switch component is used to toggle between two states, on and off.
Behaves like a checkbox. When used in a form, make sure to wrap it in a Field
component to display a label, help text, and error messages.

## Properties

| Property         | Attribute         | Description                                                                                                                                                                                       | Type                        | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `ariaLabelledby` | `aria-labelledby` | Use this prop if you need to connect your switch with another element describing its use, other than the property label.                                                                          | `string`                    | `undefined` |
| `disabled`       | `disabled`        |                                                                                                                                                                                                   | `boolean`                   | `false`     |
| `label`          | `label`           |                                                                                                                                                                                                   | `string`                    | `undefined` |
| `toggled`        | `toggled`         | Indicates whether the switch is toggled on or off.                                                                                                                                                | `boolean`                   | `false`     |
| `validate`       | --                | Custom validation function run on top of the implicit validation performed by the browser. Return a string with the validation message to mark the input as invalid, or null to mark it as valid. | `(value: string) => string` | `undefined` |


## Events

| Event              | Description                                     | Type                                                            |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------- |
| `_scoutFieldId`    | Internal event used for form field association. | `CustomEvent<string>`                                           |
| `_scoutInvalid`    | Internal event used for form field validation.  | `CustomEvent<void>`                                             |
| `_scoutValidate`   | Internal event used for form field validation.  | `CustomEvent<{ element: HTMLElement; }>`                        |
| `scoutBlur`        |                                                 | `CustomEvent<void>`                                             |
| `scoutChecked`     |                                                 | `CustomEvent<{ checked: boolean; element: HTMLInputElement; }>` |
| `scoutInputChange` |                                                 | `CustomEvent<{ value: string; element: HTMLElement; }>`         |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
