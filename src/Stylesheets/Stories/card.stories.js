import style from "../../Stylesheets/External/card.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Card styles
 */
export default {
	title: "CSS/Card",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...["--kiwi-card-padding"].reduce((acc, attr) => {
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
	<style>
		.card {
			width: 400px;
		}
	</style>
	<div style="display:flex;flex-direction:column;gap:0.5rem;">

	<h3>Basic card</h3>
	<div class="card">
		<header><img src="https://www.w3schools.com/w3css/img_avatar3.png" /></header>
		<div>This is some content in the card</div>
		<div>This is an additional sentence</div>
		<footer>This is the footer</footer>
	</div>

	<h3>No Header</h3>
	<div class="card">
		<div><img src="https://www.w3schools.com/w3css/img_avatar3.png" /></div>
		<div>This is some content in the card</div>
		<div>This is an additional sentence</div>
		<footer>This is the footer</footer>
	</div>

	<h3>Horizontal card content</h3>
	<div class="card">
		<header>Header content</header>
		<div style="display:flex;gap:1rem;text-align:left;">
			<img src="https://www.w3schools.com/w3css/img_avatar3.png" class="round" />
			<div style="flex:auto;">This is some content in the card</div>
		</div>
		<footer>This is the footer</footer>
	</div>
  
	</div>
`

	return createIsolatedStyles(code, style, props)
}
