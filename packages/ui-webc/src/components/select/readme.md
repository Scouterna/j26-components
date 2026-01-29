# scout-select

A styled native select component for choosing from a list of options.

## Usage

```html
<scout-select>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</scout-select>
```

### With Field

```html
<scout-field label="Choose your option">
  <scout-select>
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </scout-select>
</scout-field>
```

<!-- Auto Generated Below -->


## Overview

The select component is a dropdown menu that allows users to select one
option from a list. When used in a form, make sure to wrap it in a Field
component to display a label, help text, and error messages.

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                  | Type      | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Whether the select is disabled. Disabled selects are not editable, excluded from tab order and are not validated.                                                                            | `boolean` | `false`     |
| `name`     | `name`     |                                                                                                                                                                                              | `string`  | `undefined` |
| `validity` | `validity` | Custom validation message. If set, the input is considered invalid by the browser, and if wrapped by a field component, the message is displayed. If not set, the input is considered valid. | `string`  | `undefined` |
| `value`    | `value`    | Value of the select element, in case you want to control it yourself.                                                                                                                        | `string`  | `""`        |


## Events

| Event                   | Description                                                                                                                                                                     | Type                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `_scoutFieldId`         | Internal event used for form field association.                                                                                                                                 | `CustomEvent<string>`                                   |
| `_scoutInvalid`         | Internal event used for form field validation.                                                                                                                                  | `CustomEvent<void>`                                     |
| `_scoutValidityChanged` | Internal event used for form field validation.                                                                                                                                  | `CustomEvent<{ element: HTMLElement; }>`                |
| `scoutBlur`             |                                                                                                                                                                                 | `CustomEvent<void>`                                     |
| `scoutInputChange`      | Event emitted when the input value changes. If you want to do custom validation, use the `scoutValidate` event instead to ensure forms are blocked by the browser when invalid. | `CustomEvent<{ value: string; element: HTMLElement; }>` |
| `scoutValidate`         | Event emitted when the input needs to be validated. This is where you implement your custom validation. Set any possible validation message using the `validity` prop.          | `CustomEvent<{ value: string; element: HTMLElement; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
