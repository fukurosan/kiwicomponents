import { Components } from "../../index"
Components.Menu()

/**
 * Kiwi Menu
 * A menu component that can be used to create dropdown menus, context menus or similar components.
 * The menu opens beneath/on the target when it is clicked with the configured mouse button.
 * The menu will attempt to initialize itself by finding a taget using
 * 1. a provided target attribute,
 * 2. element provided in the target slot,
 * 3. parent element.
 */
export default {
	title: "Components/menu/kiwi-menu",
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
		noanimation: {
			control: { type: "boolean" },
			description: "If set the toast will not animate",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		"@slot - default": {
			description: "Menu body"
		},
		"@slot - target": {
			description: "Menu will be displayed for component in this slot"
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
	const { content, top, left, mode, justify, target, noanimation } = props

	const container = document.createElement("div")
	container.setAttribute(
		"style",
		"height:100px;width:100px;background-color:coral;display:flex;align-items:center;justify-content:center;position:fixed;inset:0;margin:auto;"
	)
	container.innerHTML = `
		Click me!
	`
	const element = document.createElement("kiwi-menu")
	element.innerHTML = content ? content : "This is inside the menu"
	top && element.setAttribute("top", top)
	left && element.setAttribute("left", left)
	mode && element.setAttribute("mode", mode)
	justify && element.setAttribute("justify", justify)
	target && element.setAttribute("target", target)
	noanimation && element.setAttribute("noanimation", noanimation)

	container.appendChild(element)

	return container
}
