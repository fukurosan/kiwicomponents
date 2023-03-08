# State Manager

The state manager is meant to help simplify state management in applications. The kiwi components state manager allows developers to subscribe to changes state variables, and debug state updates during development.

## How to

The basic API for the state manager is really simple. You can import it like so:

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()
```

The resulting state manager instance is global. This means that no matter where you import it, it will always return the same manager instance.

### Storing and Retrieving State

To store and retrieve state you can use the setState and getState functions. All that that is stored requires a key and value pair. The key can be anything, including objects.

A simple example:

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

sm.setState("fruits", ["apple", "orange", "banana"])
sm.getState("fruits") // -> ["apple", "orange", "banana"]
```

You may want to peek inside the state manager to see what state is currently stored. You can do so using listAllKeys() and listAllState()

Example:

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

sm.setState("fruits", ["apple", "orange", "banana"])
sm.setState("berries", ["blueberry", "raspberry", "blackberry"])

sm.listAllKeys() // -> ["fruits", "berries"]
sm.listAllState() // -> [["fruits", ["apple", "orange", "banana"]], ["berries", ["blueberry", "raspberry", "blackberry"]]]
```

To remove state from the state manager you can either use clearState(key) or clearAllState() to completely empty the manager.

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

sm.setState("fruits", ["apple", "orange", "banana"])
sm.setState("berries", ["blueberry", "raspberry", "blackberry"])
sm.listAllKeys() // -> ["fruits", "berries"]
sm.clearState("fruits")
sm.listAllKeys() // -> ["berries"]
sm.clearAllState()
sm.listAllKeys() // -> []
```

### Listeners

You can subscribe to keys in the state manager, and listen for changes. The state manager will fire your provided function whenever the key has been updated. The provided function will be passed an object containing both the new and the old value for the key. You can remove a listener using the removeListener function.

Example:

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

const listener = ({ oldValue, newValue }) => {
	console.log(oldValue)
	console.log(newValue)
}
sm.addListener("fruit", listener)
setTimeout(() => sm.removeListener("fruit", listener), 1000)

sm.setState("fruit", "apple")
sm.setState("fruit", "banana")
```

If you want to set your state without emitting an event you can provide this as an option to the setState function:

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

const listener = () => console.log
sm.addListener("fruit", listener)
sm.setState("fruit", "apple", { emit: false })
```

If you want to force an update you can do so using the forceUpdate function. If you do not provide a key then all keys will be forcefully updated. What this means is that all listeners are triggered. Note that "oldValue" will be undefined for forced updates.

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

const listener = () => console.log
sm.addListener("fruit", listener)
sm.setState("fruit", "apple", { emit: false })
sm.forceUpdate("fruit")
```

### Middleware

You can integrate middleware to the state setter and state getter functions using addMiddleware() and removeMiddleware(). The middlewares will execute in the order provided. The argument passed to the function is the value that is being set/get. The result of the final middleware should be the value that results from the set or get operation.

For example:

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()

sm.addMiddleware("get", JSON.stringify)
sm.addMiddleware("set", value => value + 1)
sm.setState("number", 1)
sm.getState("number") // -> "2"
```

### Debugging

For debugging purposes the state manager can log all operations as well as the trace from where they were triggered. To toggle this on and off, use setDebug(true) and setDebug(false).

```javascript
import { getStateManager } from "kiwicomponents"
const sm = getStateManager()
sm.setDebug(true)
sm.setState("fruit", "apple")
```
