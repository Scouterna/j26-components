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


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                       | Type                        | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `disabled` | `disabled` | Whether the select is disabled. Disabled selects are not editable, excluded from tab order and are not validated.                                                                                 | `boolean`                   | `false`     |
| `name`     | `name`     |                                                                                                                                                                                                   | `string`                    | `undefined` |
| `validate` | --         | Custom validation function run on top of the implicit validation performed by the browser. Return a string with the validation message to mark the input as invalid, or null to mark it as valid. | `(value: string) => string` | `undefined` |
| `value`    | `value`    | Value of the select element, in case you want to control it yourself.                                                                                                                             | `string`                    | `""`        |


## Events

| Event             | Description                                     | Type                                                    |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `_scoutFieldId`   | Internal event used for form field association. | `CustomEvent<string>`                                   |
| `_scoutInvalid`   | Internal event used for form field validation.  | `CustomEvent<void>`                                     |
| `_scoutValidate`  | Internal event used for form field validation.  | `CustomEvent<{ element: HTMLElement; }>`                |
| `scoutBlur`       |                                                 | `CustomEvent<void>`                                     |
| `scoutInputChnge` |                                                 | `CustomEvent<{ value: string; element: HTMLElement; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
