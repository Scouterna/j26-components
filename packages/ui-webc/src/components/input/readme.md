# scout-input

<!-- Auto Generated Below -->


## Overview

The input component is a basic text input field that can be used to capture
user input. It supports various types and input modes for different use
cases. When used in a form, make sure to wrap it in a Field component to
display a label, help text, and error messages.

## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                  | Type                                                                                                 | Default     |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ----------- |
| `disabled`  | `disabled`  | Whether the input is disabled. Disabled inputs are not editable, excluded from tab order and are not validated.                                                                                              | `boolean`                                                                                            | `false`     |
| `inputmode` | `inputmode` | Input mode hints for devices with dynamic keyboards.                                                                                                                                                         | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url" \| string & {}` | `undefined` |
| `name`      | `name`      |                                                                                                                                                                                                              | `string`                                                                                             | `undefined` |
| `pattern`   | `pattern`   | Regex pattern for input validation.                                                                                                                                                                          | `string`                                                                                             | `undefined` |
| `type`      | `type`      | Type of input element. If you need a number input, read the accessibility section of this MDN article first: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number#accessibility | `"email" \| "number" \| "password" \| "tel" \| "text" \| "url" \| string & {}`                       | `"text"`    |
| `validate`  | --          | Custom validation function run on top of the implicit validation performed by the browser. Return a string with the validation message to mark the input as invalid, or null to mark it as valid.            | `(value: string) => string`                                                                          | `undefined` |
| `value`     | `value`     | Value of the input element, in case you want to control it yourself.                                                                                                                                         | `string`                                                                                             | `""`        |


## Events

| Event              | Description                                     | Type                                                    |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------- |
| `_scoutFieldId`    | Internal event used for form field association. | `CustomEvent<string>`                                   |
| `_scoutInvalid`    | Internal event used for form field validation.  | `CustomEvent<void>`                                     |
| `_scoutValidate`   | Internal event used for form field validation.  | `CustomEvent<{ element: HTMLElement; }>`                |
| `scoutBlur`        |                                                 | `CustomEvent<void>`                                     |
| `scoutInputChange` |                                                 | `CustomEvent<{ value: string; element: HTMLElement; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
