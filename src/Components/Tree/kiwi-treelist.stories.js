import { Components } from "../../index"
Components.Tree()

/**
 * Renders a tree list. If a list item is placed inside of another list item then this creates a second, nested level.
 */
export default {
	title: "Components/kiwi-treelist-item",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		text: {
			control: "text",
			description: "The text of the tree item",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		icon: {
			control: "text",
			description: "An icon URL. If set to an empty string an empty icon will be added",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		interactive: {
			control: { type: "boolean" },
			description: "If set then exploding/imploding will only occur when clicking the arrow, rather than the whole item",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		selected: {
			control: { type: "boolean" },
			description: "If set the item will be styled as selected",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		open: {
			control: { type: "boolean" },
			description: "If set the item will explode its content",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		"@slot - default": {
			description: "Default slot is used to nest list items hierarchically"
		},
		...[
			"--kiwi-treelist-font-size",
			"--kiwi-treelist-font-weight",
			"--kiwi-treelist-line-color",
			"--kiwi-treelist-animation-duration",
			"--kiwi-treelist-hover-background",
			"--kiwi-treelist-hover-color",
			"--kiwi-treelist-focus-background",
			"--kiwi-treelist-focus-color",
			"--kiwi-treelist-line-color",
			"--kiwi-treelist-expand-arrow-icon-url"
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
	const { text, icon, interactive, selected, open } = props

	const container = document.createElement("div")
	container.setAttribute("style", "border: 1px solid lightgray; padding:1em;")
	container.innerHTML = `
	<kiwi-treelist-item text="With Icon"
	  icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>">
	  <kiwi-treelist-item text="Just text"
		icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>">
		<kiwi-treelist-item text="Only row content"
		  icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>">
		  <kiwi-treelist-item interactive="" text="Another Level!"
			icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>">
		  </kiwi-treelist-item>
		  <kiwi-treelist-item interactive="" text="Another Level!"
			icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>">
		  </kiwi-treelist-item>
		</kiwi-treelist-item>
	  </kiwi-treelist-item>
	  <kiwi-treelist-item text="Just text">
		<kiwi-treelist-item text="With an empty icon" icon="">
		  <kiwi-treelist-item interactive="" text="Another Level!">
		  </kiwi-treelist-item>
		</kiwi-treelist-item>
	  </kiwi-treelist-item>
	</kiwi-treelist-item>`

	Array.from(container.querySelectorAll("kiwi-treelist-item")).forEach(element => {
		selected && element.setAttribute("selected", selected)
		open && element.setAttribute("open", open)
		interactive && element.setAttribute("interactive", interactive)
		typeof icon === "string" && (icon ? element.setAttribute("icon", icon) : element.removeAttribute("icon"))
		text && element.setAttribute("text", text)
	})

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
