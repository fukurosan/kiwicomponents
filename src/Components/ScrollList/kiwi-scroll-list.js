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
		this._attachScrollListener(true, this._leftScroll)
		this._attachScrollListener(false, this._rightScroll)
		this._linkContainer.addEventListener("wheel", e => {
			e.preventDefault()
			this._updateScroll(e.deltaY, false)
		})
		let isDown = false
		let lastX = 0
		parent.addEventListener("mousedown", e => {
			isDown = true
			lastX = e.screenX
		})
		parent.addEventListener("mouseup", () => (isDown = false))
		parent.addEventListener("mouseleave", () => (isDown = false))
		parent.addEventListener("mousemove", e => {
			if (isDown) {
				e.preventDefault()
				const delta = e.screenX - lastX
				lastX = e.screenX
				this._updateScroll(-delta, false)
			}
		})
		const resizeObserver = new ResizeObserver(() => this._evaluateArrowVisibility())
		resizeObserver.observe(this)
	}

	connectedCallback() {
		requestAnimationFrame(() => {
			//We cannot do this right inside of connectedCallback.
			//The scrollWidth of the content would just equal the clientWidth.
			this._evaluateArrowVisibility()
		})
	}

	_attachScrollListener(left, arrow) {
		arrow.addEventListener("click", () => {
			this._updateScroll(left ? -110 : 110)
		})
	}

	_evaluateArrowVisibility() {
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

	_updateScroll(delta, smooth = true) {
		if (!smooth) {
			//This is a workaround for an issue in chrome where repeatedly updating scrollBy with scrollBehavior set to smooth will cause updates to be canceled
			this._linkContainer.style.scrollBehavior = "auto"
			this._linkContainer.scrollBy(delta, 0)
			setTimeout(() => {
				this._linkContainer.style.scrollBehavior = null
			}, 1)
		} else {
			this._linkContainer.scrollBy(delta, 0)
		}
		setTimeout(() => this._evaluateArrowVisibility(), 500)
	}
}

export { KiwiScrollListElement }
