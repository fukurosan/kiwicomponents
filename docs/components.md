# Components

Kiwi Components come with a number of web components that most applications need and that are generally time consuming to create.

## \<kiwi-button> - Components.Button

\<kiwi-button> is a modern button element that can be styled and configured in a variety of different ways. The motivation for this component is that it comes with built in functionality to display both icons and text, different color combinations as well as neat animations.

### Example:

```html
<kiwi-button>Default</kiwi-button>
<kiwi-button type="primary" fill="light">Light</kiwi-button>
<kiwi-button type="error">Error</kiwi-button>
<kiwi-button icon="YourIconURLHere">With Icon</kiwi-button>
<kiwi-button icon-placement="after" icon="YourIconURLHere">With Reverse Icon</kiwi-button>
<kiwi-button direction="column" icon="YourIconURLHere">With Column Layout</kiwi-button>
```

Result:

<div style="display:flex;flex-direction:column;gap:0.75rem;">
<kiwi-button>Default</kiwi-button>
<kiwi-button useanimation="">Useanimation = true</kiwi-button>
<kiwi-button type="primary" fill="light">Fill = Light</kiwi-button>
<kiwi-button type="error">Type = Error</kiwi-button>
<kiwi-button icon="./img/example-icon-white.svg">With Icon</kiwi-button>
<kiwi-button icon-placement="after" icon="./img/example-icon-white.svg">With Reverse Icon</kiwi-button>
<kiwi-button direction="column" icon="./img/example-icon-white.svg">With Column Layout</kiwi-button>
</div>

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
| useanimation   | "dark"\|"light"\|"link"\|"none"                                                      | Determines The contrast balance in the button and the hover/active/focus look and feel.      |

---

## \<kiwi-spinner> Components.Spinner

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

---

## \<kiwi-split> Components.Split

\<kiwi-split> creates a panel that is split into two parts, with a draggable resizer element in the middle

### Example:

```html
<kiwi-split style="height:300px;width:100%;">
	<div slot="0">
		<kiwi-split direction="row">
			<div slot="0" style="background-color:coral;"></div>
			<div slot="1" style="background-color:cornflowerblue;"></div>
		</kiwi-split>
	</div>
	<div slot="1">
		<kiwi-split direction="row">
			<div slot="0" style="background-color:coral;"></div>
			<div slot="1" style="background-color:cornflowerblue;"></div>
		</kiwi-split>
	</div>
</kiwi-split>
```

Result:

<kiwi-split style="height:300px;">
	<div slot="0">
		<kiwi-split direction="row">
			<div slot="0" style="background-color:coral;"></div>
			<div slot="1" style="background-color:cornflowerblue;"></div>
		</kiwi-split>
	</div>
	<div slot="1">
		<kiwi-split direction="row">
			<div slot="0" style="background-color:coral;"></div>
			<div slot="1" style="background-color:cornflowerblue;"></div>
		</kiwi-split>
	</div>
</kiwi-split>

### Attributes

The following attributes can be configured:

| attribute | type             | description                                                                        |
| --------- | ---------------- | ---------------------------------------------------------------------------------- |
| direction | "row" \| "column | Determines of the layout is from left to right ("row") or top to bottom ("column") |
| split     | string           | Manually sets the size for the index 0 child in the split                          |

### Styling

The following CSS variables can be configured:

| Variable                          | Description                        |
| --------------------------------- | ---------------------------------- |
| --kiwi-split-bar-background-color | Color of the resizer bar           |
| --kiwi-split-handle-color-hover   | Color of the resizer pill          |
| --kiwi-split-handle-color         | Color of the resizer pill on hover |

---

## \<kiwi-tabs> Components.Tabs

\<kiwi-tabs> is a tabbed panel. This component allows you to create tabs and display content depending on what tab is active. The motivation for this component is that many most applications use these types of layouts, and creating them requires a lot of boilerplate and state management.

Tabs are defined using \<kiwi-tab> elements placed inside the \<kiwi-tabs> element. Use the attribute "disabled" to disable a given tab.

