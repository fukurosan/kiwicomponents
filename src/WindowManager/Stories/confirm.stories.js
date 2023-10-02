import { confirm } from "../index"

/**
 * Opens a confirmation window
 */
export default {
	title: "Utility/Dialog Manager/confirm()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		title: {
			control: "text",
			description: "Title for the dialog",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		message: {
			control: "text",
			description: "Message body for the dialog",
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
	const show = () => {
		confirm(props).then(response => {
			button.innerHTML = `User response was: ${response}`
		})
	}

	const button = document.createElement("button")
	button.innerHTML = "confirm()"
	button.addEventListener("click", show)

	return button
}
