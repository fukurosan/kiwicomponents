import { Components } from "../../index"
Components.Rating()

/**
 * Rating element
 */
export default {
	title: "Components/kiwi-rating",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		name: {
			control: "text",
			description: "Configures the name attribute for the internal radio buttons",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		value: {
			control: { type: "select" },
			options: ["0", "1", "2", "3", "4", "5"],
			description: "Sets the selected amount of stars. Setting any other value removes the selection",
			table: { type: { summary: "" }, defaultValue: { summary: "horizontal" } }
		},
		disabled: {
			control: { type: "boolean" },
			description: "If set to any value the rating component will be disabled",
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

const createComponent = ({ name, value, disabled }) => {
	const element = document.createElement("kiwi-rating")

	name && element.setAttribute("name", name)
	value && element.setAttribute("value", value)
	disabled && element.setAttribute("disabled", disabled)

	return element
}
