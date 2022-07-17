# Tables

Kiwi Components enables you to create tables with a variety of built-in functionality right out of the box.

## Simple Example:

```html
<div style="height:200px">
	<kiwi-table selection="tree" showtoggles>
		<kiwi-th>Title</kiwi-th>
		<kiwi-th>One</kiwi-th>
		<kiwi-th>Two</kiwi-th>
		<kiwi-tr id="1">
			<kiwi-td>A</kiwi-td>
			<kiwi-td>Hello World 1</kiwi-td>
			<kiwi-td>Hello World 2</kiwi-td>
		</kiwi-tr>
		<kiwi-tr id="2">
			<kiwi-td>B</kiwi-td>
			<kiwi-td>Hello World 1</kiwi-td>
			<kiwi-td>Hello World 2</kiwi-td>
			<kiwi-tr id="3">
				<kiwi-td>B.1</kiwi-td>
				<kiwi-td>Hello World 1</kiwi-td>
				<kiwi-td>Hello World 2</kiwi-td>
			</kiwi-tr>
			<kiwi-tr id="4">
				<kiwi-td>B.2</kiwi-td>
				<kiwi-td>Hello World 1</kiwi-td>
				<kiwi-td>Hello World 2</kiwi-td>
				<kiwi-tr id="5">
					<kiwi-td>B.2.1</kiwi-td>
					<kiwi-td>Hello World 1</kiwi-td>
					<kiwi-td>Hello World 2</kiwi-td>
				</kiwi-tr>
			</kiwi-tr>
		</kiwi-tr>
		<kiwi-tr id="6">
			<kiwi-td>C</kiwi-td>
			<kiwi-td>Hello World 1</kiwi-td>
			<kiwi-td>Hello World 2</kiwi-td>
		</kiwi-tr>
	</kiwi-table>
</div>
```

<div style="height:200px">
<kiwi-table selection="tree" showtoggles>
	<kiwi-th>Title</kiwi-th>
	<kiwi-th>One</kiwi-th>
	<kiwi-th>Two</kiwi-th>
	<kiwi-tr id="1">
		<kiwi-td>A</kiwi-td>
		<kiwi-td>Hello World 1</kiwi-td>
		<kiwi-td>Hello World 2</kiwi-td>
	</kiwi-tr>
	<kiwi-tr id="2">
		<kiwi-td>B</kiwi-td>
		<kiwi-td>Hello World 1</kiwi-td>
		<kiwi-td>Hello World 2</kiwi-td>
		<kiwi-tr id="3">
			<kiwi-td>B.1</kiwi-td>
			<kiwi-td>Hello World 1</kiwi-td>
			<kiwi-td>Hello World 2</kiwi-td>
		</kiwi-tr>
		<kiwi-tr id="4">
			<kiwi-td>B.2</kiwi-td>
			<kiwi-td>Hello World 1</kiwi-td>
			<kiwi-td>Hello World 2</kiwi-td>
			<kiwi-tr id="5">
				<kiwi-td>B.2.1</kiwi-td>
				<kiwi-td>Hello World 1</kiwi-td>
				<kiwi-td>Hello World 2</kiwi-td>
			</kiwi-tr>
		</kiwi-tr>
	</kiwi-tr>
	<kiwi-tr id="6">
		<kiwi-td>C</kiwi-td>
		<kiwi-td>Hello World 1</kiwi-td>
		<kiwi-td>Hello World 2</kiwi-td>
	</kiwi-tr>
</kiwi-table>
</div>

---

## Table Interaction

The kiwi-table element has a number of functions that can be executed to interact with the data inside.

| function                                                              | description                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| explodeAllRows()                                                      | Explodes all rows                                                                                                                                                                                                                                                                          |
| implodeAllRows()                                                      | Implodes all rows                                                                                                                                                                                                                                                                          |
| getSelectedIDs()                                                      | Returns all currently selected IDs                                                                                                                                                                                                                                                         |
| clearSelection()                                                      | Clears any current selection                                                                                                                                                                                                                                                               |
| selectAllRows()                                                       | Selects all rows in the table                                                                                                                                                                                                                                                              |
| makeSelection(id: string, shouldDispatchEvent: boolean)               | Alters the current selection without removing it by toggling an ID                                                                                                                                                                                                                         |
| setSelection(idArray: string[], shouldDispatchEvent: boolean)         | Sets a new selection, overwriting any previous                                                                                                                                                                                                                                             |
| filter(fnOrString: ((any) => boolean) \| string, columnIndex: number) | If a function is provided it will be fed with the data object of each row, returning true means that the row should be filtered, false means that it should not. If a string is provided (and optionally a column index) the table cells' actual text values will be searched for a match. |
| clearFilter()                                                         | Clears any existing filters                                                                                                                                                                                                                                                                |

