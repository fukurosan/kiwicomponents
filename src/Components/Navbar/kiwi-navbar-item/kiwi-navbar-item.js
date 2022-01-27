import template from "./kiwi-navbar-item.html"
import styles from "./kiwi-navbar-item.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Navbar Item
 * A flex layout item that can be used in tandem with the navbar.
 * @element kiwi-navbar-item
 *
 * @attr {"left"|"center"|"right"} justify - Determines how the item should justify its content
 *
 * @slot - The default slot holds all content
 *
 */
class KiwiNavbarItem extends HTMLElement {
	static get observedAttributes() {
		return ["justify"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._containerElement = this.shadowRoot.querySelector("#container")
		this._justifyEnum = Object.freeze({
			LEFT: "flex-start",
			CENTER: "center",
			RIGHT: "flex-end"
		})
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	_render() {
		if (this.hasAttribute("justify")) {
			this._containerElement.style.justifyContent = this._justifyEnum[this.getAttribute("justify").toUpperCase()]
		} else {
			this._containerElement.style.justifyContent = "flex-start"
		}
	}
}

window.customElements.define("kiwi-navbar-item", KiwiNavbarItem)
