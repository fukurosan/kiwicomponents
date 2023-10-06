import { Components } from "../../index"
Components.Accordion()

/**
 * A configurable accordion element.
 */
export default {
	title: "Components/kiwi-accordion",
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
			description: "If set to any value the accordion will open",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		title: {
			control: { type: "text" },
			description: "Title for the accordion button",
			table: { type: { summary: "" }, defaultValue: { summary: "Click me!" } }
		},
		icon: {
			control: { type: "text" },
			description: "Icon URL for the accordion button",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		"@slot - default": {
			description: "Holds the content of the element"
		},
		...[
			"--kiwi-accordion-border",
			"--kiwi-accordion-button-background-color",
			"--kiwi-accordion-button-color",
			"--kiwi-accordion-border",
			"--kiwi-accordion-active-button-background-color",
			"--kiwi-accordion-active-button-color",
			"--kiwi-accordion-panel-background-color",
		].reduce((acc, attr) => {
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
	const { content, title = "Click me!", icon = "" } = props
	const container = document.createElement("div")
	for (let i = 0; i < 3; i++) {
		const element = document.createElement("kiwi-accordion")
		element.innerHTML = content
			? content
			: `
		<div>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ea obcaecati iusto, temporibus sapiente doloremque maiores incidunt magnam libero culpa, nulla eos suscipit, aperiam laborum. Laudantium maxime cupiditate nemo fuga."
		</div>
		`
		element.setAttribute("title", title)
		//open && element.setAttribute("open", open)
		icon && element.setAttribute("icon", icon)
		container.appendChild(element)
	}

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
