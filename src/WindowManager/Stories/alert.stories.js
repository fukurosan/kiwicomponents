import { alert } from "../index"

/**
 * Opens an alert modal to the user that must be actively dismissed
 */
export default {
	title: "Utility/Dialog Manager/alert()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		title: {
			control: "text",
			description: "Title for the alert dialog",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		message: {
			control: "text",
			description: "Message body for the alert dialog",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		buttonText: {
			control: "text",
			description: "Button text for the OK button",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		icon: {
			control: "text",
			description: "Optional custom icon for the alert",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		type: {
			control: { type: "select" },
			options: ["success", "question", "warning", "error"],
			description: "Defines the styling and default icon of the alert",
			table: { type: { summary: "" }, defaultValue: { summary: "warning" } }
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
	const showAlert = () => {
		const alertDialog = alert(props)
		alertDialog.closeButtonListener.then(() => {
			button.innerHTML = "Dialog was closed"
		})
	}

	const button = document.createElement("button")
	button.innerHTML = "alert()"
	button.addEventListener("click", showAlert)

	return button
}
