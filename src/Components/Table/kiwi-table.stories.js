import { Components } from "../../index"
Components.Table()

/**
 * A table wrapper element that allows developers to add interactivity to their tables
 */
export default {
	title: "Components/kiwi-table",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	play: () => {
		document.getElementById("table-search").addEventListener("input", e => {
			document.getElementById("example-table").filter(e.target.value)
		})
	},
	argTypes: {
		fixed: {
			control: "text",
			description:
				"Sets the table to be of a fixed table layout. A comma separated list of width values can be provided to affect how the table is sized",
			table: { type: { summary: "" }, defaultValue: { summary: null } }
		},
		selection: {
			control: { type: "select" },
			options: ["tree", "false", "true"],
			description: "Configures if rows are selectable. If tree is set then a parent node's selection state is the sum of its children and vice verca",
			table: { type: { summary: "" }, defaultValue: { summary: "false" } }
		},
		showtoggles: {
			control: { type: "boolean" },
			description: "If set tree nodes can be toggled open or closed by a button injected into the first cell of each row",
			table: { type: { summary: "" }, defaultValue: { summary: false } }
		},
		"@event selection": { action: "onSelection", description: "Fires when a selection is made" },
		"@function explodeAllRows()": { description: "Explodes all rows" },
		"@function implodeAllRows()": { description: "Implodes all rows" },
		"@function getSelectedRows()": { description: "Returns all currently selected IDs" },
		"@function clearSelection(dispatchEvent = true)": { description: "Clears any current selection" },
		"@function selectAllRows(dispatchEvent = true)": { description: "Selects all rows in the table" },
		"@function toggleSelection(trElement, dispatchEvent = true)": { description: "Alters the current selection without removing it" },
		"@function setSelection(idArray, dispatchEvent = true)": { description: "Sets the current selection, overwriting any previous" },
		"@function filter(fnOrText, columnIndex)": { description: "Executes a filter on the table" },
		"@function clearFilter()": { description: "Clears any existing filter" },
		"@slot - Default": {
			description: "Default slot for the wrapped table. The wrapped table *must* contain a tbody, and for headers (if applicable) a thead."
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
	const { fixed, selection, showtoggles } = props
	const container = document.createElement("div")

	container.innerHTML = `
	<style>
		table, td {
			border: 1px solid black
		}
		td {
			padding-inline: 1rem;
		}
	</style>
	<div>
	<input id="table-search" placeholder="Filter...">
	</div>
	  <kiwi-table id="example-table" ${fixed ? `fixed='${fixed}'` : ""} ${selection ? `selection='${selection}'` : ""} ${
	showtoggles ? `showtoggles='${showtoggles}'` : ""
}>
		<table style="width:100%;">
		  <thead>
			<th id="toggles-header">Title</th>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		  </thead>
		  <tbody>
			<tr kiwi-row-id="1"  kiwi-row-title="A" kiwi-row-icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="2" kiwi-row-title="C" kiwi-row-icon="">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="3" kiwi-row-parent-id="2" kiwi-row-title="C.1">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="5" kiwi-row-parent-id="3" kiwi-row-title="C.1.1">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="4" kiwi-row-parent-id="2" kiwi-row-title="C.2">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="6" icon="" kiwi-row-title="B">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="7" kiwi-row-title="D">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="8" kiwi-row-parent-id="7" kiwi-row-title="D.1">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
			<tr kiwi-row-id="9" kiwi-row-parent-id="8" kiwi-row-title="D.1.1">
			  <td>Hello World 1</td>
			  <td>Hello World 2</td>
			  <td>Hello World 3</td>
			</tr>
		  </tbody>
		</table>
	  </kiwi-table>
	`
	const table = container.querySelector("kiwi-table")

	if (!showtoggles) {
		table.querySelector("#toggles-header").remove()
	}
	table.addEventListener("selection", props["@event selection"])

	const generateButton = (fn, label) => {
		const btn = document.createElement("button")
		btn.innerHTML = label ? label : `${fn.name}()`
		btn.addEventListener("click", () => fn())
		container.appendChild(btn)
	}

	function explodeAllRows() {
		table.explodeAllRows()
	}
	generateButton(explodeAllRows)

	function implodeAllRows() {
		table.implodeAllRows()
	}
	generateButton(implodeAllRows)

	function getSelectedRows() {
		// eslint-disable-next-line no-console
		console.log(table.getSelectedRows())
	}
	generateButton(getSelectedRows, "getSelectedRows() - Check console")

	function clearSelection() {
		table.clearSelection()
	}
	generateButton(clearSelection)

	function selectAllRows() {
		table.selectAllRows()
	}
	generateButton(selectAllRows)

	function toggleSelection() {
		table.toggleSelection("1")
	}
	generateButton(toggleSelection, "toggleSelection() - ID: 1")

	function setSelection() {
		table.setSelection("2")
	}
	generateButton(setSelection, "setSelection() - ID: 2")

	function filter() {
		table.filter("C")
	}
	generateButton(filter, "filter() - 'C'")

	function clearFilter() {
		table.clearFilter()
	}
	generateButton(clearFilter)

	return container
}
