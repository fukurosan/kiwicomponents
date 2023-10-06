import { computePositionAdjustment } from "../../../Utility/Positioner"
import template from "./kiwi-menu-item.html"
import styles from "./kiwi-menu-item.scss"

/**
 * Kiwi Menu Item
 * A menu item designed specifically for kiwi-menus.
 * @element kiwi-menu-option
 *
 * @attr {string} icon - Optional icon. Can be set to a blank value to simply use up the space.
 * @attr {string} text - text value for the item.
 * @attr {string} detail - Detail value for the item.
 * @attr {any} disabled - If set the row will be disabled.
 *
 * @slot - Sub menu items. If provided the sub menu will be shown when this item is hovered.
 * A sub menu typically consists of more nested kiwi-menu-items.
 */
class KiwiMenuItemElement extends HTMLElement {
	static get observedAttributes() {
		return ["icon", "text", "detail", "disabled"]
	}

	constructor() {
		super()
		if (!KiwiMenuItemElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiMenuItemElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiMenuItemElement._template.content.cloneNode(true))
		this._mainContainerElement = this.shadowRoot.querySelector("#main")
		this._iconElement = this.shadowRoot.querySelector("#icon")
		this._textElement = this.shadowRoot.querySelector("#text")
		this._detailElement = this.shadowRoot.querySelector("#detail")
		this._rightArrowElement = this.shadowRoot.querySelector("#right-arrow")
		this._submenuContainerElement = this.shadowRoot.querySelector("#submenu")
		this._submenuSlotElement = this.shadowRoot.querySelector("slot")
		this._submenuSlotElement.addEventListener("slotchange", this._handleSubMenuChanged.bind(this))
		this._mainContainerElement.addEventListener("click", this._handleDisabledClick.bind(this))
		this._mainContainerElement.addEventListener("mouseenter", this._computePosition.bind(this))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "icon") {
			this._updateIcon(newValue)
		} else if (name === "text") {
			this._updateText(newValue)
		} else if (name === "detail") {
			this._updateDetail(newValue)
		}
	}

	_updateIcon(newValue) {
		if (newValue || newValue === "") {
			this._iconElement.setAttribute("src", newValue)
		} else {
			this._iconElement.removeAttribute("src")
		}
	}

	_updateText(newValue) {
		this._textElement.innerHTML = ""
		newValue && this._textElement.appendChild(document.createTextNode(newValue))
	}

	_updateDetail(newValue) {
		this._detailElement.innerHTML = ""
		newValue && this._detailElement.appendChild(document.createTextNode(newValue))
	}

	_handleDisabledClick(e) {
		if (this.hasAttribute("disabled")) {
			e.preventDefault()
			e.stopPropagation()
		}
	}

	_handleSubMenuChanged(e) {
		if (this.querySelector("*")) {
			this._rightArrowElement.style.display = "block"
			this._mainContainerElement.classList.add("has-submenu")
		} else {
			this._rightArrowElement.style.removeProperty("display")
			this._mainContainerElement.classList.remove("has-submenu")
		}
	}

	_computePosition(e) {
		if (!this.querySelector("*")) return
		const clone = this._submenuContainerElement.cloneNode()
		clone.style.transition = "none"
		clone.style.transform = "none"
		clone.style.top = 0
		clone.style.left = 0
		clone.appendChild(this._submenuSlotElement)
		this._mainContainerElement.insertBefore(clone, this._submenuContainerElement)
		//Find the optimal position adjustment
		const mainElementBCR = clone.getBoundingClientRect()
		const targetBCR = this._mainContainerElement.getBoundingClientRect()
		let adjustment
		//If the entire submenu cannot fit to the right (default) but it can fully fit to the left, then put it to the left instead.
		const margin = window.getComputedStyle(clone).margin
		const marginInt = parseInt(margin.substring(0, margin.indexOf("px")))
		if (mainElementBCR.x + mainElementBCR.width + targetBCR.width > window.innerWidth && mainElementBCR.x - mainElementBCR.width > 0) {
			adjustment = computePositionAdjustment(mainElementBCR, targetBCR, "left", "start", null, null, marginInt)
			this._submenuContainerElement.classList.add("reversed")
		} else {
			adjustment = computePositionAdjustment(mainElementBCR, targetBCR, "right", "start", null, null, marginInt)
			this._submenuContainerElement.classList.remove("reversed")
		}
		//Apply new coordinates and dispose of the clone
		this._submenuContainerElement.style.left = `${adjustment.x}px`
		this._submenuContainerElement.style.top = `${adjustment.y}px`
		this._submenuContainerElement.appendChild(this._submenuSlotElement)
		clone.remove()
	}
}

export { KiwiMenuItemElement }
