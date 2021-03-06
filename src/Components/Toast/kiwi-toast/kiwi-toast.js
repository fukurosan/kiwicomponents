import template from "./kiwi-toast.html"
import styles from "./kiwi-toast.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`
const DEFAULT_TIMEOUT_LENGTH_MS = 5000

/**
 * Kiwi Toast
 * Kiwi toast notifications. Can be used to display both toasts as well as snackbars.
 * @element kiwi-toast
 *
 * @attr {string} icon - Toast icon (optional).
 * @attr {string} title - Toast title (optional).
 * @attr {string} body - Toast body (optional).
 * @attr {number} timeout - How long before toast toast should remove itself.
 * @attr {"primary"|"secondary"|"neutral"|"info"|"success"|"error"|"warning"} type - Defines what color the toast should be based on.
 * @attr {any} noanimation - If set the toast will not animate
 * @attr {any} noclickclose - If set the toast will not close when clicked
 *
 * @slot - Optional rich toast content.
 *
 * @function delete - Animates the toast and then removes it.
 *
 */
class ToastElement extends HTMLElement {
	static get observedAttributes() {
		return ["icon", "title", "body", "timeout", "type", "noanimation", "noclickclose"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._mainContainerElement = this.shadowRoot.querySelector("#main")
		this._mainContainerElement.addEventListener("click", () => !this.hasAttribute("noclickclose") && this.delete())
		this._iconElement = this.shadowRoot.querySelector("#icon")
		this._titleElement = this.shadowRoot.querySelector("#title")
		this._bodyElement = this.shadowRoot.querySelector("#body")
		this._timeoutMs = DEFAULT_TIMEOUT_LENGTH_MS
		this._timeout = null
	}

	connectedCallback() {
		if (!this.hasAttribute("noanimation")) {
			this._animate(false)
		}
		this._setTimeout()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "icon") {
			this._updateIcon(newValue)
		}
		if (name === "title") {
			this._updateTitle(newValue)
		}
		if (name === "body") {
			this._updateBody(newValue)
		}
		if (name === "timeout") {
			this._updateTimeout(parseInt(newValue))
		}
	}

	_updateIcon(icon) {
		if (icon) {
			this._iconElement.setAttribute("src", icon)
			this._iconElement.style.display = "block"
		} else {
			this._iconElement.removeAttribute("src")
			this._iconElement.style.display = "none"
		}
	}

	_updateTitle(text) {
		if (typeof text === "string") {
			this._titleElement.style.display = "block"
			this._titleElement.innerText = text
		} else {
			this._titleElement.style.display = "none"
		}
	}

	_updateBody(text) {
		if (typeof text === "string") {
			this._bodyElement.style.display = "block"
			this._bodyElement.innerText = text
		} else {
			this._bodyElement.style.display = "none"
		}
	}

	_updateTimeout(time) {
		this._timeoutMs = time
		if (this._timeout) {
			clearTimeout(this._timeout)
			this._setTimeout()
		}
	}

	_setTimeout() {
		this._timeout = setTimeout(() => {
			this.delete()
		}, this._timeoutMs)
	}

	_animate(isReverse) {
		let resolve
		const promise = new Promise(innerResolve => (resolve = innerResolve))
		this._mainContainerElement.style.setProperty("--height", `${this._mainContainerElement.getBoundingClientRect().height}px`)
		if (isReverse) {
			this._mainContainerElement.style.animationDirection = "reverse"
		}
		this._mainContainerElement.style.animationName = "main-animation"
		const handleAnimationEnd = () => {
			this._mainContainerElement.style.removeProperty("animation-name")
			this._mainContainerElement.style.removeProperty("animation-direction")
			this._mainContainerElement.style.removeProperty("--height")
			this._mainContainerElement.removeEventListener("animationend", handleAnimationEnd)
			resolve()
		}
		this._mainContainerElement.addEventListener("animationend", handleAnimationEnd)
		return promise
	}

	async delete() {
		if (!this.hasAttribute("noanimation")) {
			await this._animate(true)
		}
		if (this._timeout) {
			clearTimeout(this._timeout)
		}
		this.remove()
	}
}

window.customElements.define("kiwi-toast", ToastElement)
