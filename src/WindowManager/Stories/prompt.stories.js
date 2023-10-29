import { prompt } from "../index"

/**
 * Utility function for Prompting users for a value or for input of a form
 */
export default {
	title: "Utility/Dialog Manager/prompt()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		message: {
			control: "text",
			description: "Message for the prompt",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		formOrInputAttributes: {
			control: "text",
			description: "Attributes to be applied on the input field element, or a form as an HTML element or a string",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		confirmLabel: {
			control: "text",
			description: "Button text for the OK button",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		cancelLabel: {
			control: "text",
			description: "Button text for the cancel button",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		}
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
	const container = document.createElement("div")
	container.setAttribute("style", "display:flex;flex-direction:column;gap:1rem;")

	async function promptUser() {
		const input = await prompt({ message: "Please fill in something here, thanks.", formOrInputAttributes: { required: "true" }, ...props })
		resultContainer.innerHTML = JSON.stringify(input)
	}

	async function promptUserForm() {
		const formString = `
        <form style="display:flex;flex-direction:column;gap:0.5rem;">
          <input placeholder="First Name" name="firstName">
          <input placeholder="Last Name" name="lastName" value="Smith">
          <input placeholder="Last Name 2" name="lastName" required>
        </form>
        `
		const form = new DOMParser().parseFromString(formString, "text/html").body.children[0]
		const input = await prompt({ message: "Important form", formOrInputAttributes: form, ...props })
		resultContainer.innerHTML = JSON.stringify(input)
	}

	const defaultButton = document.createElement("button")
	defaultButton.innerHTML = "prompt() - default"
	defaultButton.addEventListener("click", promptUser)

	const formButton = document.createElement("button")
	formButton.innerHTML = "prompt() - form input"
	formButton.addEventListener("click", promptUserForm)

	const resultContainer = document.createElement("div")
	resultContainer.setAttribute("id", "result-container")

	container.appendChild(defaultButton)
	container.appendChild(formButton)
	container.appendChild(resultContainer)

	return container
}
