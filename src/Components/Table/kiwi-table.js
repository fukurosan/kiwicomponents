import template from "./kiwi-table.html"
import styles from "./kiwi-table.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Table
 * A table that can be based either on markup or a data structure provided as a property.
 * @element kiwi-table
 *
 * @prop {any} data - Data structure that populates the table
 *
 * @attr {string} fixed - Sets the table to be of a fixed table layour. A comma separated list of width values can be provided to affect how the table is sized.
 * @attr {any} showtoggles - If set tree nodes can be toggled open or closed by a button injected into the first cell of each row
 * @attr {"tree"|"false"|"true"} selection - Configures if rows are selectable. If tree is set then a parent node's selection state is the sum of its children and vice verca.
 *
 * @slot - Markup using kiwi-tr and kiwi-td to generate a table with.
 *
 * @function explodeAllRows - Explodes all rows
 * @function implodeAllRows - Implodes all rows
 * @function getSelectedIDs - Returns all currently selected IDs
 * @function clearSelection - Clears any current selection
 * @function selectAllRows - Selects all rows in the table
 * @function makeSelection - Alters the current selection without removing it
 * @function setSelection - Sets the current selection, overwriting any previous
 * @function filter - Executes a filter on the table
 * @function clearFilter - Clears any existing filter
 *
 * @fires selection - Fires when a selection is made.
 *
 */

