import template from "./kiwi-drawer.html"
import styles from "./kiwi-drawer.scss"

/**
 * Drawer Menu
 * A drawer menu element that opens up a side area.
 * @element kiwi-drawer
 *
 * @attr {any} open - If set the drawer menu will open.
 * @attr {string} title - Drawer title (optional).
 * @attr {string} subtitle - Drawer subtitle (optional).
 * @attr {any} usebackdrop - If set to any value adds a clickable backdrop
 * @attr {any} nocloseicon - If set to any value the close button will be disabled
 * @attr {"left"|"right"} direction - The direction from which the drawer opens.
 * @attr {"primary"|"secondary"|"neutral"|"info"|"success"|"error"|"warning"} type - Determines the look and feel of the header. Defaults to "neutral".
 *
 * @fires open - Event that fires when the drawer opens and closes
 */
class KiwiDrawer extends HTMLElement {
	static get observedAttributes() {
		return ["open", "direction", "type", "title", "subtitle", "usebackdrop", "nocloseicon"]
	}

	constructor() {
		super()
		if (!KiwiDrawer._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiDrawer._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiDrawer._template.content.cloneNode(true))
		this.shadowRoot.querySelector("#close-icon").addEventListener("click", () => this.toggleAttribute("open"))
		this.shadowRoot.querySelector("#backdrop-blur").addEventListener("click", () => this.toggleAttribute("open"))
		this.shadowRoot.querySelector("#menu-panel").addEventListener("transitionend", e => {
			;["left", "right"].includes(e.propertyName) && this.dispatchEvent(new CustomEvent("open", { detail: this.hasAttribute("open") }))
		})
		this._titleElement = this.shadowRoot.querySelector("#title")
		this._subtitleElement = this.shadowRoot.querySelector("#subtitle")
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "title") {
			this._updateTitle(newValue)
		}
		if (name === "subtitle") {
			this._updateSubtitle(newValue)
		}
	}

	close() {
		this.removeAttribute("open")
	}

	_updateTitle(text) {
		if (typeof text === "string") {
			this._titleElement.style.display = "block"
			this._titleElement.innerText = text
		} else {
			this._titleElement.style.display = "none"
		}
	}

	_updateSubtitle(text) {
		if (typeof text === "string") {
			this._subtitleElement.style.display = "block"
			this._subtitleElement.innerText = text
		} else {
			this._subtitleElement.style.display = "none"
		}
	}
}

export { KiwiDrawer }
