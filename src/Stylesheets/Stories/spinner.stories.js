import style from "../../Stylesheets/External/spinners.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Spinners styles
 */
export default {
	title: "CSS/Spinners",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {}
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
	<div style="display:flex;flex-direction:column;gap:0.5rem;">

	<h3>.spinner-base</h3>
	<div style="--size:2rem;" class="spinner-base"></div>
	<h3>.spinner-rythm</h3>
	<div style="--size:2rem;" class="spinner-rythm"></div>
	<h3>.spinner-spinning</h3>
	<div style="width:50px;height:50px;" class="spinner-spinning"></div>
	<h3>.spinner-rotate</h3>
	<div style="--size:2rem;" class="spinner-rotate"></div>
	<h3>.spinner-dots</h3>
	<div style="--size:2rem;" class="spinner-dots"></div>
	<h3>.spinner-shape</h3>
	<div style="width:50px;height:50px;" class="spinner-shape"></div>
	<h3>.spinner-flip</h3>
	<div style="width:50px;height:50px;" class="spinner-flip"></div>

	</div>
`

	return createIsolatedStyles(code, style, props)
}
