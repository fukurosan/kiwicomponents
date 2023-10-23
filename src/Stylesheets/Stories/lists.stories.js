import style from "../../Stylesheets/External/lists.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Lists styles
 */
export default {
	title: "CSS/Lists",
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

		<h3>Unordered List</h3>
		<ul class="steps">
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
		</ul>
		<ul class="steps horizontal">
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
		</ul>

		<h3>Ordered List</h3>
		<ol class="steps">
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
			<li class="is-secondary">List Item Secondary</li>
			<li class="is-neutral">List Item Neutral</li>
			<li class="is-success">List Item Success</li>
			<li class="is-info">List Item Info</li>
			<li class="is-warning">List Item Warning</li>
			<li class="is-error">List Item Error</li>
			<li class="is-error" kiwi-content="@">List Item Custom</li>
		</ol>

		<ol class="steps horizontal">
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
		</ol>

		<h3>Menu</h3>
		<ul class="menu">
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
		</ul>
		<ul class="menu horizontal">
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
		</ul>

	</div>`

	return createIsolatedStyles(code, style, props)
}
