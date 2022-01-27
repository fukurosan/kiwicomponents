import template from "./kiwi-table.html"
import styles from "./kiwi-table.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Table
 * A kiwi table component.
 * @element kiwi-table
 *
 * @slot - Table markup to generate a table with. Uses kiwi-tr and kiwi-td elements rather than tr and td.
 *
 * @fires selection - Selection events are fired when the selection updates in the table.
 */

class TableElement extends HTMLElement {
	static get observedAttributes() {
		return []
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._tableContainer = this.shadowRoot.querySelector("#main-container")
		this._table = this.shadowRoot.querySelector("table")
		this._thead = this.shadowRoot.querySelector("thead")
		this._tbody = this.shadowRoot.querySelector("tbody")
		this._data = null
		this._mutationObserver = new MutationObserver(mutations => {
			this._setDataByMarkup()
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
			//TODO: Do we need this???
			this._setDataByMarkup()
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {}

	_setDataByMarkup() {
		const data = {
			headers: [],
			rows: []
		}
		Array.from(this.children).forEach(child => {
			if (child.tagName.toUpperCase() === "KIWI-TR") {
				data.rows.push(this._processMarkupTr(child))
			} else if (child.tagName.toUpperCase() === "KIWI-TH") {
				data.headers.push(child.textContent)
			}
		})
		this.data = data
	}

	_processMarkupTr(tr) {
		const row = {}
		tr.hasAttribute("id") && (row.id = tr.getAttribute("id"))
		tr.data && (row.data = tr.data)
		tr.hasAttribute("style") && (row.style = tr.getAttribute("style"))
		tr.hasAttribute("treeText") && (row.treeText = tr.getAttribute("treeText"))
		tr.hasAttribute("treeIcon") && (row.treeIcon = tr.getAttribute("treeIcon"))
		row.cells = []
		row.children = []
		Array.from(tr.children).forEach(child => {
			child.tagName.toUpperCase() === "KIWI-TR" && row.children.push(this._processMarkupTr(child))
			child.tagName.toUpperCase() === "KIWI-TD" && row.cells.push(this._processMarkupChildTd(child))
		})
		return row
	}

	_processMarkupChildTd(td) {
		const cell = {}
		cell.type = "unsafehtml"
		cell.value = td.innerHTML
		td.hasAttribute("colspan") && (cell.colspan = td.getAttribute("colspan"))
		return cell
	}

	_getHeader(value) {
		const th = document.createElement("th")
		th.appendChild(document.createTextNode(value))
		return th
	}

	_processRow(row, depth = 0) {
		const tr = document.createElement("tr")
		row.id && tr.setAttribute("id", row.id)
		row.style && tr.setAttribute("style", row.style)
		row.cells.forEach(cell => {
			const td = this._processCell(cell)
			tr.appendChild(td)
		})
		this._tbody.appendChild(tr)
		if (row.children && row.children.length) {
			row.children.forEach(child => this._processRow(child, depth + 1))
		}
		return tr
	}

	_processCell(cell) {
		const td = document.createElement("td")
		cell.colspan && td.setAttribute("colspan", cell.colspan)
		if (cell.type === "function") {
			td.appendChild(cell.value(cell.data))
		} else if (cell.type === "unsafehtml") {
			td.innerHTML = cell.value
		} else {
			//Default is "text"
			td.appendChild(document.createTextNode(cell.value))
		}
		return td
	}

	_render() {
		if (!this._data) {
			return
		}
		this._thead.innerHTML = ""
		this._tbody.innerHTML = ""
		if (this._data.headers && this._data.headers.length) {
			const row = document.createElement("tr")
			this._data.headers.forEach(header => row.appendChild(this._getHeader(header)))
			this._thead.appendChild(row)
		}
		if (this._data.rows) {
			this._data.rows.forEach(row => this._processRow(row))
		}
	}
}
window.customElements.define("kiwi-table", TableElement)
