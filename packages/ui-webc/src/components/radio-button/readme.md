# scout-radio-button

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                    | Type      | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `ariaLabelledby` | `aria-labelledby` | Use this prop if you need to connect your radio button with another element describing its use, other than the property label. | `string`  | `undefined` |
| `checked`        | `checked`         |                                                                                                                                | `boolean` | `false`     |
| `disabled`       | `disabled`        |                                                                                                                                | `boolean` | `false`     |
| `label`          | `label`           |                                                                                                                                | `string`  | `undefined` |
| `name`           | `name`            |                                                                                                                                | `string`  | `undefined` |
| `value`          | `value`           |                                                                                                                                | `string`  | `undefined` |


## Events

| Event           | Description                                     | Type                                                            |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| `_scoutFieldId` | Internal event used for form field association. | `CustomEvent<string>`                                           |
| `scoutChecked`  |                                                 | `CustomEvent<{ checked: boolean; element: HTMLInputElement; }>` |


## Dependencies

### Used by

 - [scout-list-view-item](../list-view-item)

### Graph
```mermaid
graph TD;
  scout-list-view-item --> scout-radio-button
  style scout-radio-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
