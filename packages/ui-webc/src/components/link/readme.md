# scout-link

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute         | Description                                                                                                                                                                                                                                                                                                                    | Type                                                        | Default     |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ----------- |
| `href`               | `href`            | The URL that the link points to. Required when type is set to link                                                                                                                                                                                                                                                             | `string`                                                    | `undefined` |
| `label` _(required)_ | `label`           | Text to be displayed for the link                                                                                                                                                                                                                                                                                              | `string`                                                    | `undefined` |
| `linkAriaLabel`      | `link-aria-label` | If the label property is not sufficient to describe its use, add an aria-label describing what happens when pressing the button or where the user navigates if it is a link.                                                                                                                                                   | `string`                                                    | `undefined` |
| `rel`                | `rel`             |                                                                                                                                                                                                                                                                                                                                | `string`                                                    | `undefined` |
| `target`             | `target`          | _blank	Opens the linked document in a new window or tab  _self	Opens the linked document in the same frame as it was clicked (this is default)  _parent	Opens the linked document in the parent frame  _top	Opens the linked document in the full body of the window  _framename	Opens the linked document in the named iframe | `"_blank" \| "_parent" \| "_self" \| "_top" \| "framename"` | `"_self"`   |
| `type`               | `type`            | There are two types. If you intend to use it as a button with onclick, a button is rendered, however if you want to you it as a normal link, a link with href is rendered.                                                                                                                                                     | `"button" \| "link"`                                        | `"link"`    |


## Events

| Event            | Description                        | Type                             |
| ---------------- | ---------------------------------- | -------------------------------- |
| `scoutLinkClick` | Only sent if the link is a button. | `CustomEvent<HTMLButtonElement>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
