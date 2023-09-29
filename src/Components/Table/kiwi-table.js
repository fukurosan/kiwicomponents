import template from "./kiwi-table.html"
import styles from "./kiwi-table.scss"

/**
 * Kiwi Table
 * A table wrapper element that allows developers to add interactivity to their tables
 * @element kiwi-table
 *
 * @attr {string} fixed - Sets the table to be of a fixed table layout. A comma separated list of width values can be provided to affect how the table is sized.
 * @attr {any} showtoggles - If set tree nodes can be toggled open or closed by a button injected into the first cell of each row
 * @attr {"tree"|"false"|"true"} selection - Configures if rows are selectable. If tree is set then a parent node's selection state is the sum of its children and vice verca.
 *
 * @slot - Default slot for the wrapped table. The wrapped table *must* contain a tbody, and for headers (if applicable) a thead.
 *
 * @function explodeAllRows - Explodes all rows
 * @function implodeAllRows - Implodes all rows
 * @function getSelectedRows - Returns all currently selected IDs
 * @function clearSelection - Clears any current selection
 * @function selectAllRows - Selects all rows in the table
 * @function toggleSelection - Alters the current selection without removing it
 * @function setSelection - Sets the current selection, overwriting any previous
 * @function filter - Executes a filter on the table
 * @function clearFilter - Clears any existing filter
 *
 * @fires selection - Fires when a selection is made.
 *
 */
class KiwiTableElement extends HTMLElement {
	static get observedAttributes() {
		return ["fixed", "showtoggles", "selection"]
	}

	constructor() {
		super()
		if (!KiwiTableElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiTableElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiTableElement._template.content.cloneNode(true))
		this._styles = styles
		/** @type {Map<HTMLElement, HTMLElement[]>} Mapping a row to its child rows */
		this._childMap = new Map()
		/** @type {Map<HTMLElement, HTMLElement>} Mapping a row to its parent row */
		this._parentMap = new Map()
		/** @type {Map<string, number>} Holds the depth of each row in the hierarchy */
		this._depthMap = new Map()
		this._working = false
		/** Mutation observer that updates the indices etc whenever changes are made by the user */
		this._mutationObserver = new MutationObserver(mutations => {
			//The component should not react to its own mutations, so we need to filter them out
			const validUpdates = []
			const isNodeValid = node => {
				return node instanceof HTMLElement && !node.matches("._kiwi-table-injection")
			}
			mutations.forEach(mutation => {
				mutation.removedNodes.forEach(node => {
					isNodeValid(node) && validUpdates.push(node)
				})
				mutation.addedNodes.forEach(node => {
					isNodeValid(node) && validUpdates.push(node)
				})
			})
			validUpdates.length && this._updateTable()
		})
		this._mutationObserver.observe(this, { attributes: false, childList: true, subtree: true, characterData: false })
	}

	connectedCallback() {
		this._updateTable()
	}

	attributeChangedCallback() {
		this._updateTable()
	}

	_getDivWithClass(classToAdd) {
		const div = document.createElement("div")
		div.classList.add(classToAdd)
		return div
	}

	_explodeRow(childRows, deep) {
		if (childRows) {
			childRows.forEach(child => {
				child.classList.remove("_kiwi-table-imploded")
				if (deep || child.classList.contains("_kiwi-table-open")) {
					this._explodeRow(this._childMap.get(child), deep)
				}
			})
		}
	}

	_implodeRow(childRows, deep) {
		if (childRows) {
			childRows.forEach(child => {
				child.classList.add("_kiwi-table-imploded")
				if (deep) {
					this._implodeRow(this._childMap.get(child), deep)
				}
			})
		}
	}

	explodeAllRows() {
		this._childMap.forEach((value, key) => {
			key.classList.add("_kiwi-table-open")
			this._explodeRow(value)
		})
	}

	implodeAllRows() {
		this._childMap.forEach((value, key) => {
			key.classList.remove("_kiwi-table-open")
			this._implodeRow(value)
		})
	}

	getSelectedRows() {
		return [...this.querySelectorAll("._kiwi-table-selected")].map(tr => tr.getAttribute("kiwi-row-id"))
	}

