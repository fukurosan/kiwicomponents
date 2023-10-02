import { getStateManager } from "../api"

/**
 * State Manager
 */
export default {
	title: "State Manager/State Manager",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	}
}

export const Playground = {
	parameters: {
		docs: {
			story: { inline: true }
		}
	}
}

const createComponent = props => {
	const options = [
		{
			key: "Fruits",
			value: ["Apple", "Orange", "Banana"]
		},
		{
			key: "Vegetables",
			value: ["Paprika", "Cucumber", "Tomato"]
		},
		{
			key: "Berries",
			value: ["Strawberry", "Raspberry", "Blackberry"]
		}
	]

	const stateManager = getStateManager()

	const container = document.createElement("div")
	container.setAttribute("style", "display:flex;flex-direction:column;gap:1rem;")

	const createButton = (fn, label) => {
		const button = document.createElement("button")
		button.appendChild(document.createTextNode(label))
		button.addEventListener("click", fn)
		return button
	}

	const addState = () => {
		const index = stateManager.listAllKeys().length
		if (index < options.length) {
			stateManager.setState(options[index].key, options[index].value)
		}
	}
	container.appendChild(createButton(addState, "Add State"))

	const clearState = () => {
		const index = stateManager.listAllKeys().length
		if (index) {
			stateManager.clearState(options[index < options.length ? index - 1 : options.length - 1].key)
		}
	}
	container.appendChild(createButton(clearState, "Clear State"))

	const clearAllState = () => {
		stateManager.clearAllState()
	}
	container.appendChild(createButton(clearAllState, "Clear All State"))

	setInterval(() => {
		container.querySelector("#state-meta").innerHTML = `
          <div>Keys: ${stateManager.listAllKeys()}</div>
          <div>State: ${JSON.stringify(stateManager.listAllState())}</div>
		  `
	}, 100)

	const metaContainer = document.createElement("div")
	metaContainer.setAttribute("id", "state-meta")
	container.appendChild(metaContainer)

	return container
}
