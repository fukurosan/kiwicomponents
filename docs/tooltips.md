# Tooltips

Kiwi Component component tooltips can be created by either enabling a global custom HTML attribute that Kiwi Components uses to attach tooltips, or by utilizing the \<kiwi-tooltip> element.

## Simple Example:

```html
<div style="width:100px;height:100px;background:lightgoldenrodyellow;">
	Hover Me!
	<kiwi-tooltip position="top">This is a tooltip!</kiwi-tooltip>
</div>
```

Try it:

<div style="width:100px;height:100px;background:lightgoldenrodyellow;">
	Hover Me!
	<kiwi-tooltip position="top">This is a tooltip!</kiwi-tooltip>
</div>

---

## Global Tooltips Attributes

The kiwi tooltips can be configured to automatically monitor the DOM for certain attributes, and generate themselves when needed. This is the easiest way to create tooltips.

To enable the global tooltips attributes you must import and execute the enableGlobalTooltips() function.

### Example:

```javascript
import { enableGlobalTooltips } from "kiwicomponents"
enableGlobalTooltips()
```

```html
<div kiwi-tooltip="This is a tooltip!" kiwi-tooltip-position="top" style="width:100px;height:100px;background:lightgoldenrodyellow;">Hover Me!</div>
```

Try it:

<div kiwi-tooltip="This is a tooltip!" kiwi-tooltip-position="top" style="width:100px;height:100px;background:lightgoldenrodyellow;">
	Hover Me!
</div>

## Positioning

The kiwi tooltip needs a target in order to function and compute how to optimally position itself. The target can be configured in a variety of ways, depending on different use cases.

In order of priority:

-   By manually setting the .targetElement property of the element to a valid HTMLElement
-   By setting the "target" attribute to a valid CSS-selector. This will select the closest(!) element to the tooltip in the DOM that matches the selector.
-   By positioning the target as a child of the tooltip inside the "target" slot
-   By positioning the tooltip inside of the target

```javascript
<!-- Using a selector -->
<div class="target-1">target 1</div>
<kiwi-tooltip target=".target-1"></kiwi-tooltip>

<!-- Targeting the parent -->
<div>
	<kiwi-tooltip></kiwi-tooltip>
	target 2
</div>

<!-- Targeting the child -->
<kiwi-tooltip>
	<div slot="target">target 3</div>
</kiwi-tooltip>

<!-- Setting the target manually -->
<div id="target-4">target 4</div>
<script>
	const tooltip = document.createElement("kiwi-tooltip")
	tooltip.targetElement = document.getElementById("target-4")
</script>

```

---

## Attributes

The kiwi tooltip elements can be configured using standard HTML attributes. The global attributes can also be used to create and configure tooltips.

These following attributes are supported:

### Global Attributes

| attribute                | type   | description                                 |
| ------------------------ | ------ | ------------------------------------------- |
| kiwi-tooltip             | string | Text inside of the tooltip                  |
| kiwi-tooltip-position    | string | Equivalent to "position" of kiwi-tooltip    |
| kiwi-tooltip-delay       | number | Equivalent to "delay" of kiwi-tooltip       |
| kiwi-tooltip-padding     | string | Equivalent to "padding" of kiwi-tooltip     |
| kiwi-tooltip-noanimation | any    | Equivalent to "noanimation" of kiwi-tooltip |

### Kiwi Tooltip Attributes

| attribute   | type                                                          | description                                                                                                     |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| position    | "top" \| "right" \| "bottom" \| "left" \| "mouse" \| "follow" | Determines how the tooltip should be positioned relative to the target element.                                 |
| target      | string                                                        | Target css selector. The tooltip will attempt to find the closest(!) element in the DOM that matches the query. |
| delay       | number                                                        | Delay in ms before the tooltip should be displayed.                                                             |
| padding     | string                                                        | Padding expressed as a valid css measurement string.                                                            |
| noanimation | string                                                        | If set to any value the element will not be animated.                                                           |

---

## Styling

The Kiwi Component tooltips can be styled using CSS variables.

The following variables can be set:

| Variable                          | Description                                  |
| --------------------------------- | -------------------------------------------- |
| --kiwi-tooltip-background         | Background of the tooltip                    |
| --kiwi-tooltip-color              | Color of the tooltip content                 |
| --kiwi-tooltip-border-radius      | Border radius of the tooltip                 |
| --kiwi-tooltip-max-width          | Maximum width of the tooltip before it wraps |
| --kiwi-tooltip-animation-duration | Animation duration                           |

### Example:

```html
<style>
	:root {
		--kiwi-tooltip-animation-duration: 300ms;
		--kiwi-tooltip-background: lightgoldenrodyellow;
		--kiwi-tooltip-color: black;
		--kiwi-tooltip-border-radius: 0px;
	}
</style>
```

Try it:

<div style="width:100px;height:100px;background:lightgoldenrodyellow;">
	Hover Me!
	<kiwi-tooltip style="--kiwi-tooltip-animation-duration: 300ms;--kiwi-tooltip-background: lightgoldenrodyellow; --kiwi-tooltip-color: black;--kiwi-tooltip-border-radius: 0px;" position="top">This is a tooltip!</kiwi-tooltip>
</div>
