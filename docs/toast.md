# Toast Notifications

Kiwi Components can show configurable toast and snackbar notifications to the user using a simple function invocation.

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

These following functions are supported:

| function | description      |
| -------- | ---------------- |
| delete() | Closes the toast |

---

## Options

When creating a toast you are able to pass options to the creator function. These allow you to adjust things like what content you want to put inside the toast.

These following options are supported:

| option       | type                                                                                 | description                                                                     |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| icon         | string                                                                               | Optional icon for the toast.                                                    |
| title        | string                                                                               | Optional title for the toast.                                                   |
| body         | string                                                                               | Optional body for the toast.                                                    |
| html         | string \| HTMLElement \| () => HTMLElement                                           | Optional rich, custom content for the toast. Usually used instead of title/body |
| timeout      | number                                                                               | How many milliseconds before the toast should remove itself.                    |
| type         | "primary" \| "secondary" \| "neutral" \| "info" \| "success" \| "error" \| "warning" | A type can be configured to change the colors of the toast.                     |
| noanimation  | boolean                                                                              | If true the toast will not animate.                                             |
| noclickclose | boolean                                                                              | If true the toast will not close when clicked.                                  |
| top          | boolean                                                                              | Should the toast be placed towards the top of the screen?                       |
| right        | boolean                                                                              | Should the toast be placed towards the right of the screen?                     |
| bottom       | boolean                                                                              | Should the toast be placed towards the bottom of the screen?                    |
| left         | boolean                                                                              | Should the toast be placed towards the left of the screen?                      |

### Example:

```javascript
import { showToast } from "kiwicomponents"
showToast({
	icon: iconURLGoesHere,
	title: "This is a toast!",
	type: "primary",
	body: "This is a body text for the toast.",
	html: "<button>Rich Content!</button>",
	top: true,
	right: true
})
```

<kiwi-button onclick="showToast({type: 'primary', body: 'This is a body text for the toast.', html: '<button>Rich Content!</button>', top: true, right: true})">Try it</kiwi-button>

---

## Styling

The Kiwi Component toasts can be styled using CSS variables.

The following variables can be set:

| Variable                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| --kiwi-toast-width              | Width of the toasts                             |
| --kiwi-toast-background         | Background color of the toast                   |
| --kiwi-toast-title-color        | Color of the toast title text                   |
| --kiwi-toast-body-color         | Color of the toast body text                    |
| --kiwi-toast-shadow             | Toast box shadow                                |
| --kiwi-toast-border-radius      | Border radius of the toast                      |
| --kiwi-toast-outline            | Outline of the toast                            |
| --kiwi-toast-border             | Border of the toast                             |
| --kiwi-toast-animation-duration | Animation duration in milliseconds of the toast |

### Example:

```html
<style>
	:root {
		--kiwi-toast-animation-duration: 200ms;
		--kiwi-toast-background: lightblue;
		--kiwi-toast-border-radius: 30px;
	}
</style>
```

<kiwi-button onclick="showToast().setAttribute('style', '--kiwi-toast-animation-duration:200ms;--kiwi-toast-background:lightblue;--kiwi-toast-border-radius:30px;');">Try it</kiwi-button>
