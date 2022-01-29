# Menus

Kiwi Component menus can be used to create either context menus or dropdown menus that position themselves relative to other elements or the mouse cursor. This is achieved using two web components:

-   \<kiwi-menu>
-   \<kiwi-menu-item> (optional)

## Simple Example:

```html
<div style="width:100px;height:100px;background:lightblue;">
	Right Click Me!
	<kiwi-menu mode="contextmenu">
		<kiwi-menu-item icon="" text="Option 1" detail="Detail"></kiwi-menu-item>
		<kiwi-menu-item icon="" text="Option 2"></kiwi-menu-item>
		<kiwi-menu-item icon="" text="Option 3">
			<kiwi-menu-item icon="" text="Option 1" detail="Detail"></kiwi-menu-item>
			<kiwi-menu-item icon="" text="Option 2" disabled=""></kiwi-menu-item>
			<hr />
			<kiwi-menu-item text="Option 3"> </kiwi-menu-item>
		</kiwi-menu-item>
	</kiwi-menu>
</div>
```

Try it:

<div style="width:100px;height:100px;background:lightblue;-moz-osx-font-smoothing:unset;-webkit-text-size-adjust:unset;">
	Right Click Me!
	<kiwi-menu mode="contextmenu">
		<kiwi-menu-item icon="" text="Option 1" detail="Detail"></kiwi-menu-item>
		<kiwi-menu-item icon="" text="Option 2"></kiwi-menu-item>
		<kiwi-menu-item icon="" text="Option 3">
			<kiwi-menu-item icon="" text="Option 1" detail="Detail"></kiwi-menu-item>
			<kiwi-menu-item icon="" text="Option 2" disabled=""></kiwi-menu-item>
			<hr style="margin:0;border-bottom-color:gray;" />
			<kiwi-menu-item text="Option 3"> </kiwi-menu-item>
		</kiwi-menu-item>
	</kiwi-menu>
</div>

---

## Positioning

The kiwi menu needs a target in order to function and compute how to optimally position itself. The target can be configured in a variety of ways, depending on different use cases.

In order of priority:

-   By manually setting the .targetElement property of the element to a valid HTMLElement
-   By setting the "target" attribute to a valid CSS-selector. This will select the closest(!) element to the menu in the DOM that matches the selector.
-   By positioning the target as a child of the menu inside the "target" slot
-   By positioning the menu inside of the target

```javascript
<!-- Using a selector -->
<div class="target-1">target 1</div>
<kiwi-menu target=".target-1"></kiwi-menu>

<!-- Targeting the parent -->
<div>
	<kiwi-menu></kiwi-menu>
	target 2
</div>

<!-- Targeting the child -->
<kiwi-menu>
	<div slot="target">target 3</div>
</kiwi-menu>

<!-- Setting the target manually -->
<div id="target-4">target 4</div>
<script>
	const menu = document.createElement("kiwi-menu")
	menu.targetElement = document.getElementById("target-4")
</script>

```

---

## kiwi-menu-item

The kiwi menu can technically contain virtually any content. This being said a \<kiwi-menu-item> element can be used to cover most basic menu needs. This element is configured using attributes, and will automatically create a sub menu if a child is appended. This can be another \<kiwi-menu-item>, or any other element.

### Example

```html
<div style="width:100px;height:100px;background:lightblue;">
	Right Click Me!
	<kiwi-menu mode="contextmenu">
		<kiwi-menu-item text="Level 1">
			<kiwi-menu-item text="Level 2"></kiwi-menu-item>
		</kiwi-menu-item>
	</kiwi-menu>
</div>
```

Try it:

<div style="width:100px;height:100px;background:lightblue;">
	Right Click Me!
	<kiwi-menu mode="contextmenu">
		<kiwi-menu-item text="Level 1">
			<kiwi-menu-item text="Level 2"></kiwi-menu-item>
		</kiwi-menu-item>
	</kiwi-menu>
</div>

---

## Modes (dropdown, context menu)

The kiwi menu can be configured into two different modes; dropdown or context menu. The dropdown mode (default) listens to left clicks on the target element, and renders the menu below the target. The context menu listens to right clicks on the target and renders the menu based on the mouse coordinates in the click event.

The mode can be configured using the "mode" attribute.

### Example

```html
<div style="width:100px;height:100px;background:lightblue;">
	Right Click Me!
	<kiwi-menu mode="contextmenu">
		<div style="margin:20px;">A Context Menu</div>
	</kiwi-menu>
</div>
<div style="width:100px;height:100px;background:lightblue;">
	Left Click Me!
	<kiwi-menu mode="dropdown">
		<div style="margin:20px;">A Dropdown Menu</div>
	</kiwi-menu>
</div>
```

Try it:

<div style="width:100px;height:100px;background:lightblue;">
	Right Click Me!
	<kiwi-menu mode="contextmenu">
		<div style="margin:20px;">A Context Menu</div>
	</kiwi-menu>
</div>
<div style="width:100px;height:100px;background:lightblue;">
	Left Click Me!
	<kiwi-menu mode="dropdown">
		<div style="margin:20px;">A Dropdown Menu</div>
	</kiwi-menu>
</div>

---

## Attributes

The menu and menu item elements are configurable using standard HTML attributes.

These following attributes are supported:

### Kiwi Menu

| option      | type                          | description                                                                                                  |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| top         | number                        | Offsets the top position of the menu relative to the target by provided amount of pixels                     |
| left        | number                        | Offsets the left position of the menu relative to the target by provided amount of pixels                    |
| mode        | "dropdown" \| "contextmenu"   | Dropdowns are triggered by left clicking, context menus are triggered by right clicking                      |
| target      | string                        | Target css selector. The menu will attempt to find the closest(!) element in the DOM that matches the query. |
| justify     | "left" \| "center" \| "right" | Determines the horizontal alignment of borders with the target element. Only applicable to dropdowns.        |
| noanimation | any                           | If set to any value the element will not be animated.                                                        |

### Kiwi Menu Item

| option      | type   | description                                                                              |
| ----------- | ------ | ---------------------------------------------------------------------------------------- |
| icon        | string | Optional icon URL. Can be set to a blank value to simply use up the space.               |
| text        | string | text value for the item.                                                                 |
| detail      | string | Detail value for the item. (right aligned suffix)                                        |
| disabled    | string | If set to any value the row will not respond to click events and the text will be faded. |
| noanimation | string | If set to any value the element will not be animated.                                    |

---

## Styling

The Kiwi Component toasts can be styled using CSS variables.

The following variables can be set:

| Variable                             | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| --kiwi-menu-background-color         | background of the menu content                   |
| --kiwi-menu-color                    | Color of the menu content                        |
| --kiwi-menu-shadow                   | Box shadow of the menu                           |
| --kiwi-menu-border-radius            | Border radius of the menu and the menu items     |
| --kiwi-menu-animation-duration       | Animation duration in milliseconds of the menu   |
| --kiwi-menu-disabled-color           | Color of a disabled menu item                    |
| --kiwi-menu-hover-background         | Background of a hovered menu item                |
| --kiwi-menu-hover-color              | Color of a hovered menu item                     |
| --kiwi-menu-submenu-hover-background | Background of a hovered item that has a sub menu |
| --kiwi-menu-submenu-hover-color      | Color of a hovered item that has a sub menu      |
