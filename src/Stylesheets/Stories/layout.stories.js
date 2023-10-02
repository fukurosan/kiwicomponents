import style from "../../Stylesheets/External/layout.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Layout styles
 */
export default {
	title: "CSS/Layout",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...[
			"--kiwi-section-background",
			"--kiwi-article-background",
			"--kiwi-article-box-shadow",
			"--kiwi-article-border",
			"--kiwi-grid-column-min-measurement"
		].reduce((acc, attr) => {
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

	<h3>Sections and Articles</h3>
	<main style="background:lightgray;">
		<section>
			<article>
				<h2>This is an article</h2>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</article>
			<article>
				<h2>This is an article with a section</h2>
				<section>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
					alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
				</section>
			</article>
			<article class="fill">
				<h2>This article fills more space</h2>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</article>
		</section>
		<section class="narrow mobile-margins">
			<article>
				<h2>This article is part of a narrow section</h2>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</article>
			<article>
				<h2>And this one has mobile margins</h2>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</article>
		</section>
	</main>

	<h3>Containers</h3>
	<div class="container" style="background-color:aliceblue;padding:1rem;">Hello World</div>

	<h3>Desktop & Mobile Only</h3>
	<div class="desktop-only">Hello Desktop</div>
	<div class="mobile-only">Hello Mobile</div>

	<h3>Grids</h3>
	<style>
		.grid {
			background-color: aliceblue;
			padding: 1rem;
		}
		.grid-item {
			background-color: white;
			padding: 1rem;
			text-align: center;
		}
	</style>
	<div class="grid">
		<div class="grid-item">Hello World</div>
		<div class="grid-item">Hello World</div>
		<div class="grid-item">Hello World</div>
		<div class="grid-item">Hello World</div>
		<div class="grid-item">Hello World</div>
		<div class="grid-item">Hello World</div>
	</div>

	<h3>Flex Flows</h3>
	<style>
		.box {
			background-color: aliceblue;
			padding: 1rem;
		}
		.item {
			background-color: white;
			padding: 1rem;
			flex: auto;
		}
	</style>
	<div class="box">
		<div class="flex-down">
			<div class="flex-right">
				<div class="item">Item 1</div>
				<div class="item">Item 2</div>
			</div>
			<div class="item">Item 3</div>
		</div>
	</div>

	<h3>Centering</h3>
	</div>
	`

	return createIsolatedStyles(code, style, props)
}
