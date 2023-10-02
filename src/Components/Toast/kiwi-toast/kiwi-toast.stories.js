import { Components } from "../../index"
Components.Toast()

/**
 * Kiwi toast notifications. Can be used to display both toasts as well as snackbars.
 */

export default {
	title: "Internal Components/toast/kiwi-toast",
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
		noanimation: {
			control: { type: "boolean" },
			description: "If set the toast will not animate",
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
	const { content, title, subtitle, icon, timeout, type, closemode, noanimation } = props

	const element = document.createElement("kiwi-toast")
	content && (element.innerHTML = content)
	title && element.setAttribute("title", title)
	subtitle && element.setAttribute("subtitle", subtitle)
	icon && element.setAttribute("icon", icon)
	timeout && element.setAttribute("top", top)
	type && element.setAttribute("type", type)
	closemode && element.setAttribute("closemode", closemode)
	noanimation && element.setAttribute("noanimation", noanimation)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return element
}
