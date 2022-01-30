import template from "./kiwi-button.html"
import styles from "./kiwi-button.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Button
 * Renders a kiwi button.
 * @element kiwi-button
 *
 * @attr {any} disabled - If set the button will not fire click events, and will get styled as being disabled.
 * @attr {string} kiwistyle - Custom inline styles to be applied to the internal button element.
 * @attr {string} icon - Optional icon URL.
 * @attr {"before"|"after"} icon-placement - Icon position. Default is "before".
 * @attr {"primary"|"secondary"|"neutral"|"info"|"success"|"error"|"warning"} type - Determines the look and feel of the button. Defaults to "primary".
 * @attr {"small"|"medium"|"large"} size - Determines the size of the button. Defaults to "medium".
 * @attr {"column"|"row"} direction - Determines the direction of the icon and button text (row or column). Default is row.
 * @attr {any} noanimation - If set the button background will not animate from left to right on hover.
 *
 * @slot - Button child elements
 *
 * @function click - Clicks the button
 *
 */
class KiwiButton extends HTMLElement {
	static get observedAttributes() {
		return ["disabled", "kiwistyle", "icon", "icon-placement", "size", "type", "direction", "noanimation"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._mainContainer = this.shadowRoot.querySelector("#container")
		this._iconElement = this.shadowRoot.querySelector("#icon")
		this._slotElement = this.shadowRoot.querySelector("slot")
		this._buttonElement = this.shadowRoot.querySelector("button")
		this._SIZES = Object.freeze({
			SMALL: "0.5em",
			MEDIUM: "0.75em",
			LARGE: "1em"
		})
		//The active selector will not fire for touch input. So we handle this visual effect manually.
		//The reason for not using touchstart and touchend is because user-select:none would cause a conflict.
		this._buttonElement.addEventListener("click", () => {
			this._buttonElement.style.transform = "translateY(2px)"
			setTimeout(() => {
				this._buttonElement.style.removeProperty("transform")
			}, 50)
		})
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	click() {
		this._buttonElement.click()
	}

	_render() {
		//Handle Direction
		this._mainContainer.style.removeProperty("flex-direction")
		this._iconElement.style.removeProperty("min-width")
		this._iconElement.style.removeProperty("width")
		this._iconElement.style.removeProperty("min-height")
		this._iconElement.style.removeProperty("height")
		if (this.hasAttribute("direction") && this.getAttribute("direction").toLowerCase() === "column") {
			this._mainContainer.style.flexDirection = "column"
			this._iconElement.style.minWidth = "1.5em"
			this._iconElement.style.width = "1.5em"
			this._iconElement.style.minHeight = "1.5em"
			this._iconElement.style.height = "1.5em"
		}
		//Handle Icon Display
		this._iconElement.style.removeProperty("display")
		if (this.hasAttribute("icon")) {
			this._iconElement.setAttribute("src", this.getAttribute("icon"))
		} else {
			this._iconElement.style.display = "none"
		}
		if (this.hasAttribute("icon-placement") && this.getAttribute("icon-placement").toLowerCase() === "after") {
			this._mainContainer.appendChild(this._slotElement)
			this._mainContainer.appendChild(this._iconElement)
		} else {
			this._mainContainer.appendChild(this._iconElement)
			this._mainContainer.appendChild(this._slotElement)
		}
		//Handle Animation
		this._buttonElement.classList.remove("animation")
		!this.hasAttribute("noanimation") && this._buttonElement.classList.add("animation")
		//Handle Disabled
		this._buttonElement.classList.remove("disabled")
		this._buttonElement.removeAttribute("disabled")
		if (this.hasAttribute("disabled")) {
			this._buttonElement.classList.add("disabled")
			this._buttonElement.setAttribute("disabled", true)
		}
		//Handle Style
		this._buttonElement.removeAttribute("style")
		this.hasAttribute("kiwistyle") && (this._buttonElement.style = this.getAttribute("kiwistyle"))
		//Handle Type
		this._buttonElement.removeAttribute("type")
		this.hasAttribute("type")
			? this._buttonElement.setAttribute("type", this.getAttribute("type").toLowerCase())
			: this._buttonElement.setAttribute("type", "primary")
		//Handle Size
		this.hasAttribute("size") && (this._buttonElement.style.fontSize = this._SIZES[this.getAttribute("size").toUpperCase()])
	}
}

window.customElements.define("kiwi-button", KiwiButton)
