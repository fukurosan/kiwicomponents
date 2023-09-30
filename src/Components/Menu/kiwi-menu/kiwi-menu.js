import { MovementObserver } from "../../../Utility/MovementObserver"
import { computePositionAdjustment } from "../../../Utility/Positioner"
import { TargetObserver } from "../../../Utility/TargetObserver"
import template from "./kiwi-menu.html"
import styles from "./kiwi-menu.scss"

/**
 * Kiwi Menu
 * A menu component that can be used to create dropdown menus, context menus or similar components.
 * The menu opens beneath the target when it is clicked with the configured mouse button.
 * @element kiwi-menu
 *
 * @attr {number} top - Adjusts the top position of the menu relative to the target
 * @attr {number} left - Adjusts the left position of the menu relative to the target
 * @attr {"dropdown"|"contextmenu"} mode - Is this a dropdown menu for a contextmenu.
 * @attr {string} target - Target css selector of element.
 * @attr {"start"|"center"|"end"} justify - If set the target's and menu's right borders will align, otherwise their left. Not applicable for "contextmenu" mode.
 * @attr {any} noanimation - If set the element will not be animated.
 *
 * @slot - Menu body.
 * @slot target - Menu will be displayed for component in this slot. Most usable for context meny.
 */
class KiwiMenuElement extends HTMLElement {
	static get observedAttributes() {
		return ["top", "left", "mode", "target", "justify", "noanimation"]
	}

	constructor() {
		super()
		if (!KiwiMenuElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiMenuElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiMenuElement._template.content.cloneNode(true))
		this._mainElement = this.shadowRoot.querySelector("#main")
		this._targetSlotElement = this.shadowRoot.querySelector("slot[name='target']")
		this._targetObserver = new TargetObserver(this, this._targetSlotElement, {
			click: this._showMenu.bind(this)
		})
		this._movementObserver = new MovementObserver()
		this._bodySlotElement = this.shadowRoot.querySelector("slot:not([name])")
		this._currentTransitionListener = null
	}

	set targetElement(newValue) {
		this._targetObserver.targetElement = newValue
	}

	get targetElement() {
		return this._targetObserver.targetElement
	}

	connectedCallback() {
		this._targetObserver.observe()
	}

	disconnectedCallback() {
		this._targetObserver.disconnect()
		this._movementObserver.disconnect()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "target") {
			this._updateTargetQuery(newValue)
		} else if (name === "noanimation") {
			this._updateNoAnimation(newValue)
		} else if (name === "mode") {
			this._updateMode(newValue)
		}
	}

	_updateTargetQuery(newValue) {
		this._targetObserver.query = newValue
		this._targetObserver.updateTarget()
	}

	_updateNoAnimation(newValue) {
		if (newValue !== null) {
			this._mainElement.style.transition = "none"
		} else {
			this._mainElement.style.removeProperty("transition")
		}
	}

	_updateMode(newValue) {
		if (newValue === "contextmenu") {
			this._targetObserver.updateListeners({ contextmenu: this._showMenu.bind(this) })
			this._mainElement.style.transformOrigin = "top left"
		} else {
			this._targetObserver.updateListeners({ click: this._showMenu.bind(this) })
			this._mainElement.style.transformOrigin = "top center"
		}
	}

	setTargetElementByQuery(query) {
		this._targetObserver.setTargetElementByQuery(query)
	}

	_showMenu(event) {
		event.preventDefault()
		if (this.getAttribute("mode") === "contextmenu") {
			event.stopPropagation()
		}
		if (!this._mainElement.classList.contains("visible")) {
			if (this._currentTransitionListener) {
				this._mainElement.removeEventListener("transitionend", this._currentTransitionListener)
			}
			this._mainElement.style.display = "block"
			setTimeout(() => {
				this._computePosition(event)
				this._movementObserver.observe(this._targetObserver.targetElement, this._handleTargetMoved.bind(this))
				this._mainElement.classList.add("visible")
				const closeListener = () => {
					this._hideMenu(event)
					window.removeEventListener("click", closeListener)
				}
				window.addEventListener("click", closeListener)
				if (this.getAttribute("mode") === "contextmenu") {
					const closeListenerContext = () => {
						this._hideMenu(event)
						document.documentElement.removeEventListener("contextmenu", closeListenerContext, true)
					}
					document.documentElement.addEventListener("contextmenu", closeListenerContext, true)
				}
			}, 1)
		} else if (this.getAttribute("mode") === "contextmenu") {
			this._computePosition(event)
		}
	}

	_hideMenu(event) {
		this._movementObserver.disconnect()
		if (this._mainElement.classList.contains("visible")) {
			this._mainElement.classList.remove("visible")
			const onTransitionEnd = () => {
				this._mainElement.style.removeProperty("display")
				this._mainElement.removeEventListener("transitionend", onTransitionEnd)
			}
			this._mainElement.addEventListener("transitionend", onTransitionEnd)
			this._currentTransitionListener = onTransitionEnd
		}
	}

	_handleTargetMoved(event) {
		if (!this.hasAttribute("mode") || this.getAttribute("mode") === "dropdown") {
			this._computePosition()
		}
	}

	_computePosition(event) {
		//In order to not interfere with the transition animation we clone the element
		const clone = this._mainElement.cloneNode()
		clone.style.display = "block"
		clone.style.transition = "none"
		clone.classList.add("visible")
		clone.appendChild(this._bodySlotElement)
		this.shadowRoot.prepend(clone)
		clone.style.left = 0
		clone.style.top = 0
		//Find the optimal position
		const mainElementBCR = clone.getBoundingClientRect()
		const targetBCR = this.targetElement.getBoundingClientRect()
		let adjustment
		if (this.getAttribute("mode") === "contextmenu") {
			adjustment = computePositionAdjustment(mainElementBCR, targetBCR, "mouse", null, event)
		} else {
			let justify = this.getAttribute("justify")
			if (justify !== "end" && justify !== "center") {
				justify = "start"
			}
			adjustment = computePositionAdjustment(mainElementBCR, targetBCR, "bottom", justify, event)
		}
		//Adjust for offsets
		this.hasAttribute("top") && (adjustment.y = adjustment.y + parseInt(this.getAttribute("top")))
		this.hasAttribute("left") && (adjustment.x = adjustment.x + parseInt(this.getAttribute("left")))

		//Apply new coordinates and dispose of the clone
		this._mainElement.style.left = `${adjustment.x}px`
		this._mainElement.style.top = `${adjustment.y}px`
		this._mainElement.appendChild(this._bodySlotElement)
		clone.remove()
	}
}

export { KiwiMenuElement }
