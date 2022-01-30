import template from "./kiwi-tabs.html"
import styles from "./kiwi-tabs.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Tab Panel
 * A tab panel that generates tabs and slots content in depending on tab that is selected.
 * @element kiwi-tabs
 *
 * @attr {string} labels - Comma separated list of tab labels
 * @attr {string} active-tab - Currently active tabs
 * @attr {string} disabled-tabs - Currently disabled tabs
 *
 */
class KiwiTabs extends HTMLElement {
	static get observedAttributes() {
		return ["labels", "active-tab", "disabled-tabs"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._mainContainer = this.shadowRoot.querySelector("#container")
		this._buttonContainer = this.shadowRoot.querySelector("#tab-button-container")
		this._slot = this.shadowRoot.querySelector("slot")
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "labels") {
			this._buttonContainer.innerHTML = ""
			const labels = newValue.split(",")
			labels.forEach(label => {
				const button = document.createElement("div")
				button.appendChild(document.createTextNode(label))
				button.classList.add("button")
				button.addEventListener("click", () => {
					if (!button.classList.contains("disabled")) {
						this.setAttribute("active-tab", label)
					}
				})
				button.setAttribute("data-label", label)
				this._buttonContainer.appendChild(button)
			})
			if (!this.hasAttribute("active-tab")) {
				this.setAttribute("active-tab", labels[0])
			}
		} else if (name === "active-tab") {
			this._slot.setAttribute("name", newValue ? newValue : "not-initialized")
			const oldActive = this.shadowRoot.querySelector(`[data-label='${oldValue}']`)
			const newActive = this.shadowRoot.querySelector(`[data-label='${newValue}']`)
			oldValue && oldActive.classList.remove("active")
			newActive && newActive.classList.add("active")
		} else if (name === "disabled-tabs") {
			this.shadowRoot.querySelectorAll(".disabled").forEach(button => button.classList.remove("disabled"))
			if (newValue) {
				newValue.split(",").forEach(label => {
					const button = this.shadowRoot.querySelector(`[data-label='${label}']`)
					if (button) {
						button.classList.add("disabled")
					}
				})
			}
		}
	}
}

window.customElements.define("kiwi-tabs", KiwiTabs)
