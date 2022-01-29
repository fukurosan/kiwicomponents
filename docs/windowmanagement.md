# Window Management

Kiwi Components enables you to launch windows that users can interact with and that may be manipulated programmatically. All windows can be styled using CSS variables as specified further down, and are configurable with a number of settings.

## Simple Example:

```javascript
import { openWindow } from "kiwicomponents"
const myWindow = openWindow({
	icon: iconURLGoesHere,
	title: "This is a header!",
	body: `<div>This is some content inside of the window.</div> 
			<div>With multiple rows.</div>`,
	footer: `<div> And this is some footer content</div>`
})
//Note that the body and footer can be either a string, an HTML element or a function that returns an HTML element.
```

<kiwi-button onclick="openWindow()">Try it</kiwi-button>

---

## Window Interaction

The openWindow function will return an HTMLElement that represents the window. This object has a number of functions on it that can be used to interact with the window in different ways.

The following functions are supported:

| function                                                   | description                                                                                                           |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| close()                                                    | Closes the window                                                                                                     |
| minimize(forceState: boolean)                              | Toggles the minimzed state of the window. A boolean can be passed to explicitly set the state                         |
| maximize(forceState: boolean)                              | Toggles the maximized state of the window. A boolean can be passed to explicitly set the state                        |
| isMinimized()                                              | Returns true if the window is in minimized mode                                                                       |
| isMaximized()                                              | Returns true if the window is in maximized mode                                                                       |
| reset()                                                    | Resets all maximize and minimize states for the window                                                                |
| bringToFront()                                             | Brings the window to the front of all other windows                                                                   |
| setPosition(left: number, right: number)                   | Manually sets the coordinates of the window                                                                           |
| setSize(width: number \| string, height: number \| string) | Manually sets the size of the window. Measurements can either be numbers (px) or a valid css measurement as a string. |
| scaleToFit()                                               | Attempts to size the window based on the content inside                                                               |
| center()                                                   | Centers the window on the screen                                                                                      |
| close()                                                    | Closes the window                                                                                                     |

### Example

```javascript
import { openWindow } from "kiwicomponents"
const myWindow = openWindow({
	icon: iconURLGoesHere,
	title: "This is a header!",
	body: `<div>This is some content inside of the window.</div>
			<div>With multiple rows.</div>`,
	footer: `<div> And this is some footer content</div>`
    myWindow.setSize(500, 500)
})
```

<kiwi-button onclick="openWindow().setSize(500, 500);">Try it</kiwi-button>

---

## Options

When creating a window you are able to pass options to the openWindow function. These allow you to adjust what content you want to put inside the window, as well as toggle built-in functionality on and off.

The following options are supported:

| option      | type                                       | description                                                                                  |
| ----------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| noheader    | boolean                                    | If true the window will have no built-in header.                                             |
| nofooter    | boolean                                    | If true the window will have no built-in footer.                                             |
| nominimize  | boolean                                    | If true the window will have no minimize button.                                             |
| nomaximize  | boolean                                    | If true the window will have no maximize button.                                             |
| noclose     | boolean                                    | If true the window will have no close button.                                                |
| nodrag      | boolean                                    | If true the window will not be draggable.                                                    |
| noresize    | boolean                                    | If true the window will not be resizable.                                                    |
| modality    | "none" \| "clickable" \| "disabled"        | Determines if the window has a backdrop, and if the backdrop closes the window when clicked. |
| mode        | "large" \| "default" \| "compact"          | Determines the general dimensions of the window's sections.                                  |
| title       | string                                     | The title for the modal header.                                                              |
| icon        | string                                     | Icon URL for the window.                                                                     |
| noanimation | boolean                                    | If true the window will not animate.                                                         |
| body        | string \| HTMLElement \| () => HTMLElement | The main content of the window                                                               |
| header      | string \| HTMLElement \| () => HTMLElement | A custom header for the window                                                               |
| footer      | string \| HTMLElement \| () => HTMLElement | The footer content for the window                                                            |

### Example:

```javascript
import { openWindow } from "kiwicomponents"
const myWindow = openWindow({
	icon: iconURLGoesHere,
	title: "This is a header!",
	body: `<div>This is some content inside of the window.</div>
			<div>With multiple rows.</div>`,
	footer: `<div> And this is some footer content</div>`,
	modality: "clickable",
	nomaximize: true,
	nominimize: true,
	mode: "large"
})
```

<kiwi-button onclick="openWindow({modality: 'clickable', nomaximize: true, nominimize: true, mode: 'large'});">Try it</kiwi-button>

---

## Styling

The windows can be styled using CSS variables.

The following variables can be set:

| Variable                         | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| --kiwi-window-backdrop-opacity   | Sets the opacity of the window backdrop (if applicable)                               |
| --kiwi-window-shadow             | Sets the box shadow of the window element                                             |
| --kiwi-window-border-radius      | Sets the border radius of the window                                                  |
| --kiwi-window-animation-duration | Sets the animation duration for when the window is opened or closed                   |
| --kiwi-window-header-background  | Sets the background for the window header                                             |
| --kiwi-window-separator-color    | Sets the color for the separator lines between the body section and the header/footer |
| --kiwi-window-body-background    | Sets the background for the window body                                               |
| --kiwi-window-footer-background  | Sets the background for the window footer                                             |

### Example:

```html
<style>
	:root {
		--kiwi-window-animation-duration: 600ms;
		--kiwi-window-body-background: lightgreen;
		--kiwi-window-border-radius: 30px;
	}
</style>
```

<kiwi-button onclick="openWindow().setAttribute('style', '--kiwi-window-animation-duration:600ms;--kiwi-window-header-background:lightgreen;--kiwi-window-border-radius:30px;');">Try it</kiwi-button>