To change which tab is selected, set the active-tab-index attribute on the \<kiwi-tabs> element to the index of the tab (starting from 0).

To place content inside of a slot, set the slot attribute on the content to the index of the tab it should be in (starting from 0).

### Example:

```html
<kiwi-tabs active-tab-index="1">
	<kiwi-tab>Hello World</kiwi-tab>
	<kiwi-tab>Some Carpeting</kiwi-tab>
	<kiwi-tab disabled>Fun Stuff</kiwi-tab>
	<div slot="0">
		Tab 1 content Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem consequatur odit, iusto aperiam quos pariatur eum
		perspiciatis ipsam eveniet natus non eius ipsum dolorem hic rem! Nisi?
	</div>
	<div slot="1">
		Tab 2 content Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem consequatur odit, iusto aperiam quos pariatur eum
		perspiciatis ipsam eveniet natus non eius ipsum dolorem hic rem! Nisi?
	</div>
	<div slot="2">
		Tab 3 content Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem consequatur odit, iusto aperiam quos pariatur eum
		perspiciatis ipsam eveniet natus non eius ipsum dolorem hic rem! Nisi?
	</div>
</kiwi-tabs>
```

Result:

<kiwi-tabs active-tab-index="1">
  <kiwi-tab>Hello World</kiwi-tab>
  <kiwi-tab>Some Carpeting</kiwi-tab>
  <kiwi-tab disabled>Fun Stuff</kiwi-tab>
  <div slot="0">
    Tab 1 content
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem
    consequatur odit, iusto aperiam quos pariatur eum perspiciatis ipsam eveniet natus non eius ipsum dolorem hic
    rem! Nisi?
  </div>
  <div slot="1">
    Tab 2 content
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem
    consequatur odit, iusto aperiam quos pariatur eum perspiciatis ipsam eveniet natus non eius ipsum dolorem hic
    rem! Nisi?
  </div>
  <div slot="2">
    Tab 3 content
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem
    consequatur odit, iusto aperiam quos pariatur eum perspiciatis ipsam eveniet natus non eius ipsum dolorem hic
    rem! Nisi?
  </div>
</kiwi-tabs>

### Attributes

The following attributes can be configured:

| attribute        | type                         | description                                                                                |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| active-tab-index | number                       | Index of the selected tab                                                                  |
| direction        | "row"\|"column"              | If set to row the tab menu will top to bottom, otherwise left to right                     |
| noborder         | any                          | If set to any value there will be no border separating the tabs and the content below them |
| variant          | "default"\|"popup"\|"button" | General look and feel of the tab menu                                                      |

The following events are fired:

| name   | description                                                                                                                                                                                                                        |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| change | Change event is fired whenever a tab is clicked. The details of the event contains a tabElement reference and an index property of what tab was pressed. Note that this event is not fired when the attribute is manually updated. |

---

## \<kiwi-multi-toggle> Components.MultiToggle

\<kiwi-multi-toggle> is a stateful multi option toggle component.

The element accepts a stringified array of options, each one with a key and value property. The key property can be used to update the state and will be returned in events when the selection changes by the user.

Check out the following example:

### Example:

```html
<kiwi-multi-toggle id="my-toggle" states='[{"key":"1","value":"Text One"},{"key":"2","value":"Text Two"},{"key":"3","value":"Text Three"}]' selected="1">
</kiwi-multi-toggle>

<script>
	const myToggle = document.querySelector("#my-toggle")
	myToggle.getState() // -> {states: {key: string, value: string}[], selected: string}
	myToggle.setStates([{ key: "someKey", value: "Some new Value" }])
	myToggle.addEventListener("change", e => console.log(e.detail.newSelection))
	myToggle.setSelected("someKey") // -> { newSelection: "someKey" }
</script>
```

Result:

<kiwi-multi-toggle states='[{"key":"1","value":"Text One"},{"key":"2","value":"Text Two"},{"key":"3","value":"Text Three"}]' selected="1"> </kiwi-multi-toggle>

### Attributes

The following attributes can be configured:

