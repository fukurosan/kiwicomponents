# Utility

Kiwi Components comes with a few nice to have utility functions.

## confirm()

The confirm() function is a modern take on window.confirm(). It takes a message as input and returns a promise that will resolve to true if the user presses the confirm button, and false if the user presses the cancel button.

### Example

```javascript
import { confirm } from "kiwicomponents"

const confirmWithUser = async () => {
	const choice = await confirm("This action is irreversible. Proceed?")
	console.log(choice)
}
```

<kiwi-button onclick="confirmExample()">Try it</kiwi-button>

---

## showSpinner()

The showSpinner() function opens up a modal spinner with a loading message, and returns a function that can be used to close it again.

### Example

```javascript
import { showSpinner } from "kiwicomponents"

const pretendToLoad = async () => {
	const closeSpinner = showSpinner("Jumping up and down...")
	setTimeout(() => {
		closeSpinner()
	}, 3000)
}
```

<kiwi-button onclick="pretendToLoad()">Try it</kiwi-button>

---

## alert()

The alert() function opens up a modal with an important message for the user that must be actively dismissed.

### Example

```javascript
import { alert } from "kiwicomponents"

const openAlert = async () => {
	alert("Important Alert", "This is an important message for the user", "Dismiss", "warning", null)
}
```

<kiwi-button onclick="openAlert()">Try it</kiwi-button>

---

## prompt()

The prompt() function opens up a modal with a form to receive user input and returns a promise that will resolve with the input value(s). If the user cancels the prompt a null value will be resolved.

The simplest way to use the function is to provide a title, as well as an optional object of attributes that should be applied to the form input field.

### Example

```javascript
import { prompt } from "kiwicomponents"

async function promptUser() {
	//All values in the second argument object will be applied to the input field as attributes
	const input = await kiwicomponents.prompt("Please fill in something here, thanks.", { value: "Some initial value" })
	console.log(input) // -> "Whatever the user typed in or null"
}
```

<kiwi-button onclick="promptUser()">Try it</kiwi-button>

You can also provide an entire form, either as a string or an HTML form element. If you provide a form as input then the returned output will be an object.

```javascript
//Providing an entire form
async function promptUserWithForm() {
	//You can provide the form as a string, and the function will try to parse it for you
	const formString = `
        <form style="display:flex;flex-direction:column;gap:0.5rem;">
          <input placeholder="First Name" name="firstName" required>
          <input placeholder="Last Name" name="lastName" value="Smith" required>
          <input placeholder="Second Last Name" name="lastName" required>
        </form>
        `
	//Or you can provide an actual HTML form element
	const form = new DOMParser().parseFromString(formString, "text/html").body.children[0]
	const input = await kiwicomponents.prompt("Fill in the details below", form)
	//In this case the result will be a json object, where each key is the name attribute of the input field.
	console.log(input) // -> { firstName: "User inputed value", lastName: ["Value 1", "Value 2"] }
}
```

<kiwi-button onclick="promptUserWithForm()">Try it</kiwi-button>

---
