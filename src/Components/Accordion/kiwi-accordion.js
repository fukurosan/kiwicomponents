import template from "./kiwi-accordion.html"
import styles from "./kiwi-accordion.scss"

/**
 * Kiwi Accordion
 * A configurable accordion element.
 * @element kiwi-accordion
 *
 * @attr {boolean} open - If set to any value the accordion will open.
 * @attr {string} title - Title for the accordion button.
 * @attr {string} icon - Icon URL for the accordion button.
 *
 */
class KiwiAccordion extends HTMLElement {
	static get observedAttributes() {
		return ["open", "title", "icon"]
	}

	constructor() {
		super()
		if (!KiwiAccordion._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiAccordion._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiAccordion._template.content.cloneNode(true))
		this._panelElement = this.shadowRoot.querySelector("#panel")
		this._textElement = this.shadowRoot.querySelector("#text")
		this._updateTitle(null)
		this._iconElement = this.shadowRoot.querySelector("#icon")
		this._buttonElement = this.shadowRoot.querySelector("button")
		this._buttonElement.addEventListener("click", () => {
			this.toggleAttribute("open")
		})
		this._panelElement.addEventListener("transitionend", () => {
			if (this.hasAttribute("open")) {
				this._panelElement.style.maxHeight = "99999px"
			}
		})
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "open") {
			this._updateOpen()
		} else if (name === "title") {
			this._updateTitle(newValue)
		} else if (name === "icon") {
			this._updateIcon(newValue)
		}
	}

	_updateTitle(newTitle) {
		this._textElement.textContent = newTitle ? newTitle : "N/A"
	}

	_updateIcon(newValue) {
		this._iconElement.setAttribute("src", newValue)
	}

	_updateOpen() {
		if (this.hasAttribute("open")) {
			this._buttonElement.classList.add("active")
			let currentNode = this
			while (currentNode.previousElementSibling?.tagName === "KIWI-ACCORDION") {
				currentNode = currentNode.previousElementSibling
				currentNode.removeAttribute("open")
			}
			currentNode = this
			while (currentNode.nextElementSibling?.tagName === "KIWI-ACCORDION") {
				currentNode = currentNode.nextElementSibling
				currentNode.removeAttribute("open")
			}
			this._panelElement.style.maxHeight = `${this._panelElement.scrollHeight}px`
		} else {
			this._panelElement.style.transition = "unset"
			this._panelElement.style.maxHeight = `${this._panelElement.scrollHeight}px`
			setTimeout(() => {
				this._panelElement.style.transition = null
				this._buttonElement.classList.remove("active")
				this._panelElement.style.maxHeight = null
			}, 10)
		}
	}
}

export { KiwiAccordion }
