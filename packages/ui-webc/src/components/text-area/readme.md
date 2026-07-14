# scout-text-area

<!-- Auto Generated Below -->


## Overview

The text-area component is a multiline text input field for capturing longer,
freeform user input. When used in a form, make sure to wrap it in a Field
component to display a label, help text, and error messages.

## Properties

| Property            | Attribute       | Description                                                                                                                                                                                                                                                                                                                     | Type      | Default     |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `autocomplete`      | `autocomplete`  | Hint for the browser's autocomplete feature. Maps directly to the native `autocomplete` attribute. Use `"off"` to disable autocomplete, or any autofill detail token such as `"name"`, `"email"`, `"street-address"`, etc. See MDN for the full list: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete | `string`  | `undefined` |
| `defaultValue`      | `default-value` | Initial value of the text area for uncontrolled usage. Unlike `value`, this only sets the value on first render and does not keep the text area in sync with the prop afterwards.                                                                                                                                               | `string`  | `undefined` |
| `disabled`          | `disabled`      | Whether the text area is disabled. Disabled fields are not editable, excluded from tab order and are not validated.                                                                                                                                                                                                             | `boolean` | `false`     |
| `name` _(required)_ | `name`          |                                                                                                                                                                                                                                                                                                                                 | `string`  | `undefined` |
| `placeholder`       | `placeholder`   | Placeholder text should rarely be used as it poses a lot of accessibility issues.                                                                                                                                                                                                                                               | `string`  | `undefined` |
| `rows`              | `rows`          | Number of visible text rows. Controls the initial height of the text area.                                                                                                                                                                                                                                                      | `number`  | `3`         |
| `validity`          | `validity`      | Custom validation message. If set, the input is considered invalid by the browser, and if wrapped by a field component, the message is displayed. If not set, the input is considered valid.                                                                                                                                    | `string`  | `undefined` |
| `value`             | `value`         | Value of the text area, in case you want to control it yourself.                                                                                                                                                                                                                                                                | `string`  | `""`        |


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
