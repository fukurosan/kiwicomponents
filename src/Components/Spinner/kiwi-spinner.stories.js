import { Components } from "../../index"
Components.Spinner()

/**
 * A configurable spinner element to illustrate a loading state
 */
export default {
	title: "Components/kiwi-spinner",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		size: {
			control: "text",
			description: "Size of the spinner in a CSS compatible format. By default the spinner takes up all space it gets",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		percent: {
			control: { type: "number" },
			description: "Percentage (0-100) loaded. If not set the spinner will go into dynamic mode",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		usebackground: {
			control: { type: "boolean" },
			description: "If set a background will be displayed behind the spinner wheel.",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
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

const createComponent = ({ size, percent, usebackground }) => {
	const container = document.createElement("div")
	container.setAttribute("style", "width:50px;height:50px;")
	const element = document.createElement("kiwi-spinner")
	container.appendChild(element)
	size && element.setAttribute("size", size)
	percent && element.setAttribute("percent", percent)
	usebackground && element.setAttribute("usebackground", usebackground)
	return container
}
