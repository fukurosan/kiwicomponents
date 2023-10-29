import style from "../../Stylesheets/External/divider.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Divider styles
 */
export default {
	title: "CSS/Divider",
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

		<div class="divider">A Divider</div>
		<div class="divider horizontal" style="height:10rem;">Horizontal</div>

	</div>`

	return createIsolatedStyles(code, style, props)
}
