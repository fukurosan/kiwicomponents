import style from "../../Stylesheets/External/forms.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Form styles
 */
export default {
	title: "CSS/Forms",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		...["--kiwi-flex-gap"].reduce((acc, attr) => {
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
		form, form *:not(label, input) {
			display:flex;
			flex-direction: column;
			gap: 1rem;
		}
	</style>
	<form>

	<h3>Input</h3>
	<input placeholder="Default input field" />
	<input placeholder="Password" type="password" />
	<input placeholder="Disabled" disabled />
	<input placeholder="Required" required />
	<input type="Date">
	<input type="Time">

	<h3>Select</h3>
	<select>
		<option>Option 1</option>
		<option>Option 2</option>
		<option>Option 3</option>
	</select>
	<h3>Multiple Select</h3>
	<select multiple size="4">
		<option>Option 1</option>
		<option>Option 2</option>
		<option>Option 3</option>
		<option>Option 4</option>
		<option>Option 5</option>
	</select>


	<h3>Fieldset</h3>
	<fieldset>
		<legend>Fieldset</legend>
		Some content inside the fieldset
	</fieldset>
	<fieldset class="label">
		<legend>Fieldset with .label set</legend>
		Some content inside the fieldset
	</fieldset>

	<h3>Labels</h3>
	<label>Default Label</label>
	<label>
		<input type="checkbox">
		Label with content (entire label is clickable)
	</label>

	<h3>Checkboxes</h3>
	<input type="checkbox" />
	<input type="radio" />
	<input type="checkbox" role="switch" />
	<input type="checkbox" disabled checked />
	<input type="radio" disabled checked />
	<input type="checkbox" role="switch" disabled checked />

	<h3>Range</h3>
	<input type="range" />
	<input type="range" disabled />

	<h3>Color</h3>
	<input type="color">

	<h3>File Uploads</h3>
	<input type="file">

	<h3>Text Area</h3>
	<textarea></textarea>

	<h3>With Icon</h3>
	<input
	style="--kiwi-input-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
/>
</form>`

	return createIsolatedStyles(code, style, props)
}
