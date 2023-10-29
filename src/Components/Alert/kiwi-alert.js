import template from "./kiwi-alert.html"
import styles from "./kiwi-alert.scss"

/**
 * Kiwi Alert
 * Renders a kiwi alert.
 * @element kiwi-alert
 *
 * @attr {any} useclosebutton - If set a close button will be rendered on the alert.
 * @attr {"primary"|"secondary"|"neutral"|"info"|"success"|"error"|"warning"} type - Determines the look and feel.
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
		if (!KiwiAlert._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiAlert._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiAlert._template.content.cloneNode(true))
		const closeButton = this.shadowRoot.querySelector("#close-icon")
		closeButton.addEventListener("click", () => {
			this.dispatchEvent(new CustomEvent("close"))
			this.remove()
		})
	}
}

export { KiwiAlert }
