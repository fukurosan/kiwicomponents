import template from "./kiwi-split.html"
import styles from "./kiwi-split.scss"

/**
 * Kiwi Split Layout Component
 * Creates a container that is split into two parts, with a draggable resizer element in the middle
 * @element kiwi-split
 *
 * @attr direction {"row" | "column"} - Determines of the layout is from left to right ("row") or top to bottom ("column")
 */

export class KiwiSplitElement extends HTMLElement {
	static get observedAttributes() {
		return ["split", "direction"]
	}

	constructor() {
		super()
		if (!KiwiSplitElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiSplitElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiSplitElement._template.content.cloneNode(true))

		this._mainElement = this.shadowRoot.getElementById("main")
		new ResizeObserver(() => {
			//This may appear strange, but it seems to be the easiest way to cover as many sizing scenarios as possible
			this._mainElement.style.width = `${this.clientWidth}px`
			this._mainElement.style.height = `${this.clientHeight}px`
		}).observe(this)

		this._containerOne = this.shadowRoot.getElementById("container-0")
		this._containerTwo = this.shadowRoot.getElementById("container-1")
		this._resizerElement = this.shadowRoot.getElementById("resizer")
		this._resizerElement.addEventListener("mousedown", this._mouseDownHandler.bind(this))
		this._resizerElement.addEventListener("touchstart", this._mouseDownHandler.bind(this))
		this._resizeMoveListener = this._mouseMoveHandler.bind(this)
		this._resizeUpListener = this._mouseUpHandler.bind(this)

		this._lastPosition = 0
		this._isColumnDirection = true
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "split") {
			this.setContainerOneSize(newValue)
		}
	}

	setContainerOneSize(newSize) {
		if (newSize !== null && newSize !== undefined) {
			this._mainElement.style.setProperty("--container-one-size", newSize)
		} else {
			this._mainElement.style.removeProperty("--container-one-size")
		}
	}

	_mouseDownHandler(e) {
		e = this._getProcessableEvent(e)
		this._isColumnDirection = this.getAttribute("direction") !== "row"
		this.addEventListener("mousemove", this._resizeMoveListener)
		this.addEventListener("touchmove", this._resizeMoveListener)
		document.addEventListener("mouseup", this._resizeUpListener)
		document.addEventListener("touchend", this._resizeUpListener)
		this._resizerElement.style.userSelect = "none"
		if (this._isColumnDirection) {
			this.style.cursor = "ns-resize"
			this._lastPosition = e.clientY
		} else {
			this.style.cursor = "ew-resize"
			this._lastPosition = e.clientX
		}
	}

	_mouseUpHandler(e) {
		this._resizerElement.style.removeProperty("userSelect")
		this.removeEventListener("mousemove", this._resizeMoveListener)
		this.removeEventListener("touchmove", this._resizeMoveListener)
		document.removeEventListener("mouseup", this._resizeUpListener)
		document.removeEventListener("touchend", this._resizeUpListener)
		this.style.removeProperty("cursor")
	}

	_mouseMoveHandler(e) {
		e = this._getProcessableEvent(e)
		if (this._isColumnDirection) {
			const fullSize = this.clientHeight
			const containerOneSize = this._containerOne.getBoundingClientRect().height
			const delta = e.clientY - this._lastPosition
			this.setContainerOneSize(`${Math.max(10, Math.min(((containerOneSize + delta) / fullSize) * 100, 90))}%`)
			this._lastPosition = e.clientY
		} else {
			const fullSize = this.clientWidth
			const containerOneSize = this._containerOne.getBoundingClientRect().width
			const delta = e.clientX - this._lastPosition
			this.setContainerOneSize(`${Math.max(10, Math.min(((containerOneSize + delta) / fullSize) * 100, 90))}%`)
			this._lastPosition = e.clientX
		}
	}

	_getProcessableEvent(e) {
		//If this is a touch event we need to extract the touch object
		if (e.touches && e.touches[0]) {
			e.preventDefault()
			e = e.touches[0]
		}
		return e
	}
}
