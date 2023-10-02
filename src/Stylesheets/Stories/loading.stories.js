import style from "../../Stylesheets/External/loading.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Loading styles
 */
export default {
	title: "CSS/Loading",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
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
		<button aria-busy="true">aria-busy = true</button>
		<button aria-disabled="true">aria-disabled = true</button>
		<button aria-busy="true" aria-disabled="true">aria-busy = true and aria-disabled = true </button>
		<div style="height:100px;background-color:coral;" aria-busy="true" aria-disabled="true">aria-busy = true and aria-disabled = true </div>
	</div>`

	return createIsolatedStyles(code, style, props)
}
