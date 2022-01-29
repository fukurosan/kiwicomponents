# Getting started

## What is Kiwi Components?
Kiwi Components is an SDK for web browsers.

The library aims to simplify typically difficult or boilerplate-heavy parts of web application development, and enables you to easily add functionality like window management, notifications, context menus and a whole bunch more through a declarative API.

The entire library is framework agnostic, and purely built on standard HTML, CSS and JavaScript. This means that regardless of what other technologies you are working with Kiwi Components will be compatible with them.

In some sense one could argue that this entire library was made out of pure self-defense against a myriad of requirements and needs from projects.

?> Note that Kiwi Components is still in early beta.

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