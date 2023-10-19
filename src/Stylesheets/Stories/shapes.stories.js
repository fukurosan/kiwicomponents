import style from "../../Stylesheets/External/shape.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Shapes styles
 */
export default {
	title: "CSS/Shapes",
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
	<style>
		.card {
			width: 100px;
			height: 100px;
			background-color: gray;
		}
	</style>
	<div style="display:flex;flex-direction:column;gap:0.5rem;">

	<h3>.shape-round</h3>
	<div class="card shape-round"></div>
	<h3>.shape-triangle</h3>
	<div class="card shape-triangle"></div>
	<h3>.shape-x</h3>
	<div class="card shape-x"></div>
	<h3>.shape-message</h3>
	<div class="card shape-message"></div>
	<h3>.shape-star</h3>
	<div class="card shape-star"></div>
	<h3>.shape-chevron</h3>
	<div class="card shape-chevron-left"></div>
	<h3>.shape-chevron</h3>
	<div class="card shape-chevron-right"></div>
	<h3>.shape-rabbet</h3>
	<div class="card shape-rabbet"></div>
	<h3>.shape-bevel</h3>
	<div class="card shape-bevel"></div>
	<h3>.shape-octagon</h3>
	<div class="card shape-octagon"></div>
	<h3>.shape-hexagon</h3>
	<div class="card shape-hexagon"></div>
	<h3>.shape-pentagon</h3>
	<div class="card shape-pentagon"></div>
	<h3>.shape-rhombus</h3>
	<div class="card shape-rhombus"></div>
	<h3>.shape-parallelogram</h3>
	<div class="card shape-parallelogram"></div>
	<h3>.shape-trapezoid</h3>
	<div class="card shape-trapezoid"></div>
	<h3>.shape-nonagon</h3>
	<div class="card shape-nonagon"></div>
  
	</div>
`

	return createIsolatedStyles(code, style, props)
}