---

## Creating a table

Tables can be created either using markup or using data objects. There are different pros and cons to each approach.

### With data objects

The table can be populated using a data object. This is done by setting the data object on the table's "data" property.

The following is an interface for the data object:

```javascript
interface ITableData {
	headers?: string[]
	rows?: IRow[]
}

interface IRow {
	/** The row ID is used for selections. It must be unique throughout the entire table if selections are turned on. */
	id?: any
	/** Data object that is bound to the row. This is used, for example, when filtering data using a provided function. */
	data?: any
	/** These styles will be applied inline to the tr element */
	style?: string
	/** Cells of the row */
	cells: ICell[]
	/** Child rows that will be rendered as a hierarchy */
	children?: IRow[]
	/** If a particular row is not selectable it can be configured by setting this to false */
	selectable?: boolean
	/** Click listener for the tr element */
	onClick?: (row: IRow) => void
}

interface ICell {
	/** Cell value type */
	type?: "text" | "function" | "unsafehtml"
	/** The actual value to be written to the cell */
	value: string | (() => HTMLElement)
	/** Colspan for the td element */
	colspan?: number
	/** If an icon URL is provided it will be prepended the other user content */
	icon?: string
	/** Click listener for the td element */
	onClick?: (cell: ICell) => void
}
```

Using this data object we can recreate our initial example like so:

```html
<div style="height:200px">
	<kiwi-table id="example-table" selection="tree" showtoggles>
</div>
<script>
	const table = document.getElementById("example-table")
	table.data = {
		headers: ["Title", "One", "Two"],
		rows: [
			{
				id: 1,
				cells: [
					{
						type: "text",
						value: "A"
					},
					{
						type: "text",
						value: "Hello World 1"
					},
					{
						type: "text",
						value: "Hello World 2"
					}
				]
			},
			{
				id: 2,
				cells: [
					{
						type: "text",
						value: "B"
					},
					{
						type: "text",
						value: "Hello World 1"
					},
					{
						type: "text",
						value: "Hello World 2"
					}
				],
				children: [
					{
						id: 3,
						cells: [
							{
								type: "text",
								value: "B.1"
							},
							{
								type: "text",
								value: "Hello World 1"
							},
							{
								type: "text",
								value: "Hello World 2"
							}
						]
					},
					{
						id: 4,
						cells: [
							{
								type: "text",
								value: "B.2"
							},
							{
								type: "text",
								value: "Hello World 1"
							},
							{
								type: "text",
								value: "Hello World 2"
							}
						],
						children: [
							{
								id: 5,
								cells: [
									{
										type: "text",
										value: "B.2.1"
									},
									{
										type: "text",
										value: "Hello World 1"
									},
									{
										type: "text",
										value: "Hello World 2"
									}
								]
							}
						]
					}
				]
			},
			{
				id: 6,
				cells: [
					{
						type: "text",
						value: "C"
					},
					{
						type: "text",
						value: "Hello World 1"
					},
					{
						type: "text",
						value: "Hello World 2"
					}
				]
			}
		]
	}
</script>
```

### With markup

Tables can also be generated using markup with three custom elements (kiwi-tr, kiwi-td and kiwi-th).

#### kiwi-th

Any kiwi-th elements placed inside of the kiwi-table element will render as headers for the table. If no kiwi-th elements are provided no headers will be rendered. Note that only text nodes are allowed for headers.

#### kiwi-tr

Kiwi-tr elements create a new row in the table. if a kiwi-tr is a child of another kiwi-tr then the table will display the two rows as a hierarchy.

The following attributes are applicable on this element:

