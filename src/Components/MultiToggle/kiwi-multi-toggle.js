import template from "./kiwi-multi-toggle.html"
import styles from "./kiwi-multi-toggle.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi Multi Toggle
 *
 * A stateful toggle that can switch between multiple options
 * @element kiwi-multi-toggle
 *
 * @attr {{key: string, value: string}[]} states - Labels displayed in the toggle, described through a serialized JSON object
 * @attr {string} selected - Selected option key
 *
 * @function {} getState - Returns the current state
 * @function {{key: string, value: string}} setStates - sets the state to a new selected item
 * @function {{key: string}} setSelected - sets the state to a new selected item
 * 
 * @fires change - The change event is fired whenever the selection changes. The event's detail property contains a newSelection property that holds the key for the new selection.
 */

class KiwiMultiToggle extends HTMLElement {
	static get observedAttributes() {
		return ["states", "selected"]
	}

	constructor() {
		super()
		if (!KiwiMultiToggle._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiMultiToggle._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiMultiToggle._template.content.cloneNode(true))
		this._statesElement = this.shadowRoot.querySelector("#states")
		this._sliderElement = this.shadowRoot.querySelector("#slider")
		/** @type {{key: string, value: string}[]} */
		this._states = []
	}

	getState() {
		return {
			states: JSON.parse(JSON.stringify(this._states)),
			selected: this._statesElement.querySelector(".selected").getAttribute("data-selector")
		}
	}

	setStates(state) {
		this.setAttribute("states", JSON.stringify(state))
	}

	setSelected(key) {
		this._updateSelected(key)
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "states") {
			if (newValue) {
				this._states = JSON.parse(newValue)
			} else {
				this._states = []
			}
			this._renderStates()
		} else if (name === "selected") {
			this._updateSelected(newValue)
		}
	}

	_renderStates() {
		for (const child of this._statesElement.children) {
			if (child.hasAttribute("data-selector")) {
				child.remove()
			}
		}
		if (!this._states.length) {
			return
		}
		this._states.forEach(state => {
			const stateElement = document.createElement("div")
			stateElement.setAttribute("data-selector", state.key)
			stateElement.appendChild(document.createTextNode(state.value))
			stateElement.addEventListener("click", () => {
				this._updateSelected(state.key)
			})
			this._statesElement.appendChild(stateElement)
		})
		this._sliderElement.style.width = `${100 / this._states.length}%`
		if (this.hasAttribute("selected")) {
			this._updateSelected(this.getAttribute("selected"))
		}
	}

	_updateSelected(key) {
		const keyIndex = this._states.findIndex(state => state.key === key)
		this._sliderElement.style.left = `${(100 / this._states.length) * keyIndex}%`
		for (const child of this._statesElement.children) {
			if (child.hasAttribute("data-selector")) {
				if (child.getAttribute("data-selector") === key) {
					child.classList.add("selected")
				} else {
					child.classList.remove("selected")
				}
			}
		}
		this.dispatchEvent(new CustomEvent("change", { detail: { newSelection: key } }))
	}
}

export { KiwiMultiToggle }
