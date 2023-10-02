import style from "../../Stylesheets/External/navigation.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * navigation styles
 */
export default {
	title: "CSS/Navigation",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...["--kiwi-navigation-spacing"].reduce((acc, attr) => {
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
	<style>
		nav {
			background: aliceblue;
		}
	</style>

	<h3>Horizontal Navigation</h3>
	<nav>
		<ul>
			<li>Left Item</li>
		</ul>
		<ul>
			<li>Right Item 1</li>
			<li>Right Item 2</li>
			<li>Right Item 3</li>
		</ul>
	</nav>

	<h3>Vertical navigation</h3>
	<style>
		aside {
			background: aliceblue;
		}
	</style>
	<aside>
		<nav>
			<ul>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
			</ul>
		</nav>
	</aside>

	<h3>Breadcrumb</h3>
	<style>
		nav {
			background: aliceblue;
		}
	</style>
	<nav aria-label="breadcrumb">
		<ul>
			<li><span>Item 1</span></li>
			<li><span>Item 2</span></li>
			<li><span>Item 3</span></li>
		</ul>
	</nav>

	</div>`

	return createIsolatedStyles(code, style, props)
}
