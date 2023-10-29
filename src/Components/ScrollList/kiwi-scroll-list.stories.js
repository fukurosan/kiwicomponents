import { Components } from "../../index"
Components.ScrollList()

/**
 * Renders a horizontal list that does scrolls with two arrow buttons when overflowing.
 */
export default {
	title: "Components/kiwi-scroll-list",
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
		"@slot - default": {
			description: "Holds the content of the element"
		}
	},
	...["--kiwi-scroll-list-width", "--kiwi-scroll-list-arrow-color", "--kiwi-scroll-list-icon-size", "--kiwi-scroll-list-gap"].reduce((acc, attr) => {
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
	const { content } = props

	const element = document.createElement("kiwi-scroll-list")
	element.innerHTML = content
		? content
		: `
	<button style="margin:0.5rem 0" class="link">hello world 1</button>
	<button style="margin:0.5rem 0" class="link">hello world 2</button>
	<button style="margin:0.5rem 0">hello world 3</button>
	<button style="margin:0.5rem 0">hello world 4</button>
	<button style="margin:0.5rem 0">hello world 5</button>
	<button style="margin:0.5rem 0">hello world 6</button>
	<button style="margin:0.5rem 0">hello world 7</button>
	<button style="margin:0.5rem 0">hello world 8</button>
	<button style="margin:0.5rem 0">hello world 9</button>
	`

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return element
}
