import style from "../../Stylesheets/External/table.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * table styles
 */
export default {
	title: "CSS/Tables",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...["--kiwi-table-responsive-header-width"].reduce((acc, attr) => {
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
	<table>
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>
	
	<h3>Sticky Headers</h3>
	<div style="height:150px;overflow:auto;">
	<table class="sticky-headers">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>
	</div>

	<h3>Fixed</h3>
	<table class="fixed">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>Hover Effect</h3>
	<table class="hover-effect">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>Striped</h3>
	<table class="striped">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>border-v</h3>
	<table class="border-v">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>border-h</h3>
	<table class="border-h">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>nowrap</h3>
	<table class="nowrap">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>nowrap + scrollable</h3>
	<table class="nowrap scrollable">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>nowrap + fixed</h3>
	<table class="nowrap fixed">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>

	<h3>responsive</h3>
	<table class="responsive">
		<thead>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr>
				<td kiwi-header="One">Hello World 1</td>
				<td kiwi-header="Two">Hello World 2</td>
				<td kiwi-header="Three">Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td kiwi-header="One">Hello World 1</td>
				<td kiwi-header="Two">Hello World 2</td>
				<td kiwi-header="Three">Hello Wooooooooooorld 3</td>
			</tr>
			<tr>
				<td kiwi-header="One">Hello World 1</td>
				<td kiwi-header="Two">Hello World 2</td>
				<td kiwi-header="Three">Hello Wooooooooooorld 3</td>
			</tr>
		</tbody>
	</table>	

	</div>`

	return createIsolatedStyles(code, style, props)
}
