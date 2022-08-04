# Components

Kiwi Components come with a number of web components that most applications need and that are generally time consuming to create.

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
| --kiwi-button-outline-activated    | Outline when button is in :hover or :active mode |
| --kiwi-button-box-shadow-activated | Shadow when button is in :hover or :active mode  |

---

## \<kiwi-spinner>

\<kiwi-spinner> is a loading indicator. The motivation for this component is that most modern applications require one, yet they can be cumbersome to develop.

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

---

## \<kiwi-tabs>

\<kiwi-tabs> is a tabbed panel. This component allows you to create tabs and display content depending on what tab is active. The motivation for this component is that many modern applications use these types of layouts, and creating them requires a lot of boilerplate and state management.

Tab labels are provided as a comma separated string attribute "labels". For each provided value a tab will be created. To insert content into the tab simply set the slot attribute to the label. The currently open tab can be manipulated and inspected using the active-tab attribute

### Example:

```html
<kiwi-tabs labels="Tab 1,Tab 2,Tab 3" active-tab="Tab 2" disabled-tabs="Tab 3">
	<div slot="Tab 1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae.</div>
	<div slot="Tab 2">Vestibulum vitae mi ac urna molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc.</div>
	<div slot="Tab 3">Donec augue sapien, consequat et purus lacinia, egestas sagittis lorem.</div>
</kiwi-tabs>
```

Result:

<kiwi-tabs labels="Tab 1,Tab 2,Tab 3" active-tab="Tab 2" disabled-tabs="Tab 3">
	<div slot="Tab 1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae.</div>
	<div slot="Tab 2">Vestibulum vitae mi ac urna molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc.</div>
	<div slot="Tab 3">Donec augue sapien, consequat et purus lacinia, egestas sagittis lorem.</div>
</kiwi-tabs>

### Attributes

The following attributes can be configured:

| attribute     | type   | description                                    |
| ------------- | ------ | ---------------------------------------------- |
| labels        | string | Comma separated list of tab labels             |
| active-tab    | string | Currently active tab                           |
| disabled-tabs | string | Comma separated list of tabs that are disabled |

### Styling

The following CSS variables can be configured:

| Variable                                        | Description                                      |
| ----------------------------------------------- | ------------------------------------------------ |
| --kiwi-tab-panel-border-radius                  | Border radius for the tabs                       |
| --kiwi-tab-panel-tab-selected-background        | Background for the selected tab                  |
| --kiwi-tab-panel-tab-selected-color             | Color for the selected tab                       |
| --kiwi-tab-panel-tab-selected-active-background | background for the selected tab in active state  |
| --kiwi-tab-panel-tab-selected-active-color      | Color for the selected tab in active state       |
| --kiwi-tab-panel-tab-background                 | background for non-selected tabs                 |
| --kiwi-tab-panel-tab-color                      | Color for non-selected tabs                      |
| --kiwi-tab-panel-tab-active-background          | background for non-selected tabs in active state |
| --kiwi-tab-panel-tab-active-color               | Color for non-selected tabs in active state      |

---

## \<kiwi-treelist-item>

\<kiwi-treelist-item> is a way of creating en expandable tree with optionally selectable items in it.

The component can create visual hierarchies by nesting in the DOM. When you put a treelist item inside of another treelist item the first one will become explodable.

By using the attributes on the items you can control which items are visually "selected" (highlighted). You can also use to the "interactive" attribute to help the component understand if the specific item is selectable or not. If set then an expandable item will for example only expand when the expansion arrow is pressed, rather than the whole item.

This component is a great way of visualising and interacting with tree data, which is a fairly reoccuring need in most business applications that generally requires a lot of boilerplate to build.

### Example:

```html
<div style="height:340px;padding:1em;background-color:white;border: 1px solid lightgray;border-radius:0.5em;">
	<kiwi-treelist-item text="With Icon" icon="./example-icon-black.svg">
		<kiwi-treelist-item text="Just text">
			<kiwi-treelist-item text="Blank icon" icon="">
				<kiwi-treelist-item interactive="" text="Selectable 1"></kiwi-treelist-item>
				<kiwi-treelist-item interactive="" text="Selectable 2"></kiwi-treelist-item>
			</kiwi-treelist-item>
		</kiwi-treelist-item>
		<kiwi-treelist-item text="Another option">
			<kiwi-treelist-item text="Yet another option" icon="">
				<kiwi-treelist-item interactive="" text="Selectable 3"></kiwi-treelist-item>
			</kiwi-treelist-item>
		</kiwi-treelist-item>
	</kiwi-treelist-item>
	<script>
		const allInteractiveElements = []
		Array.from(document.querySelectorAll("kiwi-treelist-item")).forEach(element => {
			if (element.hasAttribute("interactive")) {
				element.addEventListener("click", () => {
					allInteractiveElements.forEach(item => item.removeAttribute("selected"))
					element.setAttribute("selected", "")
				})
				allInteractiveElements.push(element)
			}
		})
	</script>
</div>
```

Result:

