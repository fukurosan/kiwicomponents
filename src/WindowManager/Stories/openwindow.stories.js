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
		scale: {
			control: { type: "select" },
			options: ["none", "compact", "small", "medium", "large"],
			description: "Determines the general dimensions of the window's sections",
			table: { type: { summary: "" }, defaultValue: { summary: "solid" } }
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
		},
		centered: {
			control: "boolean",
			description: "If true the window will be centered in the viewport. If set to scroll the page will scroll instead of the body",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		autosize: {
			control: "boolean",
			description: "If true the window will automatically adjust its size to its content and the viewport",
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
