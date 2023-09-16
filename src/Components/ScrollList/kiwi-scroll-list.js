import template from "./kiwi-scroll-list.html"
import styles from "./kiwi-scroll-list.scss"

/**
 * Kiwi Scroll List
 * Renders a horizontal list that does scrolls with two arrow buttons when overflowing.
 * @element kiwi-scroll-list
 */
class KiwiScrollListElement extends HTMLElement {
	constructor() {
		super()
		if (!KiwiScrollListElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiScrollListElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiScrollListElement._template.content.cloneNode(true))
		this._container = this.shadowRoot.querySelector("#container")
		this._linkContainer = this.shadowRoot.querySelector("#link-container")
		this._leftScroll = this.shadowRoot.querySelector("#left-scroll")
		this._rightScroll = this.shadowRoot.querySelector("#right-scroll")
		this.attachScrollListener(true, this._leftScroll)
		this.attachScrollListener(false, this._rightScroll)
		const resizeObserver = new ResizeObserver(() => this.evaluateArrowVisibility())
		resizeObserver.observe(this)
	}

	connectedCallback() {
		requestAnimationFrame(() => {
			//We cannot do this right inside of connectedCallback.
			//The scrollWidth of the content would just equal the clientWidth.
			this.evaluateArrowVisibility()
		})
	}

	attachScrollListener(left, arrow) {
		arrow.addEventListener("click", () => {
			this._linkContainer.scrollBy(left ? -80 : 80, 0)
			setTimeout(() => this.evaluateArrowVisibility(), 500)
		})
	}

	evaluateArrowVisibility() {
		if (this._linkContainer.clientWidth === this._linkContainer.scrollWidth) {
			this._leftScroll.style.display = "none"
			this._rightScroll.style.display = "none"
			return
		}
		this._rightScroll.style.removeProperty("display")
		this._leftScroll.style.removeProperty("display")
		if (this._linkContainer.scrollLeft === 0) {
			this._leftScroll.style.display = "none"
		} else if (Math.ceil(this._linkContainer.scrollLeft) + this._linkContainer.clientWidth >= this._linkContainer.scrollWidth) {
			this._rightScroll.style.display = "none"
		}
	}
}

export { KiwiScrollListElement }
