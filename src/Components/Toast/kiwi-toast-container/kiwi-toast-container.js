import template from "./kiwi-toast-container.html"
import styles from "./kiwi-toast-container.scss"

/**
 * Kiwi Toast Container
 * Used as a container for toasts to position them correctly in the viewport. The container will adjust css-parameters that are consumed by the toasts and change animation behaviour based on position.
 * @element kiwi-toast-container
 *
 * @attr {any} top - Should the toast be positioned along the top axis?
 * @attr {any} right - Should the toast be positioned along the right axis?
 * @attr {any} bottom - Should the toast be positioned along the bottom axis?
 * @attr {any} left - Should the toast be positioned along the left axis?
 *
 */
class KiwiToastContainer extends HTMLElement {
	static get observedAttributes() {
		return ["top", "right", "bottom", "left"]
	}

	constructor() {
		super()
		if (!KiwiToastContainer._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiToastContainer._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiToastContainer._template.content.cloneNode(true))

		this._mainContainerElement = this.shadowRoot.querySelector("#main")
		this._render()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this._render()
	}

	_render() {
		//Handle positioning
		if (this.hasAttribute("top") || this.hasAttribute("right") || this.hasAttribute("bottom") || this.hasAttribute("left")) {
			this._mainContainerElement.style.top = this.hasAttribute("top") ? 0 : null
			this._mainContainerElement.style.right = this.hasAttribute("right") ? 0 : null
			this._mainContainerElement.style.bottom = this.hasAttribute("bottom") ? 0 : null
			this._mainContainerElement.style.left = this.hasAttribute("left") ? 0 : null
			//If two opposite directions are both unset we need to provide a default value
			if (!this._mainContainerElement.style.top && !this._mainContainerElement.style.bottom) {
				this._mainContainerElement.style.bottom = 0
			}
			if (!this._mainContainerElement.style.left && !this._mainContainerElement.style.right) {
				this._mainContainerElement.style.left = 0
			}
		} else {
			//By default the notifications will display in the bottom left corner
			this._mainContainerElement.style.top = null
			this._mainContainerElement.style.right = null
			this._mainContainerElement.style.bottom = 0
			this._mainContainerElement.style.left = 0
		}
		//Handle flex direction (new notifications should always be inserted on the vertical side of the stack that touches the viewport)
		if (this._mainContainerElement.style.top) {
			this._mainContainerElement.style.flexDirection = "column-reverse"
		} else {
			this._mainContainerElement.style.flexDirection = "column"
		}
		//Handle direction from which toasts are animated into the frame depending on container positioning
		if (
			this._mainContainerElement.style.top &&
			this._mainContainerElement.style.bottom &&
			this._mainContainerElement.style.left &&
			this._mainContainerElement.style.right
		) {
			this._mainContainerElement.style.removeProperty("--animation-v")
			this._mainContainerElement.style.removeProperty("--animation-h")
		} else if (this._mainContainerElement.style.left && this._mainContainerElement.style.right) {
			this._mainContainerElement.style.removeProperty("--animation-h")
			if (this._mainContainerElement.style.top) {
				this._mainContainerElement.style.setProperty("--animation-v", "-100%")
			} else {
				this._mainContainerElement.style.setProperty("--animation-v", "100%")
			}
		} else {
			this._mainContainerElement.style.removeProperty("--animation-v")
			if (this._mainContainerElement.style.left) {
				this._mainContainerElement.style.setProperty("--animation-h", "-100%")
			} else {
				this._mainContainerElement.style.setProperty("--animation-h", "100%")
			}
		}
	}
}

export { KiwiToastContainer }