| attribute | type                           | description                                                                |
| --------- | ------------------------------ | -------------------------------------------------------------------------- |
| states    | {key: string, value: string}[] | Labels displayed in the toggle, described through a serialized JSON object |
| selected  | string                         | Selected option key                                                        |

The following events are fired:

| name   | description                                                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| change | The change event is fired whenever the selection changes. The event's detail property contains a newSelection property that holds the key for the new selection. |

---

## \<kiwi-rating> Components.Rating

\<kiwi-rating> is a 5-star rating component that can be plugged into any form element.

By default the name property provided to the form will be "rating", but this can be changed using the "name" attribute. Use the "disabled" attribute to disable the element and the "value" attribute to programatically set the value. You can listen to value changes using a simple change event listener.

Check out the following example:

### Example:

```html
<kiwi-rating></kiwi-rating>
```

Result:

<kiwi-rating></kiwi-rating>

### Attributes

The following attributes can be configured:

| attribute | type                           | description                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------- |
| name      | {key: string, value: string}[] | Configures the name attribute for the internal radio buttons                     |
| disabled  | string                         | If set to any value the rating component will be disabled                        |
| value     | 1\|2\|3\|4\|5                  | Sets the selected amount of stars. Setting any other value removes the selection |

The following events are fired:

| name   | description                                                     |
| ------ | --------------------------------------------------------------- |
| change | The change event comes directly from the internal radio buttons |

---

## \<kiwi-card> Components.Card

\<kiwi-card> is a basic card component.

You can either provide the component with a title and a text atrribute or slot in your own custom content. You can also provide either an icon URL, or initials that should be rendered in place of the icon.

### Example:

```html
<kiwi-card title="Title" text="Text Content" icon="KC" direction="horizontal"></kiwi-card>
```

Result:

<kiwi-card title="Title" text="Text Content" icon="KC" direction="horizontal"></kiwi-card>

### Attributes

The following attributes can be configured:

| attribute | type                     | description                                                |
| --------- | ------------------------ | ---------------------------------------------------------- |
| title     | string                   | Header for the card                                        |
| direction | "horizontal"\|"vertical" | Determines if the card is rendered as a row or as a column |
| text      | string                   | Text iside the card, will never expand past 2 rows.        |
| icon      | string                   | An Icon URL or initials to be rendered inside of a circle  |

---

## \<kiwi-treelist-item> Components.Tree

\<kiwi-treelist-item> is a way of creating en expandable tree with optionally selectable items in it.

The component can create visual hierarchies by nesting in the DOM. When you put a treelist item inside of another treelist item the first one will become explodable.

By using the attributes on the items you can control which items are visually "selected" (highlighted). You can also use to the "interactive" attribute to help the component understand if the specific item is selectable or not. If set then an expandable item will for example only expand when the expansion arrow is pressed, rather than the whole item.

This component is a great way of visualising and interacting with tree data, which is a fairly reoccuring need in most business applications that generally requires a lot of boilerplate to build.

### Example:

