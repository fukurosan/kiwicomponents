import { Components } from "../../index"
Components.Drawer()
Components.Burger()

/**
 * A burger menu element that when clicked opens up a drawer area.
 */
export default {
	title: "Components/kiwi-burger",
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
		open: {
			control: { type: "boolean" },
			description: "If set the drawer menu will open",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		"@slot - default": {
			description: "Holds the content of the element"
		},
		...["--kiwi-burger-menu-button-size", "--kiwi-burger-menu-button-padding", "--kiwi-burger-menu-color", "--kiwi-burger-menu-animation-duration"].reduce(
			(acc, attr) => {
				acc[attr] = {
					control: "text",
					description: "",
					table: { type: { summary: "" }, defaultValue: { summary: "" } }
				}
				return acc
			},
			{}
		)
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
	const { content, open } = props

	const element = document.createElement("kiwi-burger")
	element.innerHTML = content
		? content
		: `
	<div>
		This is inside of the drawer!
	</div>
`
	open && element.setAttribute("open", open)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return element
}
