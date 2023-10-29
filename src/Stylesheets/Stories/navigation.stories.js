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
	<div style="display:flex;flex-direction:column;gap:2rem;">
	<style>
		nav {
			background: aliceblue;
		}
	</style>

	<h3>Navbar Navigation</h3>
	<nav class="navbar">
		<ul>
			<li>Left Item</li>
		</ul>
		<ul>
			<li>Right Item 1</li>
			<li>Right Item 2</li>
			<li><hr /></li>
			<li>Right Item 3</li>
		</ul>
	</nav>

	<h3>Vertical navigation</h3>
	<style>
		aside {
			background: aliceblue;
			padding: 1rem;
		}
	</style>
	<aside>
		<nav>
			<ul>
				<li><div>Item 1</div></li>
				<li style="--kiwi-li-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='gray' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"><div>Item 2</div></li>
				<li><div>Item 3 loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</div></li>
			</ul>
		</nav>
	</aside>

	<aside>
		<nav>
			<ul class="dark">
				<li><div>Item 1</div></li>
				<li style="--kiwi-li-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='gray' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"><div>Item 2</div></li>
				<li><div>Item 3 loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</div></li>
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

	<h3>Icon</h3>
	<ul class="dark">
		<li
			style="--kiwi-li-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='gray' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
		>
			Item
		</li>
	</ul>

	<h3>Bottom Navigation</h3>
	<div style="margin-bottom:5rem;"></div>
	<nav class="bottom-navbar">
		<ul>
			<li>Item 1</li>
			<li
			style="--kiwi-li-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='gray' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
		>
			Item
		</li>
			<li>Item 3</li>
			<li><div>Item loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</div></li>
			<li>Item 5</li>
		</ul>
	</nav>

	</div>`

	return createIsolatedStyles(code, style, props)
}