<div style="height:340px;padding:1em;background-color:white;border: 1px solid lightgray;border-radius:0.5em;">
	<kiwi-treelist-item text="With Icon" icon="./example-icon-black.svg">
		<kiwi-treelist-item text="Just text">
			<kiwi-treelist-item text="Blank icon" icon="">
				<kiwi-treelist-item interactive="" text="Selectable 1"></kiwi-treelist-item>
				<kiwi-treelist-item interactive="" text="Selectable 2"></kiwi-treelist-item>
			</kiwi-treelist-item>
		</kiwi-treelist-item>
		<kiwi-treelist-item text="Another option">
			<kiwi-treelist-item text="Yet another option" icon="">
				<kiwi-treelist-item interactive="" text="Selectable 3"></kiwi-treelist-item>
			</kiwi-treelist-item>
		</kiwi-treelist-item>
	</kiwi-treelist-item>
	<script>
		console.log("hey")
		const allInteractiveElements = []
		Array.from(document.querySelectorAll("kiwi-treelist-item")).forEach(element => {
			if (element.hasAttribute("interactive")) {
				element.addEventListener("click", () => {
					allInteractiveElements.forEach(item => item.removeAttribute("selected"))
					element.setAttribute("selected", "")
				})
				allInteractiveElements.push(element)
			}
		})
	</script>
</div>

### Attributes

The following attributes can be configured:

| attribute   | type   | description                                                                                          |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------- |
| open        | any    | If set the item will explode its content                                                             |
| text        | string | The text of the tree item                                                                            |
| icon        | string | An icon URL. If set to an empty string an empty icon will be added.                                  |
| interactive | any    | If set then exploding/imploding will only occur when clicking the arrow, rather than the whole item. |
| selected    | any    | If set the item will be styled as selected                                                           |

### Styling

The following CSS variables can be configured:

| Variable                              | Description                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------- |
| --kiwi-treelist-font-size             | Font size for the tree list item (other measurements are relative to this!) |
| --kiwi-treelist-font-weight           | Font weight of the tree list item                                           |
| --kiwi-treelist-animation-duration    | Duration for all animations and transitions                                 |
| --kiwi-treelist-line-color            | Color for the lines in the tree                                             |
| --kiwi-treelist-expand-arrow-icon-url | Custom icon URL for the expand arrow                                        |
| --kiwi-treelist-hover-background      | Background when hovered                                                     |
| --kiwi-treelist-hover-color           | Color when hovered                                                          |
| --kiwi-treelist-selected-background   | Background when selected                                                    |
| --kiwi-treelist-selected-color        | Color when selected                                                         |
| --kiwi-treelist-focus-background      | Background when focused                                                     |
| --kiwi-treelist-focus-color           | Color when focused                                                          |

---

## \<kiwi-navbar>

\<kiwi-navbar> is a modern navbar with responsiveness built in.

The navbar can be used in tandem with \<kiwi-navbar-item> which is an element made specifically to be used together with it. These navbar items will all take up an equal amount of space inside of the navbar, allowing you to create equal sections, and center things inside.

The navbar can be configured with breakpoints, which allows it to become responsive. In your markup you are then able to specify what should exist in each breakpoint. Your provided breakpoints are numbers (width in pixels) separated by commas, showing where the sections start and end. You place content inside of each responsive section by providing a slot number.

For example, if we say that responsive-breakpoint="600,800,1000" then that means that any element with slot="0" will be visible when the page width is between 0 and 600. If we use slot="1" then it will be visible when the width is between 600 and 800. And so on. If no slot is provided then the content will always be visible, and will be prefixed to the left of all other content. This is useful if you want to, for example, add a logotype.

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

---

## \<kiwi-drawer>

\<kiwi-drawer> is a side drawer panel with a built-in toggle. This type of togglable side drawer can be found in most responsive applications today, and require a lot of work to set up.

The drawer can either open from the left or from the right. You can adjust the positioning of the close-toggle inside the menu, the general look and feel, as well as if the drawer should open from the left or from the right. You can also programatically open and close the drawer by setting the "open" attribute. The attribute also allows you to monitor the component as it will always reflect the current state.

### Example:

```html
Opens from the right side (default):
<kiwi-drawer> Right Menu </kiwi-drawer>
Opens from the left side:
<kiwi-drawer direction="left"> Left Menu </kiwi-drawer>
```

Result:
<kiwi-drawer> Right Menu </kiwi-drawer>
<kiwi-drawer direction="left"> Left Menu </kiwi-drawer>

### Attributes

The following attributes can be configured:

| attribute | type            | description                                                                                    |
| --------- | --------------- | ---------------------------------------------------------------------------------------------- |
| direction | "left"\|"right" | Tells the component if the drawer should open from the left or right.                          |
| open      | any             | If set to any value the drawer will open. Can also be used to monitor the state of the drawer. |

### Styling

The following CSS variables can be configured:

| Variable                                            | Description                                              |
| --------------------------------------------------- | -------------------------------------------------------- |
| --kiwi-burger-drawer-button-size                    | Size for the toggle button                               |
| --kiwi-burger-drawer-button-background              | Background for the toggle button                         |
| --kiwi-burger-drawer-button-border-radius           | Border radius for the toggle button                      |
| --kiwi-burger-drawer-button-padding                 | Padding for the toggle button                            |
| --kiwi-burger-drawer-button-hover-background        | Hover background for the toggle button                   |
| --kiwi-burger-drawer-button-line-color              | Line color for the toggle button                         |
| --kiwi-burger-drawer-button-line-hover-color        | Hover line color for the toggle button                   |
| --kiwi-burger-drawer-close-button-horizontal-offset | Horizontal offset for the close button inside the drawer |
| --kiwi-burger-drawer-close-button-vertical-offset   | Vertical offset for the close button inside the drawer   |
| --kiwi-burger-drawer-width                          | Prefered width of the open drawer                        |
| --kiwi-burger-drawer-background                     | Background of the drawer                                 |
| --kiwi-burger-drawer-animation-duration             | Animation duration for the drawer                        |
