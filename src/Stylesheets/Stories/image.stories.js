import style from "../../Stylesheets/External/image.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Image styles
 */
export default {
	title: "CSS/Image",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		src: {
			control: "text",
			description: "",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
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

const createComponent = props => {
	const code = `<img src="${
		props.src ? props.src : "https://upload.wikimedia.org/wikipedia/commons/7/74/White_domesticated_duck,_stretching.jpg"
	}" style="height:200px;width:auto;">`

	return createIsolatedStyles(code, style, props)
}
