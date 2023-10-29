import { Components } from "../../index"
Components.MultiToggle()

/**
 * A stateful toggle that can switch between multiple options
 */
export default {
	title: "Components/kiwi-multi-toggle",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		states: {
			control: "text",
			description: "States for the toggle",
			table: { type: { summary: "{ key: string, value: string }[]" }, defaultValue: { summary: "" } }
		},
		selected: {
			control: "text",
			description: "Key of the selected value",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
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

// eslint-disable-next-line quotes
const createComponent = ({ states = '[{"key":"1","value":"Text One"},{"key":"2","value":"Text Two"},{"key":"3","value":"Text Three"}]', selected = "1" }) => {
	const element = document.createElement("kiwi-multi-toggle")
	element.setAttribute("states", states)
	selected && element.setAttribute("selected", selected)
	return element
}
