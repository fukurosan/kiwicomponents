import style from "../../Stylesheets/External/meter.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * meter styles
 */
export default {
	title: "CSS/Meter",
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
	<h3>Meter</h3>
    <meter value="30" min="0" max="100" title="GB"></meter>
    <meter value="10" min="0" max="100" low="20" optimum="50" high="80"></meter>
    <meter value="40" min="0" max="100" low="20" optimum="50" high="80"></meter>
    <meter value="50" min="0" max="100" low="20" optimum="50" high="80"></meter>
    <meter value="60" min="0" max="100" low="20" optimum="50" high="80"></meter>
    <meter value="90" min="0" max="100" low="50" optimum="20" high="80"></meter>
	</div>`

	return createIsolatedStyles(code, style, props)
}
