import { showToast } from "../index"

/**
 * Shows a toast
 */
export default {
	title: "Utility/Notifications Manager/showToast()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		html: {
			control: "text",
			description: "Optional rich, custom content for the toast. Usually used instead of title/body",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		title: {
			control: { type: "text" },
			description: "Toast title (optional)",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		subtitle: {
			control: { type: "text" },
			description: "Toast subtitle (optional)",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		icon: {
			control: { type: "text" },
			description: "Toast icon (optional)",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		timeout: {
			control: { type: "number" },
			description: "How many milliseconds before the toast should remove itself",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "error", "warning"],
			description: "A type can be configured to change the colors of the toast",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		closemode: {
			control: { type: "select" },
			options: ["icon", "click", "none"],
			description: "Configures how a user can interact to close the toast. Icon = X button, click = click anywhere, none = not closable",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		top: {
			control: { type: "boolean" },
			description: "Should the toast be placed towards the top of the screen?",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		right: {
			control: { type: "boolean" },
			description: "Should the toast be placed towards the right of the screen?",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		bottom: {
			control: { type: "boolean" },
			description: "Should the toast be placed towards the bottom of the screen?",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		left: {
			control: { type: "boolean" },
			description: "Should the toast be placed towards the left of the screen?",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
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
	const open = () => {
		showToast(props)
	}

	const button = document.createElement("button")
	button.innerHTML = "showToast()"
	button.addEventListener("click", open)

	return button
}
