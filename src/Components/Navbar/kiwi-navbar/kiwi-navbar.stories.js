import { Components } from "../../index"
Components.Navbar()

/**
 * A Kiwi style navbar with built in responsivity.
 */
export default {
	title: "Components/navbar/kiwi-navbar",
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
		mode: {
			control: { type: "select" },
			options: ["sticky", "relative"],
			description:
				"Determines the display mode of the navbar, 'sticky' means it sticks to the top even when scrolling, 'relative' means it stays at the top",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		"responsive-breakpoint": {
			control: "text",
			description:
				"A comma separated list of numbers representing viewport width in pixels where the navbar will switch between breakpoints. For each index of breakpoints a slot name will be created to allow for inserting information into that slot",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		}
	},
	"@slot - default": {
		description: "Default slot is always visible (prefixed)"
	},
	"@slot - {index}": {
		description: "Responsive slots"
	},
	...[
		"--kiwi-navbar-height",
		"--kiwi-navbar-margin",
		"--kiwi-navbar-background",
		"--kiwi-navbar-border",
		"--kiwi-navbar-outline",
		"--kiwi-navbar-shadow",
		"--kiwi-navbar-border-radius",
		"--kiwi-navbar-padding"
	].reduce((acc, attr) => {
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
	const { content, mode } = props
	const container = document.createElement("div")
	container.setAttribute("style", "min-height: 1700px;")

	const element = document.createElement("kiwi-navbar")
	mode && element.setAttribute("mode", mode)
	element.setAttribute("responsive-breakpoint", props["responsive-breakpoint"] ? props["responsive-breakpoint"] : "768")
	element.innerHTML = content
		? content
		: `
	<div slot="0">Visible on Mobile</div>
	<div slot="1">Visible on Desktop</div>
`
	element.setAttribute("style", "color:white;")
	container.appendChild(element)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
