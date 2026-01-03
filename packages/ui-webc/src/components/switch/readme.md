# scout-switch

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                              | Type      | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `ariaLabelledby` | `aria-labelledby` | Use this prop if you need to connect your switch with another element describing its use, other than the property label. | `string`  | `undefined` |
| `disabled`       | `disabled`        |                                                                                                                          | `boolean` | `false`     |
| `label`          | `label`           |                                                                                                                          | `string`  | `undefined` |
| `toggled`        | `toggled`         | Indicates whether the switch is toggled on or off.                                                                       | `boolean` | `false`     |


## Events

| Event                | Description                                     | Type                                                            |
| -------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| `_scoutFieldId`      | Internal event used for form field association. | `CustomEvent<string>`                                           |
| `scoutSwitchToggled` |                                                 | `CustomEvent<{ toggled: boolean; element: HTMLInputElement; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
