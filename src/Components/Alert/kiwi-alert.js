import template from "./kiwi-alert.html"
import styles from "./kiwi-alert.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Alert
 * Renders a kiwi alert.
 * @element kiwi-alert
 *
 * @attr {any} useclosebutton - If set a close button will be rendered on the alert.
 *
 * @slot - alert content
 *
 * @event close - Fired when the element is closed by the user
 */
class KiwiAlert extends HTMLElement {
	static get observedAttributes() {
		return ["useclosebutton"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		const closeButton = this.shadowRoot.querySelector("#close-icon")
		closeButton.addEventListener("click", () => {
			this.dispatchEvent(new CustomEvent("close"))
			this.remove()
		})
	}
}

window.customElements.define("kiwi-alert", KiwiAlert)
