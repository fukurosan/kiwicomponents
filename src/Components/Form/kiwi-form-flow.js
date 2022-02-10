import template from "./kiwi-form-flow.html"
import styles from "./kiwi-form-flow.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Flex
 * A flex container commonly used for things like forms.
 * @element kiwi-form-flow
 *
 * @attr {"row"|"column"} direction - Direction of the flex container.
 */
class KiwiFlex extends HTMLElement {
	static get observedAttributes() {
		return ["direction", "label"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.shadowRoot.querySelector("label").innerText = newValue
	}
}

window.customElements.define("kiwi-form-flow", KiwiFlex)
