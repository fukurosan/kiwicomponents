# Tables

Kiwi Components enables you to create tables with a variety of built-in functionality right out of the box. It does this by enhancing your tables through the kiwi-table web component. This means that irregardless of how you choose to style your table you can still use kiwi components to make them interactive. Of course, you can also use the kiwi components CSS bundle to create beautiful tables out of the box.

To use the Table web component you will need to import it:
```javascript
import { Components } from "kiwicomponents"
Components.Table()

//Or initialize all components:

import { init } from "kiwicomponents"
init()
```

## \<kiwi-table>

### Simple Example:

```html
<div style="height:200px;">
	<kiwi-table selection="tree" showtoggles>
		<table>
			<thead>
				<th>Title</th>
				<th>One</th>
				<th>Two</th>
				<th>Three</th>
			</thead>
			<tbody>
				<tr kiwi-row-id="1" kiwi-row-icon="some-icon-url.svg" kiwi-row-title="A">
					<td>Hello World 1</td>
					<td>Hello World 2</td>
					<td>Hello World 3</td>
				</tr>
				<tr kiwi-row-id="2" kiwi-row-title="C">
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
			</tbody>
		</table>
	</kiwi-table>
</div>
```

<kiwi-table selection="tree" showtoggles>
	<table>
		<thead>
			<th>Title</th>
			<th>One</th>
			<th>Two</th>
			<th>Three</th>
		</thead>
		<tbody>
			<tr style="background:white;" kiwi-row-id="1" kiwi-row-icon="./img/beaker.svg" kiwi-row-title="A">
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello World 3</td>
			</tr>
			<tr style="background:white;" kiwi-row-id="2" kiwi-row-title="C">
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello World 3</td>
			</tr>
			<tr style="background:white;" kiwi-row-id="3" kiwi-row-parent-id="2" kiwi-row-title="C.1">
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello World 3</td>
			</tr>
			<tr style="background:white;" kiwi-row-id="5" kiwi-row-parent-id="3" kiwi-row-title="C.1.1">
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello World 3</td>
			</tr>
			<tr style="background:white;" kiwi-row-id="4" kiwi-row-parent-id="2" kiwi-row-title="C.2">
				<td>Hello World 1</td>
				<td>Hello World 2</td>
				<td>Hello World 3</td>
			</tr>
		</tbody>
	</table>
</kiwi-table>

---

### \<tr> Attributes

When building your table you can add additional attributes to your row elements (tr) to give kiwi-table instructions.

If you have enabled selections all rows must have a kiwi-row-id attribute with a unique identifier for the row.

You can create tree tables using kiwi-row-parent-id (the ID of the row's direct parent) as well as "kiwi-row-title" for a human readable label that will be displayed in the tree cell. Note that the table must be ordered so that the closest parent one level up is the parent to the child.

---

### \<kiwi-table> Interaction

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

### \<kiwi-table> events

The following events are fired by the table element

| event    | detail                                               | description                                        |
| -------- | ---------------------------------------------------- | -------------------------------------------------- |
| selected | { selection: string[], added: strin[], removed: [] } | Fired when a selection has been made in the table. |

---

### \<kiwi-table> attributes

The following attributes are supported:

| option      | type                    | description                                                                                                                             |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| fixed       | string                  | Sets the table to be of a fixed table layout. A space separated list of width values can be provided to affect how the cells are sized. |
| showtoggles | any                     | If set tree nodes can be toggled open or closed by a button injected into the first cell of each row                                    |
| selection   | "tree"\|"false"\|"true" | Configures if rows are selectable. If tree is set then a parent node's selection state is the sum of its children and vice verca.       |

---

## CSS

By importing either the table.css stylesheet file from kiwi components, or the full bundle.css your tables will look good without you having to put much thought into it.

You will on top of this get access to a few different css classes that you can attach to your table element to style it according to your needs:

| class           | description                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| .sticky-headers | Makes the headers sticky                                                                                                                         |
| .fixed          | Fixes the width of the table to stop horizontal overflow                                                                                         |
| .hover-effect   | Adds a hover effect for rows                                                                                                                     |
| .striped        | Makes every second row striped                                                                                                                   |
| .border-v       | Adds vertical borders                                                                                                                            |
| .border-h       | Adds horizontal borders                                                                                                                          |
| .nowrap         | Makes cell content not wrap                                                                                                                      |
| .responsive     | Makes rows wrap vertically on mobile resolutions. Note that you must add a "kiwi-header" attribute to all tds with the corresponding header text |

import either only the table css file, or the full bundle.

```javascript
import "kiwicomponents/dist/table.css"
//OR
import "kiwicomponents/dist/bundle.css"
```

After doing so all your standard form elements should now look better.

### Example

```html
<table class="sticky-headers striped border-h nowrap fixed responsive">
	<thead>
		<th>One</th>
		<th>Two</th>
		<th>Three</th>
	</thead>
	<tbody>
		<tr>
			<td kiwi-header="One">Hello World 1</td>
			<td kiwi-header="Two">Hello World 2</td>
			<td kiwi-header="Three">Hello Wooooooorld 3</td>
		</tr>
		<tr>
			<td kiwi-header="One">Hello World 1</td>
			<td kiwi-header="Two">Hello World 2</td>
			<td kiwi-header="Three">Hello Wooooooorld 3</td>
		</tr>
		<tr>
			<td kiwi-header="One">Hello World 1</td>
			<td kiwi-header="Two">Hello World 2</td>
			<td kiwi-header="Three">Hello Wooooooorld 3</td>
		</tr>
	</tbody>
</table>
```

<kiwi-scoped-demo>
    <table class="sticky-headers striped border-h nowrap fixed responsive">
        <thead>
            <th>One</th>
            <th>Two</th>
            <th>Three</th>
        </thead>
        <tbody>
            <tr>
                <td kiwi-header="One">Hello World 1</td>
                <td kiwi-header="Two">Hello World 2</td>
                <td kiwi-header="Three">Hello Wooooooorld 3</td>
            </tr>
            <tr>
                <td kiwi-header="One">Hello World 1</td>
                <td kiwi-header="Two">Hello World 2</td>
                <td kiwi-header="Three">Hello Wooooooorld 3</td>
            </tr>
            <tr>
                <td kiwi-header="One">Hello World 1</td>
                <td kiwi-header="Two">Hello World 2</td>
                <td kiwi-header="Three">Hello Wooooooorld 3</td>
            </tr>
        </tbody>
    </table>
</kiwi-scoped-demo>

---
