import { Components } from "../../index"
Components.Button()

/**
 * Configurable button element
 */
export default {
	title: "Components/kiwi-button",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		label: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "error", "warning"],
			description: "Determines the look and feel",
			table: { type: { summary: "" }, defaultValue: { summary: "primary" } }
		},
		fill: {
			control: { type: "select" },
			options: ["solid", "light", "outline", "none"],
			description: "Determines The contrast balance in the button and the hover/active/focus look and feel.",
			table: { type: { summary: "" }, defaultValue: { summary: "solid" } }
		},
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description: "Determines the size of the button.",
			table: { type: { summary: "" }, defaultValue: { summary: "medium" } }
		},
		disabled: {
			control: "boolean",
			description: "If set the button will not fire click events, and will get styled as being disabled.",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		icon: {
			control: "text",
			description: "Optional icon URL.",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		iconPlacement: {
			control: { type: "select" },
			options: ["before", "after"],
			description: "Icon position.",
			table: { type: { summary: "" }, defaultValue: { summary: "before" } }
		},
		direction: {
			control: { type: "select" },
			options: ["column", "row"],
			description: "Determines the direction of the icon and button text (row or column).",
			table: { type: { summary: "" }, defaultValue: { summary: "row" } }
		},
		useanimation: {
			control: "boolean",
			description: "If set an animation will be applied to the button on hover.",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		kiwistyle: {
			control: "text",
			description: "Custom inline styles to be applied to the internal button element.",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		"@slot - default": {
			description: "Holds the content of the element"
		},
		"@function - click()": {
			description: "Clicks the internal button"
		},
		onClick: { action: "onClick", description: "Fired when the button is clicked" }
	}
}

export const Playground = {
	parameters: {
		docs: {
			story: { inline: true }
		}
	}
}

const createComponent = ({ label = "Click me!", disabled, kiwistyle, icon, useanimation, iconPlacement, type, size, direction, fill, onClick }) => {
	const element = document.createElement("kiwi-button")
	element.innerHTML = label

	//Attributes
	disabled && element.setAttribute("disabled", "true")
	kiwistyle && element.setAttribute("kiwistyle", kiwistyle)
	icon && element.setAttribute("icon", icon)
	useanimation && element.setAttribute("useanimation", useanimation)
	iconPlacement && element.setAttribute("icon-placement", iconPlacement)
	type && element.setAttribute("type", type)
	size && element.setAttribute("size", size)
	direction && element.setAttribute("direction", direction)
	fill && element.setAttribute("fill", fill)

	//Events
	onClick && element.addEventListener("click", onClick)

	return element
}
