import style from "../../Stylesheets/External/scrollbar.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * scrollbar styles
 */
export default {
	title: "CSS/Scrollbars",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...[
			"--kiwi-scrollbar-width",
			"--kiwi-scrollbar-thumb-color",
			"--kiwi-scrollbar-track-color",
			"--kiwi-scrollbar-width-webkit",
			"--kiwi-scrollbar-thumb-radius",
			"--kiwi-scrollbar-thumb-boxshadow",
			"--kiwi-scrollbar-thumb-border",
			"--kiwi-scrollbar-track-backgroundsize",
			"--kiwi-scrollbar-thumb-radius-hover",
			"--kiwi-scrollbar-thumb-boxshadow-hover",
			"--kiwi-scrollbar-thumb-border-hover",
			"--kiwi-scrollbar-track-backgroundsize-hover",
			"--kiwi-scrollbar-thumb-radius-active",
			"--kiwi-scrollbar-thumb-boxshadow-active",
			"--kiwi-scrollbar-thumb-border-active",
			"--kiwi-scrollbar-track-backgroundsize-active"
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
	const code = `
	<div style="display:flex;flex-direction:column;gap:2rem;">
	<h3>Scrollbars</h3>
	<div style="width:200px;height:200px;overflow:auto;" class="box">
	    <div style="width:400px;height:400px;"></div>
  	</div>
	</div>`

	return createIsolatedStyles(code, style, props)
}
