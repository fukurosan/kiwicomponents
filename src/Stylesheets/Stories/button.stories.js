import style from "../../Stylesheets/External/button.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Button styles
 */
export default {
	title: "CSS/Button",
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
	<div style="display:flex;flex-direction:column;gap:0.5rem;">
		<h3>Basic Examples</h3>
		<button>Default Button</button>
		<button class="useanimation">With animation</button>
		<button class="type-info fill-light">type-info fill-light</button>
		<a href="javascript:void(0)" role="button">Link with role="button"</a>
		<br>
		
		<h3>Glass Styles</h3>
		<div style="background-color:coral;height:200px;display:flex;align-items:center;justify-content:center;">
		<button class="type-glass" style="width:fit-content;">type-glass</button>
		</div>
		<br>
		
		<h3>Variants</h3>
		<button>Default</button>
		<button class="type-primary">Type Primary</button>
		<button class="type-primary fill-light">Type Primary</button>
		<button class="type-primary fill-none">Type Primary Fill None</button>
		<button class="type-secondary">Type Secondary</button>
		<button class="type-secondary fill-light">Type Secondary Fill Light</button>
		<button class="type-secondary fill-none">Type Secondary Fill None</button>
		<button class="type-neutral">Type Neutral</button>
		<button class="type-neutral fill-light">Type Neutral Fill Light</button>
		<button class="type-neutral fill-none">Type Neutral Fill None</button>
		<button class="type-info">Type Info</button>
		<button class="type-info fill-light">Type Info Fill Light</button>
		<button class="type-info fill-none">Type Info Fill None</button>
		<button class="type-success">Type Success</button>
		<button class="type-success fill-light">Type Success Fill Light</button>
		<button class="type-success fill-none">Type Success Fill None</button>
		<button class="type-warning">Type Warning</button>
		<button class="type-warning fill-light">Type Warning Fill Light</button>
		<button class="type-warning fill-none">Type Warning Fill None</button>
		<button class="type-error">Type Error</button>
		<button class="type-error fill-light">Type Error Fill Light</button>
		<button class="type-error fill-none">Type Error Fill None</button>
	  </div>
  
	</div>
`

	return createIsolatedStyles(code, style, props)
}
