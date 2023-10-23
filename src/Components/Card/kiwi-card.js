import template from "./kiwi-card.html"
import styles from "./kiwi-card.scss"

/**
 * Kiwi Card
 * A basic card elements that makes creating cards easy.
 * @element kiwi-card
 *
 * @attr {string} icon - Optional image URL, or 0-2 letters for a placeholder
 * @attr {string} title - Card title
 * @attr {string} text - Body text
 * @attr {"vertical" | "horizontal"} direction - Should the card be vertical or horizontal?
 *
 * @slot default - Body content
 **/

class KiwiCard extends HTMLElement {
	static get observedAttributes() {
		return ["title", "text", "icon", "direction"]
	}

	constructor() {
		super()
		if (!KiwiCard._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiCard._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiCard._template.content.cloneNode(true))
		this._iconImageElement = this.shadowRoot.querySelector("#icon-img")
		this._iconPlaceholderElement = this.shadowRoot.querySelector("#icon-placeholder")
		this._titleElement = this.shadowRoot.querySelector("#title")
		this._textElement = this.shadowRoot.querySelector("#text")
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "title") {
			this._updateTitle(newValue)
		}
		if (name === "text") {
			this._updateMessage(newValue)
		}
		if (name === "icon") {
			this._updateIcon(newValue)
		}
	}

	_updateTitle(value) {
		this._titleElement.innerHTML = ""
		if (value) {
			this._titleElement.appendChild(document.createTextNode(value))
		}
	}

	_updateMessage(value) {
		this._textElement.innerHTML = ""
		if (value) {
			this._textElement.appendChild(document.createTextNode(value))
		}
	}

	_updateIcon(value) {
		if (value === null) {
			this._iconImageElement.removeAttribute("src")
			this._iconPlaceholderElement.innerHTML = ""
		} else if (value.length < 3) {
			this._iconImageElement.removeAttribute("src")
			this._iconPlaceholderElement.appendChild(document.createTextNode(value.substring(0, 2).toUpperCase()))
		} else {
			this._iconPlaceholderElement.innerHTML = ""
			this._iconImageElement.setAttribute("src", value)
		}
	}
}

export { KiwiCard }
