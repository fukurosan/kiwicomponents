import { Components } from "../../index"
Components.Toast()

/**
 * Used as a container for toasts to position them correctly in the viewport. The container will adjust css-parameters that are consumed by the toasts and change animation behaviour based on position.
 */
export default {
	title: "Internal Components/toast/kiwi-toast-container",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		top: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the top axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		right: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the right axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		bottom: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the bottom axis",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		left: {
			control: { type: "boolean" },
			description: "Should the toast be positioned along the left axis",
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

const createComponent = ({ top, right, bottom, left }) => {
	const element = document.createElement("kiwi-toast-container")
	top && element.setAttribute("top", top)
	right && element.setAttribute("right", right)
	bottom && element.setAttribute("bottom", bottom)
	left && element.setAttribute("left", left)
	element.innerHTML = "Hello World!"

	return element
}
