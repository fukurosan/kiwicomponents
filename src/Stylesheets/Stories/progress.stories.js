import style from "../../Stylesheets/External/progress.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * progress styles
 */
export default {
	title: "CSS/Progress",
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
	<h3>Fixed Progress</h3>
	<progress value="25" max="100"></progress>
	<h3>Indeterminate</h3>
	<progress indeterminate></progress>
	</div>`

	return createIsolatedStyles(code, style, props)
}
