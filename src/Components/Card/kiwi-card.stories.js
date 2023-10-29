import { Components } from "../../index"
Components.Card()

/**
 * Configurable card element
 */
export default {
	title: "Components/kiwi-card",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		title: {
			control: "text",
			description: "Card title",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		text: {
			control: "text",
			description: "Body text",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		icon: {
			control: "text",
			description: "Optional image URL, or 0-2 letters for a placeholder",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		direction: {
			control: { type: "select" },
			options: ["horizontal", "vertical"],
			description: "Should the card be vertical or horizontal?",
			table: { type: { summary: "" }, defaultValue: { summary: "horizontal" } }
		},
		slotted: {
			control: "text",
			description: "Slotted HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		"@slot - default": {
			description: "Holds any custom content of the element"
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

const createComponent = ({ title = "Title", text = "Text Content", icon = "KC", direction = "horizontal", slotted }) => {
	const element = document.createElement("kiwi-card")

	title && element.setAttribute("title", title)
	text && element.setAttribute("text", text)
	icon && element.setAttribute("icon", icon)
	direction && element.setAttribute("direction", direction)
	slotted && (element.innerHTML = slotted)

	return element
}