```html
<div style="height:340px;padding:1em;background-color:white;border: 1px solid lightgray;border-radius:0.5em;">
	<kiwi-treelist-item text="With Icon" icon="./img/example-icon-black.svg">
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
<kiwi-button onclick="loadTreeLists(this)">Load Content</kiwi-button>

<div style="height:340px;padding:1em;background-color:white;border: 1px solid lightgray;border-radius:0.5em;">
	<kiwi-treelist-item text="With Icon" icon="./img/example-icon-black.svg" style="display:none;">
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

---

## \<kiwi-navbar> Components.Navbar

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

## \<kiwi-burger> Components.Burger

\<kiwi-burger> is a side drawer panel with a built-in toggle. This type of togglable side drawer can be found in most responsive applications today, and require a lot of work to set up.

You can programatically open and close the drawer by setting the "open" attribute. The attribute also allows you to monitor the component as it will always reflect the current state.

### Example:

```html
<kiwi-burger> Menu Content</kiwi-burger>
```

Result:
<kiwi-burger> Menu Content</kiwi-burger>

### Attributes

The following attributes can be configured:

| attribute | type | description                                                                                    |
| --------- | ---- | ---------------------------------------------------------------------------------------------- |
| open      | any  | If set to any value the drawer will open. Can also be used to monitor the state of the drawer. |

### Styling

The following CSS variables can be configured:

| Variable                            | Description                      |
| ----------------------------------- | -------------------------------- |
| --kiwi-burger-drawer-button-size    | Size for the toggle button       |
| --kiwi-burger-drawer-button-padding | Padding for the toggle button    |
| --kiwi-burger-drawer-color          | Line color for the toggle button |

---

## \<kiwi-accordion> Components.Accordion

\<kiwi-accordion> is an accordion component where when clicking on it a content panel expands below it. This type of component can be found in a great deal of applications, and requires quite a lot of boilerplate.

If several accordion components are placed as direct siblings in the DOM then opening one drawer will close the others. If you do not want this behaviour then you need to place a blank element in between them.

You can manually control if the accordion is open or not by using the "open" attribute.

### Example:

```html
<kiwi-accordion title="Accordion 1" icon="./Icons/icon-rightarrow-dark.svg">
	<div style="padding:1rem;box-sizing:border-box;">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae. Vestibulum vitae mi ac urna
		molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc. Donec augue sapien, consequat et purus lacinia, egestas sagittis
		lorem.
	</div>
</kiwi-accordion>
<kiwi-accordion title="Accordion 2">
	<div style="padding:1rem;box-sizing:border-box;">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae. Vestibulum vitae mi ac urna
		molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc. Donec augue sapien, consequat et purus lacinia, egestas sagittis
		lorem.
	</div>
</kiwi-accordion>
<kiwi-accordion>
	<div style="padding:1rem;box-sizing:border-box;">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae. Vestibulum vitae mi ac urna
		molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc. Donec augue sapien, consequat et purus lacinia, egestas sagittis
		lorem.
	</div>
</kiwi-accordion>
```

Result:

<kiwi-accordion title="Accordion 1" icon="./img/example-icon-black.svg">
	<div style="padding:1rem;box-sizing:border-box;">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae. Vestibulum vitae mi ac urna molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc. Donec augue sapien, consequat et purus lacinia, egestas sagittis lorem.
	</div>
</kiwi-accordion>
<kiwi-accordion title="Accordion 2">
	<div style="padding:1rem;box-sizing:border-box;">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae. Vestibulum vitae mi ac urna molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc. Donec augue sapien, consequat et purus lacinia, egestas sagittis lorem.
	</div>
</kiwi-accordion>
<kiwi-accordion>
	<div style="padding:1rem;box-sizing:border-box;">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie ultricies magna, quis gravida dolor lacinia vitae. Vestibulum vitae mi ac urna molestie consequat. Sed purus elit, interdum non justo eu, eleifend rhoncus nunc. Donec augue sapien, consequat et purus lacinia, egestas sagittis lorem.
	</div>
</kiwi-accordion>

### Attributes

The following attributes can be configured:

| attribute | type   | description                                       |
| --------- | ------ | ------------------------------------------------- |
| open      | any    | If set to any value the accordion will be opened. |
| title     | string | Configures the title text on the button.          |
| icon      | string | Optionally configures an icon for the button      |

---

## \<kiwi-pill> Components.Pill

\<kiwi-pill> A pill element that can automatically position itself in the top right corner of its closest relative parent.

### Example:

```html
<div style="position:relative;background-color:coral;width:250px;height:250px;display:flex;align-items:center;justify-content:center;">
	A box
	<kiwi-pill>Pill</kiwi-pill>
