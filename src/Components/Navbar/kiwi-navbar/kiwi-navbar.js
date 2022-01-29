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
 * @attr {"sticky"|"relative"} mode - Determines the display mode of the navbar, "sticky" means it sticks to the top even when scrolling, "relative" means it stays at the top.
 *
 * @slot - Default slot is always visible (prefixed).
 * @slot dynamic(0,1,2,3) - Responsive slots.
 *
 */

class KiwiNavbar extends HTMLElement {
	static get observedAttributes() {
		return ["responsive-breakpoint", "mode"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._container = this.shadowRoot.querySelector("#container")
		this._responsiveSlot = this.shadowRoot.querySelector("#responsive-slot")
		this._blockElement = this.shadowRoot.querySelector("#block-container")
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

	_getCurrentSlot() {
		if (!this.hasAttribute("responsive-breakpoint")) {
			return null
		}
		const breakpoints = this.getAttribute("responsive-breakpoint")
			.split(",")
			.map(number => parseInt(number))
		const ranges = breakpoints.reduce((acc, breakpoint, index) => {
			const start = index === 0 ? 0 : breakpoints[index - 1]
			const end = breakpoint
			acc.push([start, end])
			return acc
		}, [])
		ranges.push([breakpoints[breakpoints.length - 1], Infinity])
		const target = window.innerWidth
		return ranges.findIndex(range => target > range[0] && target < range[1])
	}

	_render() {
		//Handle Mode
		if (this.hasAttribute("mode") && this.getAttribute("mode").toLowerCase() === "sticky") {
			this._blockElement.style.position = "sticky"
		} else {
			this._blockElement.style.removeProperty("position")
		}
		//Handle what content to show (desktop/mobile)
		const currentSlot = this._getCurrentSlot()
		if (currentSlot !== null) {
			this._responsiveSlot.setAttribute("name", currentSlot)
		}
	}
}

window.customElements.define("kiwi-navbar", KiwiNavbar)
