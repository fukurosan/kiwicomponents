import template from "./kiwi-drawer.html"
import styles from "./kiwi-drawer.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Burger Menu
 * A burger menu element that when clicked opens up a drawer area.
 * @element kiwi-drawer
 *
 * @attr {any} open - If set the drawer menu will open.
 * @attr {"left"|"right"} direction - The direction from which the drawer opens.
 *
 */
class KiwiBurgerMenu extends HTMLElement {
	static get observedAttributes() {
		return ["open", "direction"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this.shadowRoot.querySelectorAll(".toggle").forEach(element => element.addEventListener("click", () => this.toggleAttribute("open")))
		this.shadowRoot.querySelector("#backdrop").addEventListener("click", () => this.toggleAttribute("open"))
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	_render() {
		if (this.hasAttribute("open")) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.removeProperty("overflow")
		}
	}
}

window.customElements.define("kiwi-drawer", KiwiBurgerMenu)
