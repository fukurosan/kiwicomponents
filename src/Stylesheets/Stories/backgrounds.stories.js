import style from "../../Stylesheets/External/backgrounds.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Background styles
 */
export default {
	title: "CSS/Backgrounds",
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

	<h3>.bg-diagonal-stripes</h3>
	<div style="width: 100%;height:400px;" class="bg-diagonal-stripes"></div>

	<h3>.bg-vertical-stripes</h3>
	<div style="width: 100%;height:400px;" class="bg-vertical-stripes"></div>

	<h3>.bg-horizontal-stripes</h3>
	<div style="width: 100%;height:400px;" class="bg-horizontal-stripes"></div>

	<h3>.bg-radial-stripes</h3>
	<div style="width: 100%;height:400px;" class="bg-radial-stripes"></div>

	<h3>.bg-grid</h3>
	<div style="width: 100%;height:400px;" class="bg-grid"></div>

	<h3>.bg-dots</h3>
	<div style="width: 100%;height:400px;" class="bg-dots"></div>

	<h3>.bg-cross-dots</h3>
	<div style="width: 100%;height:400px;" class="bg-cross-dots"></div>

	<h3>.bg-honeycomb</h3>
	<div style="width: 100%;height:400px;" class="bg-honeycomb"></div>

	<h3>.bg-checker</h3>
	<div style="width: 100%;height:400px;" class="bg-checker"></div>

	<h3>.bg-diamonds</h3>
	<div style="width: 100%;height:400px;" class="bg-diamonds"></div>

	<h3>.bg-cubes</h3>
	<div style="width: 100%;height:400px;" class="bg-cubes"></div>

	</div>
`

	return createIsolatedStyles(code, style, props)
}
