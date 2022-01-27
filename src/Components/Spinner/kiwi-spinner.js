import template from "./kiwi-spinner.html"
import styles from "./kiwi-spinner.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Spinner
 * A configurable spinner element to illustrate a loading state.
 * @element kiwi-spinner
 *
 * @attr {integer} size - Size of the spinner in pixels. By default the spinner takes up all space it gets.
 * @attr {integer} percent - Percentage (0-100) loaded. If not set the spinner will go into dynamic mode.
 * @attr {any} usebackground - If set a background will be displayed behind the spinner wheel.
 *
 */
class KiwiSpinner extends HTMLElement {
	static get observedAttributes() {
		return ["size", "percent", "usebackground"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._svgElement = this.shadowRoot.querySelector("svg")
		this._backgroundCircleElement = this.shadowRoot.querySelector("#background-circle")
		this._spinningCircleElement = this.shadowRoot.querySelector("#spinning-circle")
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	_render() {
		if (this.hasAttribute("percent")) {
			this._spinningCircleElement.style.strokeDashoffset = this.getAttribute("percent")
			this._spinningCircleElement.style.animation = "none"
			this._svgElement.style.animation = "none"
		} else {
			this._spinningCircleElement.style.removeProperty("stroke-dashoffset")
			this._spinningCircleElement.style.removeProperty("animation")
			this._svgElement.style.removeProperty("animation")
		}
		if (this.hasAttribute("size")) {
			const size = this.getAttribute("size")
			this._svgElement.style.minWidth = size
			this._svgElement.style.width = size
			this._svgElement.style.minHeight = size
			this._svgElement.style.height = size
		} else {
			this._svgElement.style.removeProperty("min-width")
			this._svgElement.style.removeProperty("width")
			this._svgElement.style.removeProperty("min-height")
			this._svgElement.style.removeProperty("height")
		}
		if (this.hasAttribute("usebackground")) {
			this._backgroundCircleElement.style.removeProperty("display")
		} else {
			this._backgroundCircleElement.style.display = "none"
		}
	}
}

window.customElements.define("kiwi-spinner", KiwiSpinner)
