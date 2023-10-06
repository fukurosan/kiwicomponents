# Tooltips

Kiwi Components tooltips can be created by either enabling a global custom HTML attribute or by utilizing the \<kiwi-tooltip> element.

To use the tooltip as a web component you will need to import it:
```javascript
import { Components } from "kiwicomponents"
Components.Tooltip()

//Or initialize all components:

import { init } from "kiwicomponents"
init()
```

This step is not necessary for its global state.

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

Kiwi Components can be configured to automatically monitor the DOM for certain attributes, and generate tooltips when needed. This is the easiest way to create tooltips.

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
	target 2
	<kiwi-tooltip></kiwi-tooltip>
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

Tooltip elements can be configured using standard HTML attributes. The global attributes can also be used to create and configure tooltips.

The following attributes are supported:

### Global Attributes

| attribute                | type   | description                                 |
| ------------------------ | ------ | ------------------------------------------- |
| kiwi-tooltip             | string | Text inside of the tooltip                  |
| kiwi-tooltip-position    | string | Equivalent to "position" of kiwi-tooltip    |
| kiwi-tooltip-delay       | number | Equivalent to "delay" of kiwi-tooltip       |
| kiwi-tooltip-noanimation | any    | Equivalent to "noanimation" of kiwi-tooltip |

### Kiwi Tooltip Attributes

| attribute   | type                                                          | description                                                                                                     |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| position    | "top" \| "right" \| "bottom" \| "left" \| "mouse" \| "follow" | Determines how the tooltip should be positioned relative to the target element.                                 |
| target      | string                                                        | Target css selector. The tooltip will attempt to find the closest(!) element in the DOM that matches the query. |
| delay       | number                                                        | Delay in ms before the tooltip should be displayed.                                                             |
| noanimation | string                                                        | If set to any value the element will not be animated.                                                           |

---

## Styling

Tooltips can be styled using CSS variables.

The following variables can be set:

| Variable                          | Description                                  |
| --------------------------------- | -------------------------------------------- |
| --kiwi-tooltip-padding            | Padding of the tooltip                       |
| --kiwi-tooltip-max-width          | Maximum width of the tooltip before it wraps |
