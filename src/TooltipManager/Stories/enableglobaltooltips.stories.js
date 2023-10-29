import { enableGlobalTooltips } from "../index"

/**
 * Shows tooltips globally
 */
export default {
	title: "Utility/Tooltip Manager/enableGlobalTooltips()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		"kiwi-tooltip": {
			control: "text",
			description: "The main content of the tooltip",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		"kiwi-tooltip-position": {
			control: { type: "select" },
			options: ["top", "right", "bottom", "left", "mouse", "follow"],
			description: "Determines how the tooltip should be positioned relative to the target element",
			table: { type: { summary: "" }, defaultValue: { summary: "mouse" } }
		},
		"kiwi-tooltip-delay": {
			control: "number",
			description: "Delay in ms before the tooltip should be displayed",
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
	enableGlobalTooltips()

	const square = document.createElement("div")
	square.style.width = "200px"
	square.style.height = "200px"
	square.style.backgroundColor = "coral"

	Object.keys(props).forEach(key => {
		props[key] && square.setAttribute(key, props[key])
	})

	return square
}