	clearSelection(dispatchEvent = true) {
		const oldSelection = this.getSelectedRows()
		this.querySelectorAll("._kiwi-table-selected").forEach(tr => {
			tr.classList.remove("_kiwi-table-selected")
			tr.querySelector("._kiwi-table-cell input[type='checkbox']").checked = false
		})
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	selectAllRows(dispatchEvent = true) {
		const oldSelection = this.getSelectedRows()
		this.querySelectorAll("tbody tr").forEach(tr => {
			tr.classList.add("_kiwi-table-selected")
			tr.querySelector("._kiwi-table-cell input[type='checkbox']").checked = true
		})
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	toggleSelection(id, dispatchEvent = true) {
		const oldSelection = this.getSelectedRows()
		const tr = this.querySelector(`tr[kiwi-row-id='${id}']`)
		this._makeSelection(tr)
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	setSelection(idArray, dispatchEvent = true) {
		const oldSelection = this.getSelectedRows()
		this.clearSelection(false)
		this.querySelectorAll("tbody tr").forEach(tr => {
			if (idArray.includes(tr.getAttribute("kiwi-row-id"))) {
				this._makeSelection(tr, false)
			} else {
				this._makeSelection(tr, true)
			}
		})
		dispatchEvent && this._dispatchSelectionEvent(oldSelection)
	}

	filter(fnOrText, columnIndex) {
		if (!fnOrText) {
			this.clearFilter()
			return
		}
		const seenAncestry = new Set()
		this.querySelectorAll("tr").forEach(tr => {
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
				tr.classList.remove("_kiwi-table-filtered-hidden")
				tr.classList.add("_kiwi-table-filtered-visible")
				this._filterShowParentsUpwards(tr, seenAncestry)
			} else {
				tr.classList.add("_kiwi-table-filtered-hidden")
				tr.classList.remove("_kiwi-table-filtered-visible")
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
		this.querySelectorAll("tr").forEach(tr => {
			tr.classList.remove("_kiwi-table-filtered-hidden")
			tr.classList.remove("_kiwi-table-filtered-visible")
		})
	}

	_dispatchSelectionEvent(oldSelection) {
		const newSelection = this.getSelectedRows()
		const added = newSelection.filter(newID => !oldSelection.some(oldID => newID === oldID))
		const removed = oldSelection.filter(oldID => !newSelection.some(newID => oldID === newID))
		const detail = {
			selection: newSelection,
			added,
			removed
		}
		this.dispatchEvent(new CustomEvent("selection", { detail }))
	}

	_makeSelection(tr, shouldRemove) {
		if (typeof shouldRemove !== "boolean") {
			if (tr.classList.contains("_kiwi-table-selected")) {
				shouldRemove = true
			} else {
				shouldRemove = false
			}
		}
		this._updateSelectionOfRow(tr, shouldRemove)
		if (this.getAttribute("selection") === "tree") {
			this._makeSelectionDownwards(tr, shouldRemove)
			this._makeSelectionUpwards(tr)
		}
	}

	_updateSelectionOfRow(tr, shouldRemove) {
		if (shouldRemove) {
			tr.classList.remove("_kiwi-table-selected")
			tr.querySelector("._kiwi-table-cell input[type='checkbox']").checked = false
		} else {
			tr.classList.add("_kiwi-table-selected")
			tr.querySelector("._kiwi-table-cell input[type='checkbox']").checked = true
		}
	}

	_makeSelectionDownwards(tr, shouldRemove) {
		this._updateSelectionOfRow(tr, shouldRemove)
		if (this._childMap.has(tr)) {
			this._childMap.get(tr).forEach(childTR => {
				this._makeSelectionDownwards(childTR, shouldRemove)
			})
		}
	}

	_makeSelectionUpwards(tr) {
		if (this._parentMap.has(tr)) {
			const parent = this._parentMap.get(tr)
			const siblings = this._childMap.get(parent)
			const shouldParentBeSelected = siblings.every(siblingTR => siblingTR.classList.contains("_kiwi-table-selected"))
			let statusChanged = false
			if (shouldParentBeSelected && !parent.classList.contains("_kiwi-table-selected")) {
				this._updateSelectionOfRow(parent, false)
				statusChanged = true
			} else if (!shouldParentBeSelected && parent.classList.contains("_kiwi-table-selected")) {
				this._updateSelectionOfRow(parent, true)
				statusChanged = true
			}
			if (statusChanged) {
				this._makeSelectionUpwards(parent)
			}
		}
	}

	/**
	 * Injects any custom functionality into the provided row.
	 * The function is dependant on the local indices being up to date.
	 * @param {HTMLElement} tr - The row to be processed
	 */
	_renderInjections(tr) {
		//Handle parent structure
		if (this.hasAttribute("showtoggles") && this.getAttribute("showtoggles") !== "false") {
			const parent = this._parentMap.get(tr)
			parent && tr.classList.add("_kiwi-table-imploded")
			const td = document.createElement("td")
			td.classList.add("_kiwi-table-injection")
			const cellDiv = this._getDivWithClass("_kiwi-table-cell")
			const depth = this._depthMap.get(tr)
			if (depth > 0) {
				for (let i = 0; i < depth; i++) {
					cellDiv.appendChild(this._getDivWithClass("_kiwi-table-indent"))
				}
			}
			const arrow = document.createElement("img")
			arrow.classList.add("_kiwi-table-expand-arrow")
			const childRows = this._childMap.get(tr)
			if (!childRows.length) {
				arrow.style.visibility = "hidden"
			} else {
				arrow.addEventListener("click", () => {
					if (tr.classList.contains("_kiwi-table-open")) {
						this._implodeRow(childRows, true)
					} else {
						this._explodeRow(childRows, false)
					}
					tr.classList.toggle("_kiwi-table-open")
				})
			}
			cellDiv.appendChild(arrow)
			const icon = tr.getAttribute("kiwi-row-icon")
			if (typeof icon === "string") {
				const img = document.createElement("img")
				img.classList.add("_kiwi-table-icon")
				if (icon !== "") {
					img.setAttribute("src", icon)
				} else {
					img.style.visibility = "hidden"
				}
				cellDiv.appendChild(img)
			}
			const titleDiv = this._getDivWithClass("_kiwi-table-title")
			const title = tr.getAttribute("kiwi-row-title")
			titleDiv.innerHTML = title
			cellDiv.appendChild(titleDiv)
			td.appendChild(cellDiv)
			tr.prepend(td)
		}
		//Handle selection structure
		if (this.hasAttribute("selection") && this.getAttribute("selection") !== "false") {
			const td = document.createElement("td")
			td.classList.add("_kiwi-table-injection")
			const cellDiv = this._getDivWithClass("_kiwi-table-cell")
			const checkbox = document.createElement("input")
			checkbox.setAttribute("type", "checkbox")
			checkbox.addEventListener("click", () => {
				this.toggleSelection(tr.getAttribute("kiwi-row-id"), true)
			})
			cellDiv.appendChild(checkbox)
			td.appendChild(cellDiv)
			tr.prepend(td)
		}
	}

	/**
	 * Updates the table and all local indices
	 */
	_updateTable() {
		if (this._working) return
		this._working = true
		//Take us out of the flow to speed up all dom updates
		this.style.display = "none"
		//Clear all state
		this._parentMap.clear()
		this._childMap.clear()
		this.clearFilter()
		const table = this.querySelector("table")
		if (!table) {
			this._working = false
			return
		}
		//Create all parent-child mappings and create a lookup table
		const rowMap = new Map()
		const getDepth = (next, depth = 0) => {
			return this._parentMap.has(next) ? getDepth(this._parentMap.get(next), depth + 1) : depth
		}
		Array.from(this.querySelectorAll("tr")).forEach(tr => {
			const id = tr.getAttribute("kiwi-row-id")
			const parentID = tr.getAttribute("kiwi-row-parent-id")
			if (id) {
				rowMap.set(id, tr)
			}
			if (parentID) {
				const parent = rowMap.get(parentID)
				this._parentMap.set(tr, parent)
				this._childMap.get(parent).push(tr)
			}
			this._depthMap.set(tr, getDepth(tr))
			this._childMap.set(tr, [])
		})
		//Clear ny previous injections
		this.querySelectorAll("._kiwi-table-injection").forEach(element => element.remove())
		this.querySelectorAll("._kiwi-table-open").forEach(element => element.classList.remove("_kiwi-table-open"))
		this.querySelectorAll("._kiwi-table-imploded").forEach(element => element.classList.remove("_kiwi-table-imploded"))
		this.querySelectorAll("._kiwi-table-selected").forEach(element => element.classList.remove("_kiwi-table-selected"))
		//Render Injections
		Array.from(this.querySelectorAll("tbody tr")).forEach(tr => this._renderInjections(tr))
		if (this.hasAttribute("selection") && this.getAttribute("selection") !== "false") {
			const theadtr = this.querySelector("thead tr")
			const th = document.createElement("th")
			th.classList.add("_kiwi-table-injection")
			theadtr && theadtr.prepend(th)
		}
		//Handle fixed attribute
		if (this.hasAttribute("fixed")) {
			table.style.tableLayout = "fixed"
			const measurements = this.getAttribute("fixed").split(" ")
			if (measurements.length > 0) {
				const row = this.querySelector("thead") ? this.querySelector("thead tr") : this.querySelector("tbody tr")
				row &&
					Array.from(row.children).forEach((cell, index) => {
						measurements[index] && (cell.style.width = measurements[index])
					})
			}
		} else {
			table.style.removeProperty("tableLayout")
			const row = this.querySelector("thead") ? this.querySelector("thead tr") : this.querySelector("tbody tr")
			row && Array.from(row.children).forEach(cell => cell.style.removeProperty("width"))
		}
		//Apply styles in lightdom
		if (!this.querySelector("style")) {
			const lightdomcss = document.createElement("style")
			lightdomcss.classList.add("_kiwi-table-injection")
			lightdomcss.innerHTML = this._styles
			this.appendChild(document.createComment("__KIWI INJECTED STYLES__"))
			this.appendChild(lightdomcss)
		}
		//Take us back into the flow after completing all operations
		this.style.removeProperty("display")
		this._working = false
	}
}

export { KiwiTableElement }
