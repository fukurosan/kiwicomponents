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

The prompt() function opens up a modal with an input field to receive user input and returns a promise that will resolve with the input value. If the user cancels the prompt a null value will be resolved.

### Example

```javascript
import { prompt } from "kiwicomponents"

async function promptUser() {
	const input = await kiwicomponents.prompt("Please fill in something here, thanks.", { value: "Some initial value" })
	console.log(input)
}
```

<kiwi-button onclick="promptUser()">Try it</kiwi-button>

---
