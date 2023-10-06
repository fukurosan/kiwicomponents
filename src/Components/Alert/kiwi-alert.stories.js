import { Components } from "../../index"
Components.Alert()

/**
 * A configurable alert element
 */
export default {
	title: "Components/kiwi-alert",
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
		useclosebutton: {
			control: { type: "boolean" },
			description: "If set a close button will be rendered on the alert",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "error", "warning"],
			description: "Determines the look and feel.",
			table: { type: { summary: "" }, defaultValue: { summary: "primary" } }
		},
		"@slot - default": {
			description: "Holds the content of the element"
		},
		onClose: { action: "onClose", description: "Fired when the element is closed by the user" },
		...[
			"--kiwi-alert-border-color",
			"--kiwi-alert-background-color",
			"--kiwi-alert-header-color",
			"--kiwi-alert-body-color",
			"--kiwi-alert-stroke-color",
			"--kiwi-alert-stroke-hover",
			"--kiwi-alert-padding",
			"--kiwi-alert-border-radius",
			"--kiwi-alert-border",
			"--kiwi-alert-icon-size",
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
	const { content, useclosebutton, type, onClose } = props
	const element = document.createElement("kiwi-alert")
	element.innerHTML = content
		? content
		: `
	<div class='h1' style='font-weight:bold;margin-bottom:1rem;'>
		Alert!
	</div>
	<div>
		This is an important message!
	</div>
`
	useclosebutton && element.setAttribute("useclosebutton", "true")
	type && element.setAttribute("type", type)
	element.addEventListener("close", onClose)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return element
}
