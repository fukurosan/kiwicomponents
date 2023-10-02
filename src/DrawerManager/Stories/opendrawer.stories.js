import { openDrawer } from "../index"

/**
 * Opens a drawer
 */
export default {
	title: "Utility/Drawer Manager/openDrawer()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		body: {
			control: "text",
			description: "The main content of the drawer",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		open: {
			control: { type: "boolean" },
			description: "If set the drawer menu will open.",
			table: { type: { summary: "" }, defaultValue: { summary: true } }
		},
		title: {
			control: { type: "text" },
			description: "Drawer title (optional)",
			table: { type: { summary: "" }, defaultValue: { summary: undefined } }
		},
		subtitle: {
			control: { type: "text" },
			description: "Drawer subtitle (optional)",
			table: { type: { summary: "" }, defaultValue: { summary: undefined } }
		},
		backdrop: {
			control: { type: "boolean" },
			description: "If set to true the backdrop will be visible",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		closeIcon: {
			control: { type: "boolean" },
			description: "If set to true a close icon will be added in the top corner closest to the viewport",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		direction: {
			control: { type: "select" },
			options: ["left", "right"],
			description: "Determines if the drawer opens from the left or right of the screen",
			table: { type: { summary: "" }, defaultValue: { summary: "right" } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "error", "warning"],
			description: "A type can be configured to change the colors of the drawer header",
			table: { type: { summary: "" }, defaultValue: { summary: "neutral" } }
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
		openDrawer(props)
	}

	const button = document.createElement("button")
	button.innerHTML = "openDrawer()"
	button.addEventListener("click", open)

	return button
}
