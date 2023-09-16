import template from "./kiwi-tabs.html"
import styles from "./kiwi-tabs.scss"

/**
 * Kiwi Tab Panel
 * A tab panel that generates a tabbed layout
 * @element kiwi-tabs
 *
 * @attr {number} active-tab-index - Index of the currently active tab
 * @attr {"row"|"column"} direction - Direction of the tab layout
 *
 */
class KiwiTabs extends HTMLElement {
	static get observedAttributes() {
		return ["active-tab-index", "direction"]
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
		this._slot = this.shadowRoot.querySelector("slot[name]")
		this.addEventListener("click", this._handleClick.bind(this))
		this.shadowRoot.querySelector("slot:not([name])").addEventListener("slotchange", this._updateActiveTab.bind(this))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "active-tab-index") {
			this._slot.setAttribute("name", newValue ? newValue : "not-initialized")
			this._updateActiveTab()
		}
	}

	_updateActiveTab() {
		const tabs = Array.from(this.querySelectorAll("kiwi-tab"))
		tabs.forEach(tab => tab.removeAttribute("active-tab"))
		const index = this.getAttribute("active-tab-index")
		if (index === null) return
		const newActiveTab = tabs[index]
		newActiveTab && newActiveTab.setAttribute("active-tab", "")
	}

	_handleClick(e) {
		if (e.target.tagName.toLowerCase() === "kiwi-tab" && !e.target.hasAttribute("disabled")) {
			const tabs = this.querySelectorAll("kiwi-tab")
			this.setAttribute("active-tab-index", Array.from(tabs).indexOf(e.target))
		}
	}
}

export { KiwiTabs }
