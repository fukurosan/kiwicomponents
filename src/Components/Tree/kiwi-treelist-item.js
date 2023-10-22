import template from "./kiwi-treelist-item.html"
import styles from "./kiwi-treelist-item.scss"

/**
 * Kiwi Tree List Item
 * Renders a tree list. If a list item is placed inside of another list item then this creates a second, nested level.
 * @element kiwi-treelist-item
 *
 * @attr {any} open - If set the item will explode its content
 * @attr {string} text - The text of the tree item
 * @attr {string} icon - An icon URL. If set to an empty string an empty icon will be added.
 * @attr {any} interactive - If set then exploding/imploding will only occur when clicking the arrow, rather than the whole item.
 * @attr {any} selected - If set the item will be styled as selected
 *
 * @slot - Default slot is used to nest list items hierarchically
 */
class KiwiTreeListItem extends HTMLElement {
	static get observedAttributes() {
		return ["open", "text", "icon", "interactive", "selected"]
	}

	constructor() {
		super()
		if (!KiwiTreeListItem._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiTreeListItem._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiTreeListItem._template.content.cloneNode(true))
		this._mainContainer = this.shadowRoot.querySelector("#main")
		this._rowContainer = this.shadowRoot.querySelector("#content")
		this._expandArrow = this.shadowRoot.querySelector("#expand-arrow")
		this._handleExpandToggle = this._handleExpandToggle.bind(this)
		this._isVisible = false
		this._rowContainer.addEventListener("click", this._handleExpandToggle)
		this.shadowRoot.querySelector("slot").addEventListener("slotchange", this._evaluateHasChildren.bind(this))
	}

	connectedCallback() {
		const depth = this.getHierarchyParentChain().length
		if (depth) {
			this._mainContainer.classList.remove("root")
			this._mainContainer.style.paddingLeft = null
			this._isVisible = this.parentElement.hasAttribute("open")
			if (!this._isVisible) {
				this._mainContainer.style.height = "0px"
			}
		} else {
			this._mainContainer.classList.add("root")
			this._isVisible = true
			this._mainContainer.style.paddingLeft = "0px"
		}
		this._evaluateHasChildren()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "icon") {
			const iconElement = this.shadowRoot.querySelector("#icon")
			if (newValue === "") {
				iconElement.classList.add("icon-visible")
				iconElement.setAttribute("src", "data:image/svg+xml;utf-8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg'></svg>")
			} else if (newValue !== null) {
				iconElement.setAttribute("src", newValue)
				iconElement.classList.add("icon-visible")
			} else {
				iconElement.classList.remove("icon-visible")
			}
		}
		if (name === "text") {
			this.shadowRoot.querySelector("#text").textContent = this.getAttribute("text")
		}
		if (name === "interactive") {
			if (newValue !== null) {
				this._rowContainer.removeEventListener("click", this._handleExpandToggle)
				this._expandArrow.addEventListener("click", this._handleExpandToggle)
			} else {
				this._expandArrow.removeEventListener("click", this._handleExpandToggle)
				this._rowContainer.addEventListener("click", this._handleExpandToggle)
			}
		}
		if (name === "open") {
			this.getHierarchyChildren().forEach(element => {
				element._toggleVisible()
			})
		}
	}

	getHierarchyParentChain() {
		const parentChain = []
		let parent = this.parentElement
		while (parent) {
			if (parent.tagName.toUpperCase() === "KIWI-TREELIST-ITEM") parentChain.push(parent)
			parent = parent.parentElement
		}
		return parentChain
	}

	getHierarchyChildren() {
		return Array.from(this.children).reduce((acc, child) => {
			if (child.tagName.toUpperCase() === "KIWI-TREELIST-ITEM") acc.push(child)
			return acc
		}, [])
	}

	_evaluateHasChildren() {
		if (this.getHierarchyChildren().length) {
			this._mainContainer.classList.add("has-children")
		} else {
			this._mainContainer.classList.remove("has-children")
		}
	}

	_handleExpandToggle() {
		this.hasAttribute("open") ? this.removeAttribute("open") : this.setAttribute("open", "")
	}

	_toggleVisible() {
		const listener = () => {
			if (this._isVisible) this._mainContainer.style.height = "auto"
			this._mainContainer.removeEventListener("transitionend", listener)
		}
		if (this._mainContainer.style.height === "0px") {
			const height = this._mainContainer.scrollHeight
			this._mainContainer.style.height = `${height}px`
			this._mainContainer.style.opacity = 1
			this._isVisible = true
			this._mainContainer.addEventListener("transitionend", listener)
		} else if (!this._mainContainer.style.height) {
			this._mainContainer.style.height = "auto"
			this._mainContainer.style.opacity = 1
			this._isVisible = true
		} else {
			this._mainContainer.style.height = `${this._mainContainer.scrollHeight}px`
			setTimeout(() => {
				this._isVisible = false
				this._mainContainer.style.height = 0
				this._mainContainer.style.opacity = 0
				this._mainContainer.addEventListener("transitionend", listener)
			}, 10)
		}
	}
}

export { KiwiTreeListItem }
