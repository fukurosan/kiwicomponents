import { Components } from "../../index"
Components.Tabs()

/**
 * A tab panel that generates a tabbed layout. Tabs are created by inserting <kiwi-tab> elements into the <kiwi-tabs> element and then slotting content into slots with names relative to the index of a given <kiwi-tab>
 */
export default {
	title: "Components/kiwi-tabs",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		"active-tab-index": {
			control: "text",
			description: "Index of the currently active tab",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		variant: {
			control: { type: "select" },
			options: ["default", "popup", "button"],
			description: "General look and feel of the tab menu",
			table: { type: { summary: "" }, defaultValue: { summary: "default" } }
		},
		direction: {
			control: { type: "select" },
			options: ["row", "column"],
			description: "Direction of the tab layout",
			table: { type: { summary: "" }, defaultValue: { summary: "false" } }
		},
		noborder: {
			control: { type: "boolean" },
			description: "If set to any value there will be no border separating the tabs and the content below them",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		"@event change": {
			action: "onChange",
			description:
				"Change event is fired whenever a tab is clicked. The details of the event contains a tabElement reference and an index property of what tab was pressed. Note that this event is not fired when the attribute is manually updated"
		},
		"@slot - default": {
			description: "Specifically meant to hold <kiwi-tab> elements"
		},
		"@slot - {index}": {
			description: "Each tab created will generate a slot with a name of its index in the order of tab elements"
		}
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
	const container = document.createElement("div")
	const activeTabIndex = props["active-tab-index"]
	container.innerHTML = `
	<kiwi-tabs ${activeTabIndex ? `active-tab-index='${activeTabIndex}'` : ""} ${props.direction ? `direction='${props.direction}'` : ""} ${
	props.noborder ? "noborder" : ""
} ${props.variant ? `variant='${props.variant}'` : ""}>
	<kiwi-tab>Hello World</kiwi-tab>
	<kiwi-tab>Some Carpeting</kiwi-tab>
	<kiwi-tab disabled>Fun Stuff</kiwi-tab>
	<div slot="0">
	  Tab 1 content
	  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem
	  consequatur odit, iusto aperiam quos pariatur eum perspiciatis ipsam eveniet natus non eius ipsum dolorem hic
	  rem! Nisi?
	</div>
	<div slot="1">
	  Tab 2 content
	  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem
	  consequatur odit, iusto aperiam quos pariatur eum perspiciatis ipsam eveniet natus non eius ipsum dolorem hic
	  rem! Nisi?
	</div>
	<div slot="2">
	  Tab 3 content
	  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed asperiores autem
	  consequatur odit, iusto aperiam quos pariatur eum perspiciatis ipsam eveniet natus non eius ipsum dolorem hic
	  rem! Nisi?
	</div>
  </kiwi-tabs>
	`
	const element = container.querySelector("kiwi-tabs")
	element.addEventListener("change", props["@event change"])

	return container
}
