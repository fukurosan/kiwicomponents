import { Components } from "../../index"
Components.Navbar()

/**
 * A flex layout item that can be used in tandem with the navbar.
 */
export default {
	title: "Components/navbar/kiwi-navbar-item",
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
		justify: {
			control: { type: "select" },
			options: ["left", "center", "right"],
			description: "Is this a dropdown menu or a contextmenu",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		}
	},
	"@slot - default": {
		description: "The default slot holds all content"
	},
	...["--kiwi-navbar-item-flex"].reduce((acc, attr) => {
		acc[attr] = {
			control: "text",
			description: "",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		}
		return acc
	}, {})
}

export const Playground = {
	parameters: {
		docs: {
			story: { inline: true }
		}
	}
}

const createComponent = props => {
	const { content, justify } = props

	const container = document.createElement("div")
	container.setAttribute("style", "width:500px;height:100px;display:flex;background-color:coral;")

	const element = document.createElement("kiwi-navbar-item")
	element.innerHTML = content ? content : "Inside the element!"
	justify && element.setAttribute("justify", justify)
	container.appendChild(element)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