</div>
```

Result:

<div style="position:relative;background-color:coral;width:250px;height:250px;display:flex;align-items:center;justify-content:center;">
	A box
	<kiwi-pill>Pill</kiwi-pill>
</div>

### Attributes

The following attributes can be configured:

| attribute | type                                                                                 | description                                                            |
| --------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| shape     | "round" \| "square"                                                                  | Should the pill be round or square?                                    |
| mode      | "floating" \| "inline"                                                               | Should the pill float in the top right corner or be positioned inline? |
| type      | "primary" \| "secondary" \| "neutral" \| "info" \| "success" \| "warning" \| "error" | To change the background color of the pill element as required         |

### Styling

The following CSS variables can be configured:

| Variable            | Description                    |
| ------------------- | ------------------------------ |
| --kiwi-offset-top   | Offset distance from the top   |
| --kiwi-offset-right | Offset distance from the right |

---

## \<kiwi-scroll-list> Components.ScrollList

\<kiwi-scroll-list> is a horizontal list that renders arrow buttons to scroll when overflowing. Perfect for lists of links, chips or similar.

### Example:

```html
<div style="width:100%;">
	<kiwi-scroll-list>
		<a>Link #1</a>
		<a>Link #2</a>
		<a>Link #3</a>
		<a>Link #4</a>
		<a>Link #5</a>
		<a>Link #6</a>
		<a>Link #7</a>
		<a>Link #8</a>
	</kiwi-scroll-list>
</div>
```

Result:

<kiwi-scroll-list>
    <a>Link #1</a>
    <a>Link #2</a>
    <a>Link #3</a>
    <a>Link #4</a>
    <a>Link #5</a>
    <a>Link #6</a>
    <a>Link #7</a>
    <a>Link #8</a>
</kiwi-scroll-list>

### Styling

The following CSS variables can be configured:

| Variable                            | Description                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| --kiwi-scroll-list-width            | Width for the list, defaults to 100%                                                       |
| --kiwi-scroll-list-background-color | Background color to match the content behind the list. Necessary for the arrow backgrounds |
| --kiwi-scroll-list-arrow-color      | Color of the arrows                                                                        |
| --kiwi-scroll-list-icon-size        | Size of the arrows                                                                         |
| --kiwi-scroll-list-gap              | width of the gap between items in the list                                                 |

---

## \<kiwi-alert> Components.Alert()

\<kiwi-alert> is a component that visually communicates a strong message. It can optionally be dismissable. The alert element is part of the regular flow of elements in the DOM tree, making it distinct from similar elements like toast notifications.

Any heading element placed inside of the kiwi-alert will be styled fittingly.

### Example:

```html
<kiwi-alert>
	<h4>Default</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="primary" useclosebutton="">
	<h4>Primary</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="secondary" useclosebutton="">
	<h4>Secondary</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="neutral" useclosebutton="">
	<h4>Neutral</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="info" useclosebutton="">
	<h4>Info</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="success">
	<h4>Success</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="warning">
	<h4>Warning</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
<kiwi-alert type="error">
	<h4>Error</h4>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</kiwi-alert>
```

Result:

<kiwi-alert style="display:block;margin-bottom:1rem;">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Default</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="primary" useclosebutton="">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Primary</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="secondary" useclosebutton="">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Secondary</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="neutral" useclosebutton="">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Neutral</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="info" useclosebutton="">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Info</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="success">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Success</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="warning">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Warning</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>
<kiwi-alert style="display:block;margin-bottom:1rem;" type="error">
  <h4 style="margin-top:0;margin-bottom:0.5rem;">Error</h4>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</kiwi-alert>

### Attributes

The following attributes can be configured:

| attribute      | type | description                                          |
| -------------- | ---- | ---------------------------------------------------- |
| useclosebutton | any  | If set a close button will be rendered on the alert. |

### Events

| event | description                                  |
| ----- | -------------------------------------------- |
| close | Fired when the element is closed by the user |

### Styling

The following CSS variables can be configured:

| Variable                        | Description                    |
| ------------------------------- | ------------------------------ |
| --kiwi-alert-border-color       | Color of the left side border  |
| --kiwi-alert-background-color   | Background color for the alert |
| --kiwi-alert-header-color       | Header text color              |
| --kiwi-alert-body-color         | Body text color                |
| --kiwi-alert-stroke-color       | Close icon color               |
| --kiwi-alert-stroke-hover-color | Close icon hover color         |