| Attribute  | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| id         | Unique ID of the row (used for selections)                             |
| selectable | If set to "false" the row will not be selectable                       |
| kiwistyle  | Inline styles that should be applied to the internal table row element |

#### kiwi-td

Kiwi-td is represents a cell inside of a row.

The following attributes are applicable on this element:

| Attribute | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| colspan   | Will set the colspan on the internal td element                       |
| icon      | If set to a icon URL an auto-sized icon will be prepended to the cell |

#### Shadow DOM Slots (caveat)

It is important to understand that when setting the content to the table as markup, kiwi-table will internally process it as a data object and then use that data object, cloning all elements into an internal table structure in its shadow dom. This means that A) no outside css-classes will work and B) all attached listeners will be lost.

This being said there is a workaround that allows for the table to be created using markup with content slotted directly into the internal table structure, allowing for both light dom styling as well as listeners to remain intact.

Check out this example:

```html
<kiwi-table>
	<kiwi-tr>
		<kiwi-td>
			<slot name="cell-1"></slot>
		</kiwi-td>
		<kiwi-td>
			<slot name="cell-2"></slot>
		</kiwi-td>
	</kiwi-tr>
	<div slot="cell-1">Slotted Content 1</div>
	<div slot="cell-2">Slotted Content 2</div>
</kiwi-table>
```

By placing each cell's content as a slotted element in the root of the kiwi-table and then creating corresponding slot elements in each kiwi-td cell element the actual elements will in the light dom will be able to be properly slotted into the table.

---

## events

The following events are fired by the table element

| event    | detail                                               | description                                        |
| -------- | ---------------------------------------------------- | -------------------------------------------------- |
| selected | { selection: string[], added: strin[], removed: [] } | Fired when a selection has been made in the table. |

---

## attributes

The following attributes are supported:

| option      | type                    | description                                                                                                                             |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| fixed       | string                  | Sets the table to be of a fixed table layout. A comma separated list of width values can be provided to affect how the cells are sized. |
| showtoggles | any                     | If set tree nodes can be toggled open or closed by a button injected into the first cell of each row                                    |
| selection   | "tree"\|"false"\|"true" | Configures if rows are selectable. If tree is set then a parent node's selection state is the sum of its children and vice verca.       |

---

## Styling

The following variables can be set:

| Variable                             | Description                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| --kiwi-table-width                   | Width of the table (default 100%)                                               |
| --kiwi-table-height                  | Height of the table (default 100%)                                              |
| --kiwi-table-border                  | Border of the table container                                                   |
| --kiwi-table-border-radius           | Border radius of the table                                                      |
| --kiwi-table-area-background         | Background of the table container                                               |
| --kiwi-table-header-background       | Table header background                                                         |
| --kiwi-table-header-color            | Table header color                                                              |
| --kiwi-table-row-background          | Table row background                                                            |
| --kiwi-table-row-color               | Table row color                                                                 |
| --kiwi-table-row-background-hover    | Table row background on hover                                                   |
| --kiwi-table-row-background-selected | Table row background on selected                                                |
| --kiwi-table-odd-row-background      | Table row background for odd rows                                               |
| --kiwi-table-row-height              | Row height (icons and indent space will scale relative to this)                 |
| --kiwi-table-font-size               | Font size used in the table                                                     |
| --kiwi-table-white-space             | If set to "nowrap" text in table rows will not wrap. Can also be set to "unset" |
| --kiwi-table-header-vertical-border  | Border separating headers                                                       |
| --kiwi-table-cell-vertical-border    | Border separating cells vertically                                              |
| --kiwi-table-row-horizontal-border   | Border separating rows horizontally                                             |
| --kiwi-table-checkbox-unchecked-url  | URL for uncheckbox checkbox icon (provide as url("iconurlhere"))                |
| --kiwi-table-checkbox-checked-url    | URL for checked checkbox icon(provide as url("iconurlhere"))                    |
| --kiwi-table-expand-arrow-icon-url   | URL for expand toggle icon(provide as url("iconurlhere"))                       |


## Enabling Global Tables Styles

To enable the global table styles you can use the injectStyle function, and set tables to true.

```javascript
import { injectStyle } from "kiwicomponents"
kiwicomponents.injectStyle({
	tables: true
})
```
