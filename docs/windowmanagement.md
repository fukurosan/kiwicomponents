# Window Management

Kiwi Components enables you to launch windows that users can interact with and that may be manipulated programmatically. All windows can be styled using CSS variables as specified further down, and are configurable with a number of settings.

## Simple Example:

```javascript
import { openWindow } from "kiwicomponents"
const myWindow = openWindow({
	icon: iconURLGoesHere,
	title: "This is a header!",
	draggable: true,
	resizable: true,
	minimizable: true,
	maximizable: true,
	closeButton: true,
	body: `<div>This is some content inside of the window.</div> 
			<div>With multiple rows.</div>`,
	footer: `<div> And this is some footer content</div>`
})
//Note that the body and footer can be either a string, an HTML element or a function that returns an HTML element.
```

<kiwi-button onclick="openWindow({draggable: true, resizable: true, minimizable: true, maximizable: true, closeButton: true})">Try it</kiwi-button>

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
	draggable: true,
	resizable: true,
	minimizable: true,
	maximizable: true,
	closeButton: true,
	body: `<div>This is some content inside of the window.</div>
			<div>With multiple rows.</div>`,
	footer: `<div> And this is some footer content</div>`
    myWindow.setSize(500, 500)
})
```

<kiwi-button onclick="openWindow({draggable: true, resizable: true, minimizable: true, maximizable: true, closeButton: true}).setSize(500, 500);">Try it</kiwi-button>

---

## Options

When creating a window you are able to pass options to the openWindow function. These allow you to adjust what content you want to put inside the window, as well as toggle built-in functionality on and off.

The following options are supported:

| option      | type                                                  | description                                                          |
| ----------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| minimizable | boolean                                               | If set to any value the minimize button will be added to the header. |
| maximizable | boolean                                               | If set to any value the maximize button will be added to the header. |
| closebutton | boolean                                               | If set to any value the close button will be added to the header.    |
| draggable   | boolean                                               | If set to any value the window will be dragable.                     |
| resizable   | boolean                                               | If set to any value the window will be resizable.                    |
| centered    | boolean                                               | If set to any value the window will be centered in the viewport.     |
| modality    | "none" \| "clickable" \| "disabled"                   | configures the backdrop of the window.                               |
| scale       | "none" \| "compact" \| "small "\| "medium" \| "large" | Determines the general dimensions of the window's sections.          |
| title       | string                                                | Header text.                                                         |
| icon        | string                                                | Header icon.                                                         |
| noanimation | boolean                                               | If set to any value no animations will take place.                   |
| body        | string \| HTMLElement \| () => HTMLElement            | The main content of the window                                       |
| header      | string \| HTMLElement \| () => HTMLElement            | A custom header for the window                                       |
| footer      | string \| HTMLElement \| () => HTMLElement            | The footer content for the window                                    |

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
	draggable: true,
	resizable: true,
	closeButton: true,
	scale: "large"
})
```

<kiwi-button onclick="openWindow({modality: 'clickable', scale: 'large', draggable: true, resizable: true, closeButton: true});">Try it</kiwi-button>

---

## Styling

The windows can be styled using CSS variables.

The following variables can be set:

| Variable                         | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| --kiwi-window-animation-duration | Sets the animation duration for when the window is opened or closed                   |
| --kiwi-window-separator-color    | Sets the color for the separator lines between the body section and the header/footer |
| --kiwi-window-body-background    | Sets the background for the window body                                               |
| --kiwi-window-footer-background  | Sets the background for the window footer                                             |
