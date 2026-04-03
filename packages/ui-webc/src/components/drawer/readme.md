# scout-drawer

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                                            | Type      | Default |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ | --------- | ------- |
| `backButtonLabel`       | `back-button-label`       | Back button label.                                                                                     | `string`  | `""`    |
| `disableBackdrop`       | `disable-backdrop`        | Disable backdrop for the drawer.                                                                       | `boolean` | `false` |
| `disableContentPadding` | `disable-content-padding` | Disable drawer content padding. Use only if you have specific use case and you need to use full width. | `boolean` | `false` |
| `exitButtonLabel`       | `exit-button-label`       | Exit button label.                                                                                     | `string`  | `""`    |
| `heading`               | `heading`                 | Heading within the sheet.                                                                              | `string`  | `""`    |
| `open`                  | `open`                    | Open/close state of the drawer.                                                                        | `boolean` | `false` |
| `showBackButton`        | `show-back-button`        | Render back button.                                                                                    | `boolean` | `false` |
| `showExitButton`        | `show-exit-button`        | Render exit button.                                                                                    | `boolean` | `false` |


## Events

| Event               | Description                                                               | Type                |
| ------------------- | ------------------------------------------------------------------------- | ------------------- |
| `backButtonClicked` | Fired when clicking backButton (<-)                                       | `CustomEvent<void>` |
| `exitButtonClicked` | Fired when clicking backButton (X). Also sent when clicking the backdrop. | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
