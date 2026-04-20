# scout-tabbed-view



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                           | Type     | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `tabsId` | `tabs-id` | The `id` of the associated `scout-tabs` element. When omitted the component looks for a preceding `scout-tabs` sibling automatically. | `string` | `undefined` |
| `value`  | `value`   | Zero-based index of the currently active panel.                                                                                       | `number` | `0`         |


## Events

| Event                | Description                                                                                                                     | Type                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `scoutChange`        | Emitted when a swipe gesture completes and lands on a different panel.                                                          | `CustomEvent<{ value: number; }>`      |
| `scoutSwipeProgress` | Emitted continuously during a swipe with a fractional panel index, suitable for driving the `swipe-value` prop on `scout-tabs`. | `CustomEvent<{ swipeValue: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
