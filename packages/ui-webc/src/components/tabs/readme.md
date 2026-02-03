# scout-tabs

<!-- Auto Generated Below -->


## Overview

The tabs component is used to create a tabbed interface. It manages the state
of which tab is active and displays an indicator under the active tab. Use
`ScoutTabsTab` components to define the individual tabs.

Currently there is no support for navigational tabs. Navigation has to be
handled programmatically for now.

## Properties

| Property | Attribute | Description                                   | Type     | Default |
| -------- | --------- | --------------------------------------------- | -------- | ------- |
| `value`  | `value`   | Zero-based index of the currently active tab. | `number` | `0`     |


## Events

| Event         | Description                                                                                                                                         | Type                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `scoutChange` | Emitted when the active tab changes as a result of a user click. The `value` in the event detail is the zero-based index of the newly selected tab. | `CustomEvent<{ value: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
