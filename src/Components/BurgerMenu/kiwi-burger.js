import template from "./kiwi-burger.html"
import styles from "./kiwi-burger.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

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
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._drawer = this.shadowRoot.querySelector("kiwi-drawer")
		this.shadowRoot.querySelector("#toggle").addEventListener("click", () => this.toggleAttribute("open"))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._drawer.toggleAttribute("open")
	}
}

window.customElements.define("kiwi-burger", KiwiBurgerMenu)
