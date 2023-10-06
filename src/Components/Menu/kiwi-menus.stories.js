import { Components } from "../../index"
Components.Menu()

/**
 * Kiwi Menus combine a kiwi-menu element and kiwi-menu-item elements
 */
export default {
	title: "Components/menu",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		top: {
			control: { type: "number" },
			description: "Adjusts the top offset position of the menu relative to the target",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		left: {
			control: { type: "number" },
			description: "Adjusts the left offset position of the menu relative to the target",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		mode: {
			control: { type: "select" },
			options: ["dropdown", "contextmenu"],
			description: "Is this a dropdown menu or a contextmenu",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		justify: {
			control: { type: "select" },
			options: ["start", "center", "end"],
			description: "If set the target's and menu's right borders will align, otherwise their left. Not applicable for contextmenu mode",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		target: {
			control: { type: "text" },
			description: "Target css selector of element",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		text: {
			control: "text",
			description: "text value for the item",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		icon: {
			control: "text",
			description: "Optional icon. Can be set to a blank value to simply use up the space",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		detail: {
			control: "text",
			description: "Detail value for the item",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		disabled: {
			control: { type: "boolean" },
			description: "If set the row will be disabled",
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
	const { top, left, mode, justify, target, text, icon, detail, disabled } = props

	const container = document.createElement("div")
	container.setAttribute(
		"style",
		"height:100px;width:100px;background-color:coral;display:flex;align-items:center;justify-content:center;position:fixed;inset:0;margin:auto;"
	)
	container.innerHTML = `
		Click me!
	`
	const element = document.createElement("kiwi-menu")
	top && element.setAttribute("top", top)
	left && element.setAttribute("left", left)
	mode && element.setAttribute("mode", mode)
	justify && element.setAttribute("justify", justify)
	target && element.setAttribute("target", target)

	let lastContainer = element
	for (let i = 0; i < 3; i++) {
		const element = document.createElement("kiwi-menu-item")
		text && element.setAttribute("text", text)
		icon && element.setAttribute("icon", icon)
		detail && element.setAttribute("detail", detail)
		disabled && element.setAttribute("disabled", disabled)
		lastContainer.appendChild(document.createTextNode("\n"))
		lastContainer.appendChild(element)
		lastContainer.appendChild(document.createTextNode("\n"))
		lastContainer = element
	}

	container.appendChild(element)

	return container
}
