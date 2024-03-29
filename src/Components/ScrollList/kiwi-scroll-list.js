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
		this._evaluateArrowVisibility = this._evaluateArrowVisibility.bind(this)
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
		const moveStart = e => {
			isDown = true
			if (e.touches && e.touches[0]) {
				e = e.touches[0]
			}
			lastX = e.screenX
		}
		const move = e => {
			if (isDown) {
				e.preventDefault()
				if (e.touches && e.touches[0]) {
					e = e.touches[0]
				}
				const delta = e.screenX - lastX
				lastX = e.screenX
				this._updateScroll(-delta, false)
			}
		}
		this.addEventListener("mousedown", moveStart)
		this.addEventListener("touchstart", moveStart)
		this.addEventListener("mousemove", move)
		this.addEventListener("touchmove", move)
		this.addEventListener("mouseup", () => (isDown = false))
		this.addEventListener("mouseleave", () => (isDown = false))
		this.addEventListener("touchend", () => (isDown = false))
		const resizeObserver = new ResizeObserver(() => this._evaluateArrowVisibility())
		resizeObserver.observe(this)
	}

	connectedCallback() {
		requestAnimationFrame(() => {
			//We cannot do this right inside of connectedCallback.
			//The scrollWidth of the content would just equal the clientWidth.
			this._evaluateArrowVisibility()
		})
		window.addEventListener("resize", this._evaluateArrowVisibility)
	}

	disconnectedCallback() {
		window.removeEventListener("resize", this._evaluateArrowVisibility)
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
			this._linkContainer.removeProperty("mask")
			this._linkContainer.removeProperty("-webkit-mask")
			return
		}
		let showLeft = true
		let showRight = true
		this._rightScroll.style.removeProperty("display")
		this._leftScroll.style.removeProperty("display")
		if (this._linkContainer.scrollLeft === 0) {
			this._leftScroll.style.display = "none"
			showLeft = false
		} else if (Math.ceil(this._linkContainer.scrollLeft) + this._linkContainer.clientWidth >= this._linkContainer.scrollWidth) {
			this._rightScroll.style.display = "none"
			showRight = false
		}
		const gradient = `linear-gradient(${!showLeft ? "270" : "90"}deg, transparent, white 20%, white ${showLeft && showRight ? "80" : "100"}%, transparent)`
		this._linkContainer.style["mask"] = gradient
		this._linkContainer.style["-webkit-mask"] = gradient
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
