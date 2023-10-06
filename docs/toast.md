# Toast Notifications

Kiwi Components enables you to display configurable toast and snackbar notifications to the user. You can either use built in properties to quickly format a nice looking toast, or completely provide your own content.

## Simple Example:

```javascript
import { showToast } from "kiwicomponents"
showToast({
	icon: iconURLGoesHere,
	title: "This is a toast!"
})
```

<kiwi-button onclick="showToast()">Try it</kiwi-button>

---

## Toast Interaction

The showToast function will return an HTMLElement that represents the toast. This object has a number of functions on it that can be used to interact with the toast in different ways.

The following functions are supported:

| function | description      |
| -------- | ---------------- |
| close()  | Closes the toast |

---

## Options

When launching a toast you are able to pass options to the showToast function. These allow you to adjust what content you want to put inside the toast.

The following options are supported:

| option        | type                                                                                 | description                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| icon          | string                                                                               | Optional icon URL for the toast.                                                                                                             |
| title         | string                                                                               | Optional title for the toast.                                                                                                                |
| subtitle      | string                                                                               | Optional subtitle for the toast.                                                                                                             |
| html          | string \| HTMLElement \| () => HTMLElement                                           | Optional rich, custom content for the toast. Usually used instead of title/subtitle                                                          |
| closeMode     | "icon" \| "click" \| "none"                                                          | Configures how a user can interact to close the toast. Icon = X button, click = click anywhere in the toast, none = not closable by the user |
| timeout       | number                                                                               | How many milliseconds before the toast should remove itself.                                                                                 |
| type          | "primary" \| "secondary" \| "neutral" \| "info" \| "success" \| "error" \| "warning" | A type can be configured to change the colors of the toast.                                                                                  |
| top           | boolean                                                                              | Should the toast be placed towards the top of the screen?                                                                                    |
| right         | boolean                                                                              | Should the toast be placed towards the right of the screen?                                                                                  |
| bottom        | boolean                                                                              | Should the toast be placed towards the bottom of the screen?                                                                                 |
| left          | boolean                                                                              | Should the toast be placed towards the left of the screen?                                                                                   |
| clearExisting | boolean                                                                              | If true any already existing toasts will be removed before the new one is added.                                                             |

### Example:

```javascript
import { showToast } from "kiwicomponents"
showToast({
	icon: iconURLGoesHere,
	title: "This is a toast!",
	type: "primary",
	subtitle: "This is a subtitle text for the toast.",
	html: "<button>Rich Content!</button>",
	top: true,
	left: true,
	timeout: 5000,
	closeMode: "none"
})
```

<kiwi-button onclick="showToast({type: 'primary', subtitle: 'This is a subtitle text for the toast.', html: '<kiwi-button>Rich Content!</kiwi-button>', top: true, left: true, timeout: 5000, closeMode: 'none'})">Try it</kiwi-button>

---

## Styling

The Kiwi Components toasts can be styled using CSS variables.

The following variables can be set:

| Variable                        | Description                      |
| ------------------------------- | -------------------------------- |
| --kiwi-toast-width              | Width of the toasts              |
| --kiwi-toast-background         | Background color of the toast    |
