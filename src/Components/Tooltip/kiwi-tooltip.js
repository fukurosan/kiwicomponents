import { MovementObserver } from "../../Utility/MovementObserver"
import { computePositionAdjustment } from "../../Utility/Positioner"
import { TargetObserver } from "../../Utility/TargetObserver"
import template from "./kiwi-tooltip.html"
import styles from "./kiwi-tooltip.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Tooltip
 * A kiwi tooltip. This component creates a tooltip that appears when hovering a given target.
 * @element kiwi-tooltip
 *
 * @attr {"top"|"right"|"bottom"|"left"|"mouse"|"follow"} position - Determines how the tooltip should be positioned relative to the target element.
 * @attr {string} target - Target css selector of element.
 * @attr {number} delay - Delay in ms before the tooltip should be displayed.
 * @attr {string} padding - Padding for the tooltip.
 * @attr {any} noanimation - If provided the tooltip will not animate on insert/remove.
 *
 * @prop {HTMLElement} targetElement - Target for the tooltip element
 *
 * @function updateTarget - Attempts to initialize the tooltip by finding a taget using
 * 1. a provided target attribute,
 * 2. element provided in the target slot,
 * 3. parent element.
 * @function setTargetElementByQuery - Takes a css query as an argument and attempts to set the closest element matching it as the target.
 * Optionally an html element can be provided as a second argument.
 * If provided the tooltip will instead attempt to find a matching target closest to the provided html element.
 *
 * @slot - Default slot handles what should be shown in the tooltip
 * @slot target - The target slot can be used to set a child as a target, without having to provide a css selector.
 */
class TooltipElement extends HTMLElement {
	static get observedAttributes() {
		return ["position", "target", "delay", "padding", "noanimation"]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._mainElement = this.shadowRoot.querySelector("#main")
		this._targetSlotElement = this.shadowRoot.querySelector("slot[name='target']")
		this._targetObserver = new TargetObserver(this, this._targetSlotElement, {
			mouseenter: this._show.bind(this),
			mousemove: this._handleMouseMove.bind(this),
			mouseleave: this._hide.bind(this),
			click: this._hide.bind(this),
			targetRemoved: this.remove()
		})
		this._movementObserver = new MovementObserver()
		this._bodySlotElement = this.shadowRoot.querySelector("slot:not([name])")
		this._currentTransitionListener = null
		this._currentShowTimeout = null
		this._ARROW_SIZE = 6
		this._DEFAULT_DELAY = 0
		this._mainElement.style.setProperty("--arrow-size", `${this._ARROW_SIZE}px`)
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
		} else if (name === "padding") {
			this._updatePadding(newValue)
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

	_updatePadding(newValue) {
		if (newValue) {
			this._mainElement.style.padding = newValue
		} else {
			this._mainElement.style.removeProperty("padding")
		}
	}

	setTargetElementByQuery(query) {
		this._targetObserver.setTargetElementByQuery(query)
	}

	_getDelay() {
		if (this.hasAttribute("delay")) {
			return parseInt(this.getAttribute("delay"))
		}
		return this._DEFAULT_DELAY
	}

	_show(event) {
		//Start the delay timeout for showing the tooltip.
		//In some cases we want the user to hold the cursor steady for a while before it appears.
		//We store a pointer to the timeout in memory so that we can reset it if the mouse moves around inside of the target bounds.
		//I.e. the mouse has to be still for x ms before anything happens.
		this._currentShowTimeout = setTimeout(() => {
			//If the timeout executes it then remove the reference from memory.
			this._currentShowTimeout = null
			//If a removal event has been planned, remove it as well.
			//This occurs when the "hide" animation has been triggered but is not yet finished, and is now interrupted.
			if (this._currentTransitionListener) {
				this._mainElement.removeEventListener("transitionend", this._currentTransitionListener)
			}
			//Show the tooltip (it may already be display block, but that doesn't matter.)
			this._mainElement.style.display = "block"
			setTimeout(() => {
				//After a reflow has occured the tooltip is now guaranteed to the in the dom flow
				//compute the position and trigger the opening animation
				this._computePosition(event)
				this._movementObserver.observe(this._targetObserver.targetElement, this._handleTargetMoved.bind(this))
				this._mainElement.classList.add("visible")
			}, 1)
		}, this._getDelay())
	}

	_hide(event) {
		//If the cursor leaves the target before the tooltip was shown it is up to the hide-listener to cancel the planned animation.
		if (this._currentShowTimeout) {
			this._clearShowTimeout()
		}
		this._movementObserver.disconnect()
		//If the tooltip is visible, trigger an animation, and after the animation has completed take it out of the dom flow.
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

	_handleMouseMove(event) {
		//If the show animation has not executed yet the delay should be reset every time the cursor moves.
		if (this._currentShowTimeout) {
			this._clearShowTimeout()
			this._show(event)
		} else if (this.getAttribute("position") === "follow") {
			//If the position mode is set to follow this event also needs to recompute the position as the cursor moves.
			this._computePosition(event)
		}
	}

	_clearShowTimeout() {
		clearTimeout(this._currentShowTimeout)
		this._currentShowTimeout = null
	}

	_handleTargetMoved(event) {
		if (this.hasAttribute("position") && ["top", "right", "bottom", "left"].includes(this.getAttribute("position"))) {
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
		const preferredPosition = this.hasAttribute("position") ? this.getAttribute("position") : "mouse"
		let leftAdjust = 0
		let topAdjust = 0
		if (this.getAttribute("position") === "top") {
			topAdjust = -this._ARROW_SIZE
		} else if (this.getAttribute("position") === "right") {
			leftAdjust = this._ARROW_SIZE
		} else if (this.getAttribute("position") === "bottom") {
			topAdjust = this._ARROW_SIZE
		} else if (this.getAttribute("position") === "left") {
			leftAdjust = -this._ARROW_SIZE
		}
		const adjustment = computePositionAdjustment(mainElementBCR, targetBCR, preferredPosition, null, event, leftAdjust, topAdjust)
		//Apply new coordinates and dispose of the clone
		this._mainElement.style.left = `${adjustment.x}px`
		this._mainElement.style.top = `${adjustment.y}px`
		this._mainElement.appendChild(this._bodySlotElement)
		clone.remove()
	}
}

window.customElements.define("kiwi-tooltip", TooltipElement)
