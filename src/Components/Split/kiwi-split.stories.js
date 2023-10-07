import { Components } from "../../index"
Components.Split()

/**
 * Creates a container that is split into two parts, with a draggable resizer element in the middle
 */
export default {
	title: "Components/kiwi-split",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		direction: {
			control: { type: "select" },
			options: ["row", "column"],
			description: "Determines of the layout is from left to right ('row') or top to bottom ('column')",
			table: { type: { summary: "" }, defaultValue: { summary: "column" } }
		},
		"@function setContainerOneSize(newMeasurement)": { description: "Manually sets the measurement of the 0 index element in the split layout" },
		"@slot - 0": { description: "Top / left element in the split" },
		"@slot - 1": { description: "Bottom / right element in the split" },
		...["--kiwi-split-bar-background-color", "--kiwi-split-handle-color", "--kiwi-split-handle-color-hover"].reduce((acc, attr) => {
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
	const element = document.createElement("kiwi-split")
	element.setAttribute("style", "min-height:500px;")
	element.innerHTML = `
		<div slot="0">
			<kiwi-split direction="row">
				<div slot="0" style="background-color:coral;"></div>
				<div slot="1" style="background-color:cornflowerblue;"></div>
			</kiwi-split>
		</div>
		<div slot="1">
			<kiwi-split direction="row">
				<div slot="0" style="background-color:coral;"></div>
				<div slot="1" style="background-color:cornflowerblue;"></div>
			</kiwi-split>
		</div>
	`

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		element.style.setProperty(key, props[key])
	})

	return element
}
