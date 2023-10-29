import template from "./kiwi-burger.html"
import styles from "./kiwi-burger.scss"

/**
 * Kiwi Burger Menu
 * A burger menu element that when clicked opens up a drawer area.
 * @element kiwi-burger
 *
 * @attr {any} open - If set the drawer menu will open.
 *
 */
class KiwiBurgerMenu extends HTMLElement {
	static get observedAttributes() {
		return ["open"]
	}

	constructor() {
		super()
		if (!KiwiBurgerMenu._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiBurgerMenu._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiBurgerMenu._template.content.cloneNode(true))
		this._drawer = this.shadowRoot.querySelector("kiwi-drawer")
		this.shadowRoot.querySelector("#toggle").addEventListener("click", () => this.toggleAttribute("open"))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._drawer.toggleAttribute("open")
	}
}

export { KiwiBurgerMenu }
