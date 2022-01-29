# Getting started

## What is Kiwi Components?
Kiwi Components is an SDK for web browsers.

Kiwi Components aims to be a library that simplifies typically difficult or boilerplate-heavy parts of web application development. The SDK is in particular made for large, advanced applications with complex requirements. Kiwi Components allows you to easily add windows, toasts, context menus and the like to your application through a declarative API.

In some sense this entire library is pure self-defense. 

?> Note that Kiwi Components is still in early beta. Feel free to use it for prototyping and fun, but beware of using it in production just yet.

## At a glance
- Window Management
- Notifications
- Menus (Context Menus, Dropdown menus, etc)
- Tooltips
- And more!

---

> ## Installation

Install using npm:

```bash
$ npm install kiwicomponents
```

Load using a script element:
```html
<script src="https://unpkg.com/kiwicomponents"></script>
```

!> **Tip**  
*If you load the library bundle using a script element then a global variable called `kiwicomponents` will be created. All examples in these docs use standard ES import statements, but in this case you can omit these and instead access the necessary parts of the library by using `kiwicomponents.x`

```html
<script>
//No
import { x } from "kiwicomponents"
//Yes
kiwicomponents.x
</script>
```

---

> ## Using the library

Check out the different sections of this documentation to read more about how to use specific features.