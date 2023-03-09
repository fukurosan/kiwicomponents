# Drawers

Kiwi Components enables you to open configurable drawers for the user.

## Simple Example:

```javascript
import { openDrawer } from "kiwicomponents"
openDrawer({
	body: "Some content inside the drawer!",
	backdrop: true
})
```

<kiwi-button onclick='openDrawer({ body: "Some content inside the drawer!", backdrop: true})'>Try it</kiwi-button>

---

## Drawer Interaction

The openDrawer function will return an HTMLElement that represents the drawer. This object has a number of functions on it that can be used to interact with the toast in different ways.

The following functions are supported:

| function | description       |
| -------- | ----------------- |
| close()  | Closes the drawer |

---

## Options

When launching a toast you are able to pass options to the showToast function. These allow you to adjust what content you want to put inside the toast.

The following options are supported:

| option    | type                                                                                 | description                                                                         |
| --------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| title     | string                                                                               | Optional title for the toast.                                                       |
| subtitle  | string                                                                               | Optional subtitle for the toast.                                                    |
| backdrop  | boolean                                                                              | Determines if there should be a backdrop or not.                                    |
| closeIcon | boolean                                                                              | If set to true a close icon will be added in the top corner closest to the viewport |
| direction | "right" \| "left"                                                                    | Determines if the drawer opens from the left or right of the screen.                |
| body      | string \| HTMLElement \| ((...args: any[]) => HTMLElement)                           | The main content of the drawer                                                      |
| type      | "primary" \| "secondary" \| "neutral" \| "info" \| "success" \| "error" \| "warning" | A type can be configured to change the colors of the drawer header.                 |

### Example:

```javascript
import { openDrawer } from "kiwicomponents"
openDrawer({
	title: "User Settings",
	direction: "right",
	type: "primary",
	body: "Some content inside the drawer!",
	subtitle:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique veniam, impedit iure molestias sit tenetur voluptate odit praesentium delectus, nostrum magni dignissimos nam hic aliquid, unde minus quis eaque recusandae?",
	backdrop: false
})
```

<kiwi-button onclick='openDrawer({ title: "User Settings",direction: "right",type: "primary",body: "Some content inside the drawer!",subtitle:	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique veniam, impedit iure molestias sit tenetur voluptate odit praesentium delectus, nostrum magni dignissimos nam hic aliquid, unde minus quis eaque recusandae?",backdrop: false })'>Try it</kiwi-button>

---
