import template from "./kiwi-burger-menu.html"
import styles from "./kiwi-burger-menu.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Burger Menu
 * A burger menu element that when clicked opens up a drawer area.
 * @element kiwi-burger-menu
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
		this.shadowRoot.querySelector("#container").addEventListener("click", () => this.toggleAttribute("open"))
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	_render() {
		if (this.hasAttribute("open")) {
			document.documentElement.style.overflow = "hidden"
		} else {
			document.documentElement.style.removeProperty("overflow")
		}
	}
}

window.customElements.define("kiwi-burger-menu", KiwiBurgerMenu)
