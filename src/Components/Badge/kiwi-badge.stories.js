import { Components } from "../../index"
Components.Badge()

/**
 * A badge component
 */
export default {
	title: "Components/kiwi-badge",
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
		shape: {
			control: { type: "select" },
			options: ["round", "square"],
			description: "Should the badge be round or square?",
			table: { type: { summary: "" }, defaultValue: { summary: "round" } }
		},
		mode: {
			control: { type: "select" },
			options: ["floating", "inline"],
			description: "Should the badge float in the top right corner or be positioned inline?",
			table: { type: { summary: "" }, defaultValue: { summary: "floating" } }
		},
		type: {
			control: { type: "select" },
			options: ["primary", "secondary", "neutral", "info", "success", "warning", "error"],
			description: "To change the background color of the badge element as required",
			table: { type: { summary: "" }, defaultValue: { summary: "primary" } }
		},
		...["--kiwi-offset-top", "--kiwi-offset-right"].reduce((acc, attr) => {
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
	const { content, shape, mode, type } = props

	const container = document.createElement("div")
	container.setAttribute("style", "position:relative;background-color:coral;width:250px;height:250px;margin-inline:auto;margin-top:100px;display:flex;align-items:center;justify-content:center;")
	container.innerHTML = "A box"

	const element = document.createElement("kiwi-badge")
	shape && element.setAttribute("shape", shape)
	mode && element.setAttribute("mode", mode)
	type && element.setAttribute("type", type)
	element.innerHTML = content ? content : "Badge"
	container.appendChild(element)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return container
}
