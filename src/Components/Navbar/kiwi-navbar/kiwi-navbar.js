import template from "./kiwi-navbar.html"
import styles from "./kiwi-navbar.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Navbar
 * A Kiwi style navbar.
 * @element kiwi-navbar
 *
 * @attr {number} responsive-breakpoint - Viewport width in pixels where the navbar will switch between desktop and mobile.
 * @attr {string} margin - margin to apply to the navbar. Default is 0.
 * @attr {string} padding - padding to apply to the navbar. Default is 0 2em 0 2em.
 * @attr {"sticky"|"relative"} mode - Determines the display mode of the navbar, "sticky" means it sticks to the top even when scrolling, "relative" means it stays at the top.
 * @attr {string} height - Height measurement for the navbar. Default is 100px
 *
 * @slot - Default slot is equal to desktop mode. If no breakpoint is provided this will be used universally in the navbar.
 * @slot desktop - Content for desktop mode.
 * @slot mobile - Content for mobile mode.
 *
 */

class KiwiNavbar extends HTMLElement {
	static get observedAttributes() {
		return ["responsive-breakpoint", "mode", "margin", "padding", "height"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._desktopElement = this.shadowRoot.querySelector("#desktop")
		this._mobileElement = this.shadowRoot.querySelector("#mobile")
		this._blockElement = this.shadowRoot.querySelector("#block-container")
		this._backgroundColour = null
		this._displayMode = "relative"
		this._render = this._render.bind(this)
	}

	connectedCallback() {
		window.addEventListener("resize", this._render)
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	disconnectedCallback() {
		window.removeEventListener("resize", this._render)
	}

	_render() {
		//Handle Mode
		if (this.hasAttribute("mode") && this.getAttribute("mode").toLowerCase() === "sticky") {
			this._blockElement.style.position = "sticky"
		} else {
			this._blockElement.style.removeProperty("position")
		}
		//Handle what content to show (desktop/mobile)
		if (this.hasAttribute("responsive-breakpoint") && parseInt(this.getAttribute("responsive-breakpoint")) > window.innerWidth) {
			this._mobileElement.style.display !== "flex" && (this._mobileElement.style.display = "flex")
			this._desktopElement.style.display = "none"
		} else {
			this._mobileElement.style.display = "none"
			this._desktopElement.style.display = "flex"
		}
		//Apply margin
		if (this.hasAttribute("margin")) {
			const margin = this.getAttribute("margin")
			this._blockElement.style.margin = margin
		} else {
			this._blockElement.style.removeProperty("margin")
		}
		//Apply padding
		if (this.hasAttribute("padding")) {
			const padding = this.getAttribute("padding")
			this._mobileElement.style.padding = padding
			this._desktopElement.style.padding = padding
		} else {
			this._mobileElement.style.removeProperty("padding")
			this._desktopElement.style.removeProperty("padding")
		}
		//Handle height
		if (this.hasAttribute("height")) {
			const height = this.getAttribute("height")
			this._blockElement.style.height = height
		} else {
			this._blockElement.style.removeProperty("height")
		}
	}
}

window.customElements.define("kiwi-navbar", KiwiNavbar)