class TableElement extends HTMLElement {
	static get observedAttributes() {
		return ["fixed", "showtoggles", "selection"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._tableContainer = this.shadowRoot.querySelector("#table-container")
		this._table = this.shadowRoot.querySelector("table")
		this._thead = this.shadowRoot.querySelector("thead")
		this._tbody = this.shadowRoot.querySelector("tbody")
		this._childMap = new Map()
		this._parentMap = new Map()
		this._rowMap = new Map()
		this._selection = new Set()
		this._data = null
		this._mutationObserver = new MutationObserver(mutations => {
			this._setDataFromMarkup()
		})
		this._mutationObserver.observe(this, { attributes: false, childList: true, subtree: true, characterData: true })
	}

	set data(newData) {
		this._data = newData
		this._render()
	}

	get data() {
		return this._data
	}

	connectedCallback() {
		if (this.children.length) {
			this._setDataFromMarkup()
		}
	}

	attributeChangedCallback() {
		this._render()
	}

	_setDataFromMarkup() {
		const data = {
			rows: [],
			headers: []
		}
		Array.from(this.children).forEach(child => {
			if (child.tagName.toUpperCase() === "KIWI-TR") {
				data.rows.push(this._processMarkupChildRow(child))
			} else if (child.tagName.toUpperCase() === "KIWI-TH") {
				data.headers.push(child.textContent)
			}
		})
		this.data = data
	}

	_processMarkupChildRow(kiwitr) {
		const row = {}
		kiwitr.hasAttribute("id") && (row.id = kiwitr.getAttribute("id"))
		kiwitr.hasAttribute("kiwistyle") && (row.style = kiwitr.getAttribute("kiwistyle"))
		kiwitr.data && (row.data = kiwitr.data)
		kiwitr.hasAttribute("selectable") && (row.selectable = kiwitr.getAttribute("selectable") !== "false")
		row.cells = []
		row.children = []
		Array.from(kiwitr.children).forEach(child => {
			child.tagName.toUpperCase() === "KIWI-TR" && row.children.push(this._processMarkupChildRow(child))
			child.tagName.toUpperCase() === "KIWI-TD" && row.cells.push(this._processMarkupChildCell(child))
		})
		return row
	}

	_processMarkupChildCell(kiwitd) {
		const cell = {}
		cell.type = "unsafehtml"
		cell.value = kiwitd.innerHTML
		kiwitd.hasAttribute("colspan") && (cell.colspan = kiwitd.getAttribute("colspan"))
		kiwitd.hasAttribute("icon") && (cell.icon = kiwitd.getAttribute("icon"))
		return cell
	}

	_getDivWithClass(classToAdd) {
		const div = document.createElement("div")
		div.classList.add(classToAdd)
		return div
	}

	_explodeRow(childRows, deep) {
		if (childRows) {
			childRows.forEach(child => {
				child.classList.remove("imploded")
				if (deep || child.classList.contains("open")) {
					this._explodeRow(this._childMap.get(child), deep)
				}
			})
		}
	}

	_implodeRow(childRows, deep) {
		if (childRows) {
			childRows.forEach(child => {
				child.classList.add("imploded")
				if (deep) {
					this._implodeRow(this._childMap.get(child), deep)
				}
			})
		}
	}

	explodeAllRows() {
		this._childMap.forEach((value, key) => {
			key.classList.add("open")
			this._explodeRow(value)
		})
	}

	implodeAllRows() {
		this._childMap.forEach((value, key) => {
			key.classList.remove("open")
			this._implodeRow(value)
		})
	}

	getSelectedIDs() {
		return [...this._selection].map(tr => tr.getAttribute("id"))
	}

	clearSelection(dispatchEvent = true) {
		const oldSelection = this.getSelectedIDs()
		Array.from(this._selection).forEach(tr => {
			tr.classList.remove("selected")
		})
		this._selection.clear()
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	selectAllRows(dispatchEvent = true) {
		const oldSelection = this.getSelectedIDs()
		this.shadowRoot.querySelectorAll("tr").forEach(tr => {
			if (this._isTRSelectable(tr)) {
				tr.classList.add("selected")
				this._selection.add(tr)
			}
		})
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	makeSelection(id, dispatchEvent = true) {
		const oldSelection = this.getSelectedIDs()
		const tr = this.shadowRoot.getElementById(id)
		if (!tr) {
			return
		}
		this._makeSelection(tr)
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	setSelection(idArray, dispatchEvent = true) {
		const oldSelection = this.getSelectedIDs()
		this.clearSelection(false)
		this.shadowRoot.querySelectorAll("tr").forEach(tr => {
			if (this._isTRSelectable(tr) && idArray.includes(tr.getAttribute("id"))) {
				tr.classList.add("selected")
				this._selection.add(tr)
			}
		})
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	filter(fnOrText, columnIndex) {
		this._tableContainer.classList.add("filter-active")
		if (!fnOrText) {
			this.clearFilter()
			return
		}
		const seenAncestry = new Set()
		this.shadowRoot.querySelectorAll("tr").forEach(tr => {
			if (tr.firstElementChild.tagName.toUpperCase() !== "TD") {
				return
			}
			let match = false
			if (typeof fnOrText === "string") {
				const processedText = fnOrText.toUpperCase()
				const tdArray = Array.from(tr.children)
				if (columnIndex) {
					match = tdArray[columnIndex].textContent.toUpperCase().includes(processedText)
				} else {
					for (let i = 0; i < tdArray.length; i++) {
						match = tdArray[i].textContent.toUpperCase().includes(processedText)
						if (match) {
							break
						}
					}
				}
			} else {
				const rowID = tr.getAttribute("id")
				const rowData = this._rowMap.get(rowID)
				match = fnOrText(rowData)
			}
			if (match) {
				tr.classList.remove("filtered-hidden")
				tr.classList.add("filtered-visible")
				this._filterShowParentsUpwards(tr, seenAncestry)
			} else {
				tr.classList.add("filtered-hidden")
				tr.classList.remove("filtered-visible")
			}
		})
	}

	_filterShowParentsUpwards(tr, seenAncestry) {
		if (!seenAncestry.has(tr)) {
			seenAncestry.add(tr)
			const parent = this._parentMap.get(tr)
			if (parent) {
				parent.classList.remove("filtered-hidden")
				parent.classList.add("filtered-visible")
				return this._filterShowParentsUpwards(parent, seenAncestry)
			}
		}
	}

	clearFilter() {
		this.shadowRoot.querySelectorAll("tr").forEach(tr => {
			tr.classList.remove("filtered-hidden")
			tr.classList.remove("filtered-visible")
		})
		this._tableContainer.classList.remove("filter-active")
		this.hasAttribute("useconnections") && this._drawConnections()
	}

	_dispatchSelectionEvent(oldSelection) {
		const newSelection = this.getSelectedIDs()
		const added = newSelection.filter(newID => !oldSelection.some(oldID => newID === oldID))
		const removed = oldSelection.filter(oldID => !newSelection.some(newID => oldID === newID))
		const detail = {
			selection: newSelection,
			added,
			removed
		}
		this.dispatchEvent(new CustomEvent("selection", { detail }))
	}

	_makeSelection(tr) {
		let shouldRemove
		if (this._selection.has(tr)) {
			shouldRemove = true
		} else {
			shouldRemove = false
		}
		this._updateSelectionOfRow(tr, shouldRemove)
		if (this.getAttribute("selection") === "tree") {
			this._makeSelectionDownwards(tr, shouldRemove)
			this._makeSelectionUpwards(tr)
		}
	}

	_updateSelectionOfRow(tr, shouldRemove) {
		if (shouldRemove) {
			tr.classList.remove("selected")
			this._selection.delete(tr)
		} else {
			tr.classList.add("selected")
			this._selection.add(tr)
		}
	}

	_makeSelectionDownwards(tr, shouldRemove) {
		if (!this._isTRSelectable(tr)) {
			return
		}
		this._updateSelectionOfRow(tr, shouldRemove)
		if (this._childMap.has(tr)) {
			this._childMap.get(tr).forEach(childTR => {
				this._makeSelectionDownwards(childTR, shouldRemove)
			})
		}
	}

	_makeSelectionUpwards(tr) {
		if (!this._isTRSelectable(tr)) {
			return
		}
		if (this._parentMap.has(tr)) {
			const parent = this._parentMap.get(tr)
			if (!this._isTRSelectable(parent)) {
				return
			}
			const siblings = this._childMap.get(parent)
			const shouldParentBeSelected = siblings.every(siblingTR => this._selection.has(siblingTR) || !this._isTRSelectable(siblingTR))
			let statusChanged = false
			if (shouldParentBeSelected && !this._selection.has(parent)) {
				this._updateSelectionOfRow(parent, false)
				statusChanged = true
			} else if (!shouldParentBeSelected && this._selection.has(parent)) {
				this._updateSelectionOfRow(parent, true)
				statusChanged = true
			}
			if (statusChanged && this._parentMap.has(parent)) {
				this._makeSelectionUpwards(parent)
			}
		}
	}

	_isRowSelectable(row) {
		return row.id && (row.selectable || !row.hasOwnProperty("selectable"))
	}

	_isTRSelectable(tr) {
		return !tr.hasAttribute("noselect")
	}

	_getHeader(value) {
		const th = document.createElement("th")
		const div = this._getDivWithClass("cell-content")
		div.appendChild(document.createTextNode(value))
		th.appendChild(div)
		return th
	}

	_processRow(row, parent = null, depth = 0) {
		const tr = document.createElement("tr")
		row.id && tr.setAttribute("id", row.id)
		this._rowMap.set(row.id, row)
		!this._isRowSelectable(row) && tr.setAttribute("noselect", true)
		parent && this.hasAttribute("showtoggles") && tr.classList.add("imploded")
		if (this.hasAttribute("selection") && this.getAttribute("selection") !== "false") {
			tr.appendChild(this._getSelectionCell(row))
		}
		row.cells &&
			row.cells.forEach((cell, index) => {
				const td = this._processCell(cell, row, index, depth)
				tr.appendChild(td)
			})
		if (row.onClick) {
			tr.addEventListener("click", () => row.onClick(row))
		}
		if (row.style) {
			tr.setAttribute("style", row.style)
		}
		this._tbody.appendChild(tr)
		if (row.children) {
			const childRows = row.children.map(child => this._processRow(child, row, depth + 1))
			if (childRows.length > 0) {
				this._childMap.set(tr, childRows)
			}
			childRows.forEach(childTR => this._parentMap.set(childTR, tr))
			if (this.hasAttribute("showtoggles")) {
				tr.children[this.hasAttribute("selection") && this.getAttribute("selection") !== "false" ? 1 : 0]
					.querySelector(".expand-arrow")
					?.addEventListener("click", () => {
						if (tr.classList.contains("open")) {
							this._implodeRow(childRows, true)
						} else {
							this._explodeRow(childRows, false)
						}
						tr.classList.toggle("open")
					})
			}
		}
		return tr
	}

	_processCell(cell, row, cellIndex, rowDepth) {
		const td = document.createElement("td")
		const div = this._getDivWithClass("cell-content")
		if (cell.colspan) {
			td.setAttribute("colspan", cell.colspan)
		}
		if (cellIndex === 0) {
			for (let i = 0; i < rowDepth; i++) {
				div.appendChild(this._getDivWithClass("indent"))
			}
		}
		if (this.hasAttribute("showtoggles") && cellIndex === 0) {
			const arrow = document.createElement("img")
			arrow.classList.add("icon")
			arrow.classList.add("expand-arrow")
			if (!row.children || !row.children.length) {
				arrow.style.visibility = "hidden"
			}
			div.appendChild(arrow)
		}
		if (cell.icon !== undefined) {
			const img = document.createElement("img")
			img.classList.add("icon")
			if (cell.icon !== "") {
				img.setAttribute("src", cell.icon)
			} else {
				img.style.visibility = "hidden"
			}
			div.appendChild(img)
		}
		const userContent = this._getDivWithClass("user-cell-content")
		if (cell.type === "text" || !cell.type) {
			userContent.appendChild(document.createTextNode(cell.value))
		} else if (cell.type === "function") {
			userContent.appendChild(cell.value())
		} else if (cell.type === "unsafehtml") {
			userContent.innerHTML = cell.value
		}
		div.appendChild(userContent)
		td.appendChild(div)
		if (cell.onClick) {
			td.addEventListener("click", () => cell.onClick(cell))
		}
		return td
	}

	_getSelectionCell(row) {
		const td = document.createElement("td")
		if (row.id && this._isRowSelectable(row)) {
			const div = this._getDivWithClass("cell-content")
			const checkboxIcon = document.createElement("img")
			checkboxIcon.classList.add("checkbox")
			td.addEventListener("click", e => {
				this.makeSelection(row.id, true, e)
			})
			div.appendChild(checkboxIcon)
			td.appendChild(div)
		}
		return td
	}

	_render() {
		if (!this._data) {
			return
		}
		while (this._thead.firstChild) {
			this._thead.firstChild.remove()
		}
		while (this._tbody.firstChild) {
			this._tbody.firstChild.remove()
		}
		if (this._data.headers && this._data.headers.length) {
			const row = document.createElement("tr")
			if (this.hasAttribute("selection") && this.getAttribute("selection") !== "false") {
				row.appendChild(document.createElement("th"))
			}
			this._data.headers.forEach(header => row.appendChild(this._getHeader(header)))
			this._thead.appendChild(row)
		}
		if (this._data.rows) {
			this._childMap.clear()
			this._parentMap.clear()
			this._rowMap.clear()
			this._data.rows.forEach(row => this._processRow(row))
		}
		if (this.hasAttribute("fixed")) {
			this._table.style.tableLayout = "fixed"
			const measurements = this.getAttribute("fixed").split(" ")
			if (measurements.length > 0) {
				const row = this.shadowRoot.querySelector("tr")
				row &&
					Array.from(row.children).forEach((cell, index) => {
						measurements[index] && (cell.style.width = measurements[index])
					})
			}
		} else {
			this._table.style.removeProperty("tableLayout")
			const row = this.shadowRoot.querySelector("tr")
			row && Array.from(row.children).forEach(cell => cell.style.removeProperty("width"))
		}
	}
}
window.customElements.define("kiwi-table", TableElement)
