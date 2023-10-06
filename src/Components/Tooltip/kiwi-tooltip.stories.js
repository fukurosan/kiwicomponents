import { Components } from "../../index"
Components.Tooltip()

/**
 * A kiwi tooltip. This component creates a tooltip that appears when hovering a given target.
 * The tooltip will attempt to initialize itself by finding a taget using
 * 1. a provided target attribute,
 * 2. element provided in the target slot,
 * 3. parent element.
 */
export default {
	title: "Components/kiwi-tooltip",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		content: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		target: {
			control: "text",
			description: "Target css selector of element",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		position: {
			control: { type: "select" },
			options: ["top", "right", "bottom", "left", "mouse", "follow"],
			description: "Determines how the tooltip should be positioned relative to the target element",
			table: { type: { summary: "" }, defaultValue: { summary: "mouse" } }
		},
		delay: {
			control: "number",
			description: "Delay in ms before the tooltip should be displayed",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		"@prop targetElement": {
			description: "Target for the tooltip element, supports both getting and setting",
			table: { type: { summary: "HTMLElement" } }
		},
		"@function setTargetElementByQuery(query)": {
			description:
				"Takes a css query as an argument and attempts to set the closest element matching it as the target. Optionally an html element can be provided as a second argument. If provided the tooltip will instead attempt to find a matching target closest to the provided html element."
		},
		"@slot - default": {
			description: "Default slot handles what should be shown in the tooltip"
		},
		"@slot - target": {
			description: "The target slot can be used to set a child as a target, without having to provide a css selector"
		},
		...["--kiwi-tooltip-padding", "--kiwi-tooltip-max-width"].reduce((acc, attr) => {
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
	const { content, position, delay } = props

	const container = document.createElement("div")
	container.setAttribute("id", "container")
	container.innerHTML = `
		<style>
			#container {
				display:flex;
				flex-direction:column;
				gap:1rem;
				align-items:center;
			}
			.square {
				width:200px;
				height:200px;
				background-color:coral;
				display:flex;
				align-items:center;
				justify-content:center;
			}
		</style>
	`

	const getSquare = () => {
		const square = document.createElement("div")
		square.setAttribute("class", "square")
		return square
	}

	const getTooltip = () => {
		const tooltip = document.createElement("kiwi-tooltip")
		tooltip.innerHTML = content ? content : "This is inside of a tooltip"
		position && tooltip.setAttribute("position", position)
		delay && tooltip.setAttribute("delay", delay)
		return tooltip
	}

	const asAChild = getTooltip()
	const square1 = getSquare()
	square1.innerHTML = `
	As a child element
	`
	square1.appendChild(asAChild)
	square1.appendChild(document.createTextNode("\n"))
	container.appendChild(square1)
	container.appendChild(document.createTextNode("\n"))

	const asAParent = getTooltip()
	const square2 = getSquare()
	square2.innerHTML = `
	As a parent Element
	`
	square2.setAttribute("slot", "target")
	asAParent.appendChild(document.createTextNode("\n"))
	asAParent.appendChild(square2)
	asAParent.appendChild(document.createTextNode("\n"))
	container.appendChild(asAParent)
	container.appendChild(document.createTextNode("\n"))

	const withASelector = getTooltip()
	withASelector.setAttribute("target", "#example-id")
	const square3 = getSquare()
	square3.innerHTML = "With a selector set"
	square3.setAttribute("id", "example-id")
	container.appendChild(square3)
	container.appendChild(document.createTextNode("\n"))
	container.appendChild(withASelector)

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
