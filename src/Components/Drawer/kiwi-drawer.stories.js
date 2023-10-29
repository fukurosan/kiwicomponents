import { Components } from "../../index"
Components.Drawer()

/**
 * A configurable drawer element
 */
export default {
	title: "Internal Components/kiwi-drawer",
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
		usebackdrop: {
			control: { type: "boolean" },
			description: "If set to any value adds a clickable backdrop",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		nocloseicon: {
			control: { type: "boolean" },
			description: "If set to any value the close button will be disabled",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		direction: {
			control: { type: "select" },
			options: ["left", "right"],
			description: "The direction from which the drawer opens.",
			table: { type: { summary: "" }, defaultValue: { summary: "right" } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "error", "warning"],
			description: "Determines the look and feel of the header",
			table: { type: { summary: "" }, defaultValue: { summary: "neutral" } }
		},
		onOpen: { action: "onOpen", description: "Event that fires when the drawer opens and closes" },
		...[
			"--kiwi-drawer-width",
			"--kiwi-drawer-header-padding",
			"--kiwi-drawer-body-padding",
			"--kiwi-drawer-background",
			"--kiwi-window-backdrop-blur",
			"--kiwi-drawer-button-size"
		].reduce((acc, attr) => {
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
	const { content, title, subtitle, usebackdrop, nocloseicon, direction, type, open = true, onOpen } = props

	const element = document.createElement("kiwi-drawer")
	title && element.setAttribute("title", title)
	subtitle && element.setAttribute("subtitle", subtitle)
	usebackdrop && element.setAttribute("usebackdrop", usebackdrop)
	nocloseicon && element.setAttribute("nocloseicon", nocloseicon)
	direction && element.setAttribute("direction", direction)
	type && element.setAttribute("type", type)
	open && element.setAttribute("open", open)
	element.innerHTML = content ? content : "This is content inside of the drawer!"
	element.addEventListener("open", onOpen)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return element
}
