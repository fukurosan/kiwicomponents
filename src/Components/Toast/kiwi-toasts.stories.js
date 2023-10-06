import { Components } from "../../index"
Components.Toast()

/**
 * Kiwi toasts are created by combining a kiwi-toast-container element and kiwi-toast elements
 */
export default {
	title: "Internal Components/toast",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		content: {
			control: "text",
			description: "HTML content",
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
			description: "How long before toast toast should remove itself",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "error", "warning"],
			description: "Defines what color the toast should be based on",
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
			description: "Should the toast be positioned along the top axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		right: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the right axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		bottom: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the bottom axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		left: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the left axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		"@slot - default": {
			description: "Optional rich toast content"
		},
		"@function close()": {
			description: "Animates the toast and then removes it"
		},
		...["--kiwi-toast-background", "--kiwi-toast-width"].reduce((acc, attr) => {
			acc[attr] = {
				control: "text",
				description: "",
				table: { type: { summary: "" }, defaultValue: { summary: "" } }
			}
			return acc
		}, {})
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
	const { content, title, subtitle, icon, timeout, type, closemode, top, right, bottom, left } = props

	const container = document.createElement("kiwi-toast-container")
	top && container.setAttribute("top", top)
	right && container.setAttribute("right", right)
	bottom && container.setAttribute("bottom", bottom)
	left && container.setAttribute("left", left)

	for (let i = 0; i < 3; i++) {
		const toast = document.createElement("kiwi-toast")
		content && (toast.innerHTML = content)
		title && toast.setAttribute("title", title)
		subtitle && toast.setAttribute("subtitle", subtitle)
		icon && toast.setAttribute("icon", icon)
		timeout && toast.setAttribute("top", top)
		type && toast.setAttribute("type", type)
		closemode && toast.setAttribute("closemode", closemode)
		container.appendChild(toast)
	}

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
