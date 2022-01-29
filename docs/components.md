# Components

Kiwi Components come with a few supporting web components that most applications need and that can be easily implemented.

## \<kiwi-button>

\<kiwi-button> is a modern button element that can be styled and configured in a variety of different ways. The motivation for this component is that it comes with built in functionality to display both icons and text, different color combinations as well as neat animations.

### Example:

```html
<kiwi-button>Default</kiwi-button>
<kiwi-button type="error">Error</kiwi-button>
<kiwi-button icon="YourIconURLHere">With Icon</kiwi-button>
<kiwi-button icon-placement="after" icon="YourIconURLHere">With Reverse Icon</kiwi-button>
<kiwi-button direction="column" icon="YourIconURLHere">With Column Layout</kiwi-button>
```

Result:
<br><br>
<kiwi-button>Default</kiwi-button>
<br><br>
<kiwi-button type="error">Error</kiwi-button>
<br><br>
<kiwi-button icon="./example-icon-white.svg">With Icon</kiwi-button>
<br><br>
<kiwi-button icon-placement="after" icon="./example-icon-white.svg">With Reverse Icon</kiwi-button>
<br><br>
<kiwi-button direction="column" icon="./example-icon-white.svg">With Column Layout</kiwi-button>

### Attributes

The following attributes can be configured:

| attribute      | type                                                                                 | description                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| disabled       | any                                                                                  | If set to any value the button will not fire click events, and get styled as being disabled. |
| kiwistyle      | string                                                                               | Custom inline styles to be applied to the internal button element.                           |
| icon           | string                                                                               | Optional icon URL.                                                                           |
| icon-placement | "before"\|"after"                                                                    | Icon position. Default is "before".                                                          |
| type           | "primary" \| "secondary" \| "neutral" \| "info" \| "success" \| "error" \| "warning" | Determines the look and feel of the button.                                                  |
| size           | "small" \| "medium" \| "large"                                                       | Determines the size of the button. Defaults to "medium".                                     |
| direction      | "column" \| "row"                                                                    | Determines the direction of the icon and button text (row or column). Default is row.        |
| noanimation    | any                                                                                  | If set to any value the button background will not animate on hover.                         |

### Styling

The following CSS variables can be configured:

| Variable                           | Description                                      |
| ---------------------------------- | ------------------------------------------------ |
| --kiwi-button-border               | Border of the button                             |
| --kiwi-button-outline              | Outline of the button                            |
| --kiwi-button-animation-duration   | Hove animation duration                          |
| --kiwi-button-border-radius        | Border radius of the button                      |
| --kiwi-button-box-shadow           | Box shadow of the button                         |
| --kiwi-button-border-activated     | Border when button is in :hover or :active mode  |
| --kiwi-button-outline-activated    | outline when button is in :hover or :active mode |
| --kiwi-button-box-shadow-activated | shadow when button is in :hover or :active mode  |

## \<kiwi-spinner>

\<kiwi-spinner> is a simple yet modern loading indicator. The motivation for this component is that most modern applications require one, yet they can be cumbersome to develop.

### Example:

```html
<div style="width:100px;height:100px;">
	<kiwi-spinner></kiwi-spinner>
</div>
<kiwi-spinner size="50px"></kiwi-spinner>
<kiwi-spinner size="50px" usebackground></kiwi-spinner>
<kiwi-spinner size="50px" percent="75" usebackground></kiwi-spinner>
```

Result:

<div style="display:flex;gap:1rem;align-items: center;">
	<div style="width:100px;height:100px;">
		<kiwi-spinner></kiwi-spinner>
	</div>
	<kiwi-spinner size="50px"></kiwi-spinner>
	<kiwi-spinner size="50px" usebackground></kiwi-spinner>
	<kiwi-spinner size="50px" percent="75" usebackground></kiwi-spinner>
</div>

### Attributes

The following attributes can be configured:

| attribute     | type   | description                                                                       |
| ------------- | ------ | --------------------------------------------------------------------------------- |
| size          | number | Size of the spinner in pixels. By default the spinner takes up all space it gets. |
| percent       | number | Percentage (0-100) loaded. If not set the spinner will start spinning.            |
| usebackground | any    | If set to any value a background will be displayed behind the spinner wheel.      |

### Styling

The following CSS variables can be configured:

| Variable                        | Description                           |
| ------------------------------- | ------------------------------------- |
| --kiwi-spinner-color            | Color of the spinner wheel            |
| --kiwi-spinner-background-color | Color of the spinner wheel background |

## \<kiwi-navbar>

\<kiwi-navbar> is a modern navbar with responsiveness built-in. The motivation for this component is that when prototyping new applications it is nice to be able to just drop in a navbar that is already responsive and ready to go. The navbar is not built to cover every single use case, but should tackle most.

The navbar can be used in tandem with \<kiwi-navbar-item> which is an element made specifically to be placed inside of it. Although, naturally, you can place anything inside of the navbar. These navbar items will all take up an equal amount of space inside of the navbar, allowing you to create equal sections, and center things inside.

The navbar can be configured with breakpoints, which allows it to become responsive. In your markup you are able to specify what should exist in each breakpoint. Your provided breakpoints are numbers (width in pixels) separated by commas, showing where the sections start and end. You place content inside of each responsive section by providing a slot number.

For example, if we say that responsive-breakpoint="600,800,1000" then that means that any element with slot="0" will be visible when the page width is between 0 and 600. If we use slot="1" then it will be visible when the width is between 600 and 800. And so on. If no slot is provided then the content will always be visible, and will be positioned from the left side. This is useful if you want to, for example, add a logotype.

### Example:

```html
<kiwi-navbar responsive-breakpoint="800">
	<kiwi-navbar-item justify="left">Logotype</kiwi-navbar-item>
	<kiwi-navbar-item slot="1" justify="center">Hello world</kiwi-navbar-item>
	<kiwi-navbar-item slot="1" justify="right">Hello world</kiwi-navbar-item>
	<kiwi-navbar-item slot="0" justify="right"> Hello World. This is some mobile content right here!</kiwi-navbar-item>
</kiwi-navbar>
```

### Attributes

The following attributes can be configured for \<kiwi-navbar>:

| attribute             | type                   | description                                                                                             |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| responsive-breakpoint | number[]               | Comma separated string with viewport widths in pixels where the navbar will switch between content.     |
| mode                  | "sticky" \| "relative" | When "sticky" is set the navbar sticks to the top of viewport, if relative it is positioned statically. |

The following attributes can be configured for \<kiwi-navbar-item>:

| attribute | type                          | description                                        |
| --------- | ----------------------------- | -------------------------------------------------- |
| justify   | "left" \| "center" \| "right" | Determines how the item should justify its content |

### Styling

The following CSS variables can be configured:

| Variable                    | Description                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| --kiwi-navbar-height        | Height of the navbar                                                           |
| --kiwi-navbar-margin        | Margin around the navbar                                                       |
| --kiwi-navbar-background    | Background of the navbar                                                       |
| --kiwi-navbar-border        | Border around the navbar                                                       |
| --kiwi-navbar-outline       | Outline for the navbar                                                         |
| --kiwi-navbar-shadow        | Box shadow for the navbar                                                      |
| --kiwi-navbar-border-radius | Border radius for the navbar                                                   |
| --kiwi-navbar-padding       | Padding for the content of the navbar                                          |
| --kiwi-navbar-item-flex     | Flex for the kiwi-navbar-item elements. Can be used to target a specific item. |
