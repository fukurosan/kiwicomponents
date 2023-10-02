import { Components } from "../../index"
Components.Menu()

/**
 * A menu item designed specifically for kiwi-menus.
 */
export default {
	title: "Components/menu/kiwi-menu-item",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
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
		},
		noanimation: {
			control: { type: "boolean" },
			description: "If set the element will not be animated",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		"@slot - default": {
			description:
				"Sub menu items. If provided the sub menu will be shown when this item is hovered. A sub menu typically consists of more nested kiwi-menu-items."
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
	const { text, icon, detail, disabled, noanimation } = props

	const container = document.createElement("div")
	container.setAttribute("style", "width:300px;border:1px solid lightgray;")

	let lastContainer = container
	for (let i = 0; i < 3; i++) {
		const element = document.createElement("kiwi-menu-item")
		text && element.setAttribute("text", text)
		icon && element.setAttribute("icon", icon)
		detail && element.setAttribute("detail", detail)
		disabled && element.setAttribute("disabled", disabled)
		noanimation && element.setAttribute("noanimation", noanimation)
		lastContainer.appendChild(document.createTextNode("\n"))
		lastContainer.appendChild(element)
		lastContainer.appendChild(document.createTextNode("\n"))
		lastContainer = element
	}

	return container
}
