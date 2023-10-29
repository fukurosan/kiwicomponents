# Getting started

## What is Kiwi Components?

Kiwi Components is an SDK for web browsers.

The library aims to simplify typically difficult or boilerplate-heavy parts of web application development, and enables you to easily add functionality like window management, notifications, context menus and a whole bunch more through a declarative API.

The entire library is framework agnostic, and purely built on standard HTML, CSS and JavaScript. This means that regardless of what other technologies you are working with Kiwi Components will be compatible with them.

?> Note that Kiwi Components is still in early beta.

---

> ## Installation

### NPM

Install using npm:

```bash
$ npm install kiwicomponents
```

You can then use the library like so:

```javascript
import { init, Components, alert } "kiwicomponents"
import "kiwicomponents/dist/css/bundle.css" // -> Imports all CSS file(s)
import "kiwicomponents/dist/css/forms.css" // -> Imports specific css file only
// init function initializes all web components
init()
// Specific components can also be initialized one by one which allows for tree shaking
Components.Tree()
// Utility functions can also be easily imported and used
alert()
```

If you are working with some form of SSR framework you may get errors like "document is not defined" when executing functions from the library. For these cases you need to ensure that the functions imported are only executed in the client.

You can also load the entire library using a script element like so:

```html
<script src="https://unpkg.com/kiwicomponents"></script>
<link rel="stylesheet" href="https://unpkg.com/kiwicomponents/dist/css/bundle.css">
```

If you load the library bundle using a script element then a global variable called `kiwicomponents` will be created. All examples in these docs use standard ES import statements, but in this case you can omit these and instead access the necessary parts of the library by using `kiwicomponents.x`

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

Storybook is used for development of the library. You can use Storybook to play around with components, but note that its primary purpose in this project is not to be used for documentation. You can access it through UNPKG [here](https://www.unpkg.com/kiwicomponents/dist/storybook/index.html) 