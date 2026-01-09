# scout-list-view-item

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                          | Default     |
| ----------- | ----------- | ----------- | --------------------------------------------- | ----------- |
| `checked`   | `checked`   |             | `boolean`                                     | `undefined` |
| `disabled`  | `disabled`  |             | `boolean`                                     | `undefined` |
| `href`      | `href`      |             | `string`                                      | `undefined` |
| `icon`      | `icon`      |             | `string`                                      | `undefined` |
| `name`      | `name`      |             | `string`                                      | `undefined` |
| `primary`   | `primary`   |             | `string`                                      | `undefined` |
| `rel`       | `rel`       |             | `string`                                      | `undefined` |
| `secondary` | `secondary` |             | `string`                                      | `undefined` |
| `target`    | `target`    |             | `string`                                      | `undefined` |
| `type`      | `type`      |             | `"button" \| "checkbox" \| "link" \| "radio"` | `"button"`  |
| `value`     | `value`     |             | `string`                                      | `undefined` |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `scoutClick` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- [scout-radio-button](../radio-button)
- [scout-checkbox](../checkbox)

### Graph
```mermaid
graph TD;
  scout-list-view-item --> scout-radio-button
  scout-list-view-item --> scout-checkbox
  style scout-list-view-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
