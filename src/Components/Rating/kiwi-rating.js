import template from "./kiwi-rating.html"
import styles from "./kiwi-rating.scss"

/**
 * Kiwi Rating Element
 * Generates a star rating element based on radio buttons where the user can provide a rating from 1-5
 *
 * @element kiwi-rating
 *
 * @attr {string} name - Configures the name attribute for the internal radio buttons
 * @attr {any} disabled - If set to any value the rating component will be disabled
 * @attr {1|2|3|4|5} value - Sets the selected amount of stars. Setting any other value removes the selection
 *
 **/
class KiwiRating extends HTMLElement {
	static get observedAttributes() {
		return ["name", "disabled", "value"]
	}

	constructor() {
		super()
		// When the component has mounted it will write the HTML template into it itself, placing it in the light DOM.
		// This makes managing things like form submissions significantly easier.
		this._hasInitialized = false
	}

	connectedCallback() {
		if (!this._hasInitialized) {
			this._init()
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (!this._hasInitialized) {
			this._init()
		}
		if (name === "name") {
			for (const input of this.querySelectorAll("input")) {
				input.setAttribute(name, newValue ? newValue : "rating")
			}
		} else if (name === "disabled") {
			this.querySelectorAll("input").forEach(el => {
				newValue !== null ? el.setAttribute("disabled", "true") : el.removeAttribute("disabled")
			})
		} else if (name === "value") {
			for (const input of this.querySelectorAll("input")) {
				input.checked = input.value == newValue
			}
		}
	}

	_init() {
		this.innerHTML = `<style>${styles}</style>${template}`
		this._hasInitialized = true
	}
}

export { KiwiRating }
