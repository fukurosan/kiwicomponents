import style from "../../Stylesheets/External/details.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * details styles
 */
export default {
	title: "CSS/Details",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...[
			"--kiwi-accordion-border",
			"--kiwi-accordion-panel-background-color",
			"--kiwi-accordion-button-background-color",
			"--kiwi-accordion-button-color",
			"--kiwi-accordion-active-button-background-color",
			"--kiwi-accordion-active-button-color"
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
	<h3>Default</h3>
	<div>
		<details>
		<summary>
			<p>Lorem, ipsum dolor.</p>
		</summary>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
			sunt ratione voluptate debitis atque aspernatur veniam dolorum.
		</p>
		</details>
		<details>
			<summary>
				<p>Lorem, ipsum dolor.</p>
			</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
				sunt ratione voluptate debitis atque aspernatur veniam dolorum.
			</p>
		</details>
		<details>
			<summary>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis.</p>
			</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
				sunt ratione voluptate debitis atque aspernatur veniam dolorum.
			</p>
		</details>
	</div>
	
	<h3>.Bordered</h3>
	<div>
		<details class="bordered">
			<summary>
				<p>Lorem, ipsum dolor.</p>
			</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
				sunt ratione voluptate debitis atque aspernatur veniam dolorum.
			</p>
		</details>
		<details class="bordered">
			<summary>
				<p>Lorem, ipsum dolor.</p>
			</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
				sunt ratione voluptate debitis atque aspernatur veniam dolorum.
			</p>
		</details>
	</div>
	</div>`

	return createIsolatedStyles(code, style, props)
}
