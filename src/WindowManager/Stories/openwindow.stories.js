import { openWindow } from "../index"

/**
 * Utility function for Prompting users for a value or for input of a form
 */
export default {
	title: "Utility/Dialog Manager/openWindow()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		title: {
			control: "text",
			description: "Header text",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		icon: {
			control: "text",
			description: "Header icon",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		body: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		footer: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		header: {
			control: "text",
			description: "Custom header HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		modality: {
			control: { type: "select" },
			options: ["none", "clickable", "disabled"],
			description: "configures the backdrop of the window",
			table: { type: { summary: "" }, defaultValue: { summary: "solid" } }
		},
		mode: {
			control: { type: "select" },
			options: ["interactive", "auto", "scrollable"],
			description: "Determines the general dimensions and layout of the window.",
			table: { type: { summary: "" }, defaultValue: { summary: "interactive" } }
		},
		variant: {
			control: { type: "select" },
			options: ["default", "info"],
			description: "Determines the general dimensions and layout of the window.",
			table: { type: { summary: "" }, defaultValue: { summary: "default" } }
		},
		minWidth: {
			control: "text",
			description: "Sets the minimum width of the dialog",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		maxWidth: {
			control: "text",
			description: "Sets the maximum width of the dialog",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		minimizable: {
			control: "boolean",
			description: "If true the minimize button will be added to the header",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		maximizable: {
			control: "boolean",
			description: "If true the maximize button will be added to the header and double clicking the header will maximize the window",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		closeButton: {
			control: "boolean",
			description: "If true the close button will be added to the header",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		draggable: {
			control: "boolean",
			description: "If true the window will be dragable",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		resizable: {
			control: "boolean",
			description: "If true the window will be resizable",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
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
	async function open() {
		openWindow({
			...props
		})
	}

	const defaultButton = document.createElement("button")
	defaultButton.innerHTML = "openWindow()"
	defaultButton.addEventListener("click", open)

	return defaultButton
}
