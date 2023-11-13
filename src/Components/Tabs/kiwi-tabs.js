import template from "./kiwi-tabs.html"
import styles from "./kiwi-tabs.scss"

/**
 * Kiwi Tab Panel
 * A tab panel that generates a tabbed layout
 * @element kiwi-tabs
 *
 * @attr {number} active-tab-index - Index of the currently active tab
 * @attr {"row"|"column"} direction - Direction of the tab layout
 * @attr {"default"|"popup"|"button"} variant - General look and feel of the tab menu
 * @attr {any} noborder - If set to any value there will be no border separating the tabs and the content below them
 *
 * @fires change - Change event is fired whenever a tab is clicked. The details of the event contains a tabElement reference and an index property of what tab was pressed. Note that this event is not fired when the attribute is manually updated.
 *
 */
class KiwiTabs extends HTMLElement {
	static get observedAttributes() {
		return ["active-tab-index", "direction", "noborder", "variant"]
	}

	constructor() {
		super()
		if (!KiwiTabs._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiTabs._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiTabs._template.content.cloneNode(true))
		this._mainContainer = this.shadowRoot.querySelector("#container")
		this._buttonContainer = this.shadowRoot.querySelector("#tab-button-container")
		this._slider = this.shadowRoot.querySelector("#slider")
		this._slot = this.shadowRoot.querySelector("slot[name]")
		this.addEventListener("click", this._handleClick.bind(this))
		this.shadowRoot.querySelector("slot:not([name])").addEventListener("slotchange", this._updateActiveTab.bind(this))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "active-tab-index") {
			this._slot.setAttribute("name", newValue ? newValue : "not-initialized")
			this._updateActiveTab()
		}
		if (name === "direction") {
			this._updateSelectionSlider()
		}
	}

	_updateActiveTab() {
		const tabs = Array.from(this.querySelectorAll("kiwi-tab"))
		tabs.forEach(tab => tab.removeAttribute("active-tab"))
		const index = this.getAttribute("active-tab-index")
		if (index === null) return
		const newActiveTab = tabs[index]
		newActiveTab && newActiveTab.setAttribute("active-tab", "")
		this._updateSelectionSlider()
	}

	_updateSelectionSlider() {
		const tab = this.querySelector("kiwi-tab[active-tab]")
		if (!tab) return
		if (this.getAttribute("direction") !== "column") {
			this._slider.setAttribute(
				"style",
				`left:${tab.offsetLeft - this._buttonContainer.offsetLeft}px;
			top:${tab.offsetTop - this._buttonContainer.offsetTop + tab.clientHeight - 2}px;
			width:${tab.clientWidth}px;
			height:0.375rem;`
			)
		} else {
			this._slider.setAttribute(
				"style",
				`left:${tab.offsetLeft - this._buttonContainer.offsetLeft + tab.clientWidth - 2}px;
			top:${tab.offsetTop - this._buttonContainer.offsetTop}px;
			width:0.375rem;
			height:${tab.clientHeight}px;`
			)
		}
	}

	_handleClick(e) {
		if (e.target.tagName.toLowerCase() === "kiwi-tab" && !e.target.hasAttribute("disabled")) {
			const tabs = this.querySelectorAll("kiwi-tab")
			const index = Array.from(tabs).indexOf(e.target)
			this.setAttribute("active-tab-index", index)
			this.dispatchEvent(new CustomEvent("change", { detail: { tabElement: e.target, index } }))
		}
	}
}

export { KiwiTabs }
