import template from "./kiwi-window.html"
import styles from "./kiwi-window.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * Kiwi dialog window
 * A window that can be opened within the browser viewport. Can work either as a dialog or a modal.
 * @element kiwi-window
 *
 * @attr {boolean} footer - If set to any value the footer will be rendered.
 * @attr {boolean} useminimizable - If set to any value the minimize button will be added to the header.
 * @attr {boolean} usemaximizable - If set to any value the maximize button will be added to the header and double clicking the header will maximize the window.
 * @attr {boolean} useclosebutton - If set to any value the close button will be added to the header.
 * @attr {boolean} usedraggable - If set to any value the window will be dragable.
 * @attr {boolean} useresizable - If set to any value the window will be resizable.
 * @attr {boolean} usecentered - If set to any value the window will be centered in the viewport. If set to scroll the page will scroll instead of the body.
 * @attr {boolean} useautosize - If set to any value the window will automatically adjust its size to its content and the viewport.
 * @attr {"none"|"clickable"|"disabled"} modality - configures the backdrop of the window.
 * @attr {"none"|"compact"|"small"|"medium"|"large"} scale - Determines the general dimensions of the window's sections.
 * @attr {string} title - Header text.
 * @attr {string} icon - Header icon.
 * @attr {boolean} noanimation - If set to any value no animations will take place.
 *
 * @function close - Will close the window
 * @function minimize - Will hide the window
 * @function isMinimized - Returns true of the window is minimized
 * @function reset - Will show the window
 * @function maximize - toggles the window size between the original size and the maximize size
 * @function isMaximized - Returns true if the window is maximized
 * @function bringToFront - Brings the window in front
 * @function setPosition - Sets the position of the window
 * @function setSize - Sets the size of the window. Can be either integer (pixel) or string.
 * @function scaleToFit - Auto-sizes the window based on its content.
 * @function center - Centers the window in the viewport.
 *
 * @slot - body
 * @slot header - Header Content
 * @slot footer - Footer Content
 *
 * @fires close - Sent when the window is closed.
 *
 */

class WindowElement extends HTMLElement {
	static get observedAttributes() {
		return [
			"footer",
			"useminimizable",
			"usemaximizable",
			"useclosebutton",
			"usedraggable",
			"useresizable",
			"usecentered",
			"modality",
			"scale",
			"title",
			"icon",
			"noanimation"
		]
	}

	constructor() {
		super()
		this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
		this._backdropElement = this.shadowRoot.querySelector("#backdrop-blur")
		this._windowElement = this.shadowRoot.querySelector("#window")
		this._headerElement = this.shadowRoot.querySelector("#header")
		this._headerTextElement = this.shadowRoot.querySelector("#header-text")
		this._headerIconElement = this.shadowRoot.querySelector("#header-icon")
		this._minimizeIconElement = this.shadowRoot.querySelector("#minimize-icon")
		this._maximizeIconelement = this.shadowRoot.querySelector("#maximize-icon")
		this._headerButtonsContainerElement = this.shadowRoot.querySelector("#header-buttons")
		this._closeIconElement = this.shadowRoot.querySelector("#close-icon")
		this._bodyElement = this.shadowRoot.querySelector("#body")
		this._footerElement = this.shadowRoot.querySelector("#footer")
		this._resizerElements = this.shadowRoot.querySelectorAll(".resizer")

		//Init Icons
		this._minimizeIconElement.addEventListener("click", this.minimize.bind(this))
		this._maximizeIconelement.addEventListener("click", this.maximize.bind(this))
		this._closeIconElement.addEventListener("click", this.close.bind(this))

		//Init minimize-related
		this._xPosition = 0
		this._yPosition = 0
		this._updateMinimizedPositions = this._updateMinimizedPositions.bind(this) //Fired on window resize, so we bind it here
		this._headerElement.addEventListener("click", () => this.isMinimized() && this.minimize(), true)

		//Init header double click handler
		this._lastHeaderClickTimestamp = -Infinity
		this._headerElement.addEventListener("click", () => {
			if (!this.hasAttribute("usemaximizable")) {
				return
			}
			//The reason for not using a dblclick listener is because the browser doesn't care if both clicks
			//were on the same element. This way we ensure the window header was actually what received both clicks.
			if (Date.now() - this._lastHeaderClickTimestamp < 300) {
				this.maximize()
				this._lastHeaderClickTimestamp = -Infinity
			} else {
				this._lastHeaderClickTimestamp = Date.now()
			}
		})

		//Keeps track of if the initial(!) mount has taken place.
		//When the component is initially mounted it will center and auto-size itself.
		this._hasMounted = false

		//Should the window close when the backdrop is clicked?
		this._backdropElement.addEventListener("click", () => {
			if (this.getAttribute("modality") !== "disabled") {
				this.close()
			}
		})

		//Init drag handler
		this._dragX = 0
		this._dragY = 0
		this._MINIMUM_VISIBLE_SPACE = 50
		this._headerElement.addEventListener("mousedown", this._initDrag.bind(this), true)
		this._headerElement.addEventListener("touchstart", this._initDrag.bind(this), true)

		//Init bringToFrontListener
		this._windowElement.addEventListener("mousedown", this.bringToFront.bind(this), false)
		this._windowElement.addEventListener("touchstart", this.bringToFront.bind(this), false)

		//Init resizer
		this._MINIMUM_WIDTH = 150
		this._MINIMUM_HEIGHT = 150
		this._resizerElements.forEach(element => element.addEventListener("mousedown", this._resize.bind(this), true))
		this._resizerElements.forEach(element => element.addEventListener("touchstart", this._resize.bind(this), true))
	}

	connectedCallback() {
		if (!this._hasMounted) {
			this._hasMounted = true
			requestAnimationFrame(() => {
				this.scaleToFit()
				this.center()
				this._animate(false)
				/*
				const preferredHeaderWithColor = computePreferredForegroundColor(this._headerElement)
				if (preferredHeaderWithColor === "black") {
					this._headerButtonsContainerElement.style.filter = "invert()"
				}
				this._headerTextElement.style.color = preferredHeaderWithColor
				*/
			})
		}
		window.addEventListener("resize", this._updateMinimizedPositions)
	}

	disconnectedCallback() {
		window.removeEventListener("resize", this._updateMinimizedPositions)
		this.isMinimized() && this._updateMinimizedPositions()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "title") {
			this._updateHeaderText(newValue)
		} else if (name === "icon") {
			this._updateIcon(newValue)
		} else if (name === "noanimation") {
			this._updateNoAnimation(newValue)
		}
	}

	_updateHeaderText(newValue) {
		this._headerTextElement.innerHTML = ""
		this._headerTextElement.style.removeProperty("display")
		if (newValue) {
			this._headerTextElement.appendChild(document.createTextNode(newValue))
			this._headerTextElement.style.display = "initial"
		}
	}

	_updateIcon(newValue) {
		if (newValue || newValue === "") {
			this._headerIconElement.setAttribute("src", newValue)
		} else {
			this._headerIconElement.removeAttribute("src")
		}
	}

	_updateNoAnimation(newValue) {
		if (newValue !== null) {
			this._windowElement.classList.add("noanimation")
		} else {
			this._windowElement.classList.remove("noanimation")
		}
	}

	_animate(isReverse) {
		let resolve
		const promise = new Promise(innerResolve => (resolve = innerResolve))
		if (isReverse) {
			this._windowElement.style.animationDirection = "reverse"
		}
		this._windowElement.style.animationName = "main-animation"
		const handleAnimationEnd = () => {
			this._windowElement.style.removeProperty("animation-name")
			this._windowElement.style.removeProperty("animation-direction")
			this._windowElement.removeEventListener("animationend", handleAnimationEnd)
			resolve()
		}
		this._windowElement.addEventListener("animationend", handleAnimationEnd)
		return promise
	}

	/**
	 * Bring this window to the front. This is done by prepending all other children of the parent element,
	 * making this the last one. The reason for not just appending this one is that it can cause issues with
	 * focus as well as other events that may end up not firing.
	 * When the windows are prepended scroll positions are stored and recreated.
	 */
	bringToFront() {
		if (this.parentElement.lastChild === this) {
			return
		}
		const findShadowRootElements = (element, acc) => {
			if (element.shadowRoot?.querySelectorAll) {
				element.shadowRoot.querySelectorAll("*").forEach(shadowRootElement => {
					acc.push(shadowRootElement)
					findShadowRootElements(shadowRootElement, acc)
				})
			}
		}
		const elements = Array.from(this.querySelectorAll("*")).reduce((acc, element) => {
			acc.push(element)
			findShadowRootElements(element, acc)
			return acc
		}, [])
		const originalScrollPositions = elements.map(element => [element.scrollLeft, element.scrollTop])
		this.parentElement.appendChild(this)
		elements.forEach((element, index) => {
			element.scrollLeft = originalScrollPositions[index][0]
			element.scrollTop = originalScrollPositions[index][1]
		})
		document.activeElement && document.activeElement.blur()
		if (this.isMinimized()) {
			this.minimize()
		}
	}

	/**
	 * Manually sets the position for the window.
	 * @param {number|string} left - New X position
	 * @param {number|string} top  - New Y position
	 */
	setPosition(left, top) {
		this._windowElement.style.left = typeof left === "string" ? left : `${left}px`
		this._windowElement.style.top = typeof top === "string" ? top : `${top}px`
		this._xPosition !== left && (this._xPosition = left)
		this._yPosition !== top && (this._yPosition = top)
	}

	/**
	 * Manually sets the height for the window.
	 * @param {number|string} width - New Width
	 * @param {number|string} height - New Height
	 */
	setSize(width, height) {
		this._windowElement.style.height = typeof height === "string" ? height : `${height}px`
		this._windowElement.style.width = typeof width === "string" ? width : `${width}px`
	}

	/**
	 * Attempts to set the window size based on the content inside.
	 */
	scaleToFit() {
		//Attempt to determine a optimal size for the window
		const maxWidth = Math.ceil(document.documentElement.clientWidth * 0.8)
		const maxHeight = Math.ceil(document.documentElement.clientHeight * 0.8)
		const boundingClientRect = this._windowElement.getBoundingClientRect()
		const currentWidth = Math.ceil(boundingClientRect.width)
		const currentHeight = Math.ceil(boundingClientRect.height)
		const newWindowWidth = Math.min(maxWidth, currentWidth)
		const newWindowHeight = Math.min(maxHeight, currentHeight)
		this._windowElement.style.width = `${newWindowWidth}px`
		this._windowElement.style.height = `${newWindowHeight}px`
	}

	/**
	 * Centers the window in the viewport
	 */
	center() {
		const boundingClientRect = this._windowElement.getBoundingClientRect()
		const x = document.body.clientWidth / 2 - boundingClientRect.width / 2
		const y = window.innerHeight / 2 - boundingClientRect.height / 2
		this.setPosition(x, y)
	}

	/**
	 * Toggles the minimized state. Optionally a boolean can be provided to set a specific state.
	 * @param {boolean} shouldMinimize - Force a state
	 */
	minimize(shouldMinimize) {
		if (shouldMinimize === this.isMinimized()) {
			return
		}
		if (!this.isMinimized()) {
			this._windowElement.classList.add("minimized")
			this._windowElement.style.top = `${window.innerHeight - this._windowElement.clientHeight}px`
			//Some (mobile) browsers change their viewport size when their UI is being displayed
			//This is on purpose, and for a variety of reasons. Unfortunately it means that "bottom: 0" will not work
			//and that we must recompute the coordinates every time the viewport size changes.
			this._adjustSizeListener = () => {
				this._windowElement.style.top = `${window.innerHeight - this._windowElement.clientHeight}px`
			}
			window.addEventListener("resize", this._adjustSizeListener)
			this._updateMinimizedPositions()
		} else {
			this._windowElement.classList.remove("minimized")
			this._windowElement.style.removeProperty("max-width")
			window.removeEventListener("resize", this._adjustSizeListener)
			delete this._adjustSizeListener
			this.setPosition(this._xPosition, this._yPosition)
			this._updateMinimizedPositions()
		}
	}

	/**
	 * Is the window minimized?
	 */
	isMinimized() {
		return this._windowElement.classList.contains("minimized")
	}

	/**
	 * Updates the position and sizes of all minimized windows currently in the viewport
	 */
	_updateMinimizedPositions() {
		const minimizedWindows = Array.from(document.querySelectorAll("kiwi-window"))
			.reduce((acc, dialog) => {
				if (dialog !== this) {
					if (dialog.isMinimized()) {
						acc.push(dialog.shadowRoot.querySelector("#window"))
					}
				}
				return acc
			}, [])
			.sort((a, b) => parseFloat(a.style.left.replace("px", "")) - parseFloat(b.style.left.replace("px", "")))
		this.isMinimized() && minimizedWindows.push(this._windowElement)
		const sizePerUnit = Math.min(window.innerWidth / minimizedWindows.length, 250)
		minimizedWindows.forEach((dialog, index) => {
			dialog.style.maxWidth = `${sizePerUnit}px`
			dialog.style.left = `${index * sizePerUnit}px`
		})
	}

	/**
	 * Toggles the maximized state. Optionally a boolean can be provided to set a specific state.
	 * @param {boolean} shouldMaximize - Force a state
	 */
	maximize(shouldMaximize) {
		if (shouldMaximize === this.isMaximized()) {
			return
		}
		this._windowElement.classList.toggle("maximized")
	}

	/**
	 * Is the window maximized?
	 */
	isMaximized() {
		return this._windowElement.classList.contains("maximized")
	}

	/**
	 * Closes the window with the proper close animation.
	 */
	close(event) {
		event && event.preventDefault()
		this._animate(true).then(() => this.remove())
		this.dispatchEvent(new CustomEvent("close"))
	}

	/**
	 * Resets the maximized and minimized state of the window.
	 * @param {boolean} shouldResetMinimized
	 * @param {boolean} shouldResetMaximized
	 */
	reset(shouldResetMinimized = true, shouldResetMaximized = true) {
		shouldResetMaximized && this._windowElement.classList.remove("maximized")
		shouldResetMinimized && this._windowElement.classList.remove("minimized")
		this.setPosition(this._xPosition, this._yPosition)
	}

	/**
	 * Initializer function for when a user attempts to drag the window
	 */
	_initDrag(event) {
		if (!this.hasAttribute("usedraggable") || this.isMinimized()) {
			return
		}
		//If this is a touch event we need to extract the touch object
		if (event.touches && event.touches[0]) {
			event = event.touches[0]
		} else {
			//If its not a touch event we must prevent the default action of the event, or dragging the button icons will cause problems.
			event.preventDefault()
		}
		//We store the initial cursor coordinates to be able to compute the delta movement.
		//This is because the cursor position is not necessarily equal to the left position of the window.
		this._dragX = event.clientX
		this._dragY = event.clientY
		//We need to turn off transitions for the window if(!) a drag occurs, but not otherwise.
		const handleDragStateActivation = () => {
			this._windowElement.classList.add("drag")
			window.removeEventListener("mousemove", handleDragStateActivation)
			window.removeEventListener("touchmove", handleDragStateActivation)
		}
		const handleMouseMove = this._drag.bind(this)
		const handleMouseUp = () => {
			this._windowElement.classList.remove("drag")
			window.removeEventListener("mousemove", handleDragStateActivation)
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("touchmove", handleDragStateActivation)
			window.removeEventListener("touchmove", handleMouseMove)
		}
		window.addEventListener("mousemove", handleDragStateActivation)
		window.addEventListener("mousemove", handleMouseMove)
		window.addEventListener("mouseup", handleMouseUp)
		window.addEventListener("touchmove", handleDragStateActivation, { passive: false })
		window.addEventListener("touchmove", handleMouseMove, { passive: false })
		window.addEventListener("touchend", handleMouseUp)
	}

	/**
	 * Executed when the user drags the window (on mousemove)
	 */
	_drag(event) {
		if (!this.hasAttribute("usedraggable")) {
			return
		}
		if (this.isMaximized()) {
			this._windowElement.classList.remove("maximized")
			this.setPosition(event.clientX - this._windowElement.clientWidth / 2, 0)
		}
		event.preventDefault()
		if (event.touches && event.touches[0]) {
			event = event.touches[0]
		}
		const dragXDelta = event.clientX - this._dragX
		const dragYDelta = event.clientY - this._dragY
		this._dragX = event.clientX
		this._dragY = event.clientY
		const x = Math.min(
			Math.max(-this._windowElement.clientWidth + this._MINIMUM_VISIBLE_SPACE, this._windowElement.offsetLeft + dragXDelta),
			window.innerWidth - this._MINIMUM_VISIBLE_SPACE
		)
		const y = Math.min(Math.max(0, this._windowElement.offsetTop + dragYDelta), window.innerHeight - this._MINIMUM_VISIBLE_SPACE)
		this.setPosition(x, y)
	}

	/**
	 * Executed when the user attempts to resize the window
	 */
	_resize(event) {
		event.preventDefault()
		const isTop = event.target.matches(".top")
		const isRight = event.target.matches(".right")
		const isBottom = event.target.matches(".bottom")
		const isLeft = event.target.matches(".left")
		const isReverseX = isLeft
		const isReverseY = isTop
		const shouldMoveX = isLeft || isRight
		const shouldMoveY = isTop || isBottom

		this._windowElement.style.transition = "none"
		const originalWidth = parseFloat(getComputedStyle(this._windowElement, null).getPropertyValue("width").replace("px", ""))
		const originalHeight = parseFloat(getComputedStyle(this._windowElement, null).getPropertyValue("height").replace("px", ""))
		if (event.touches && event.touches[0]) {
			event = event.touches[0]
		}
		const originalMouseX = event.pageX
		const originalMouseY = event.pageY

		const resize = event => {
			if (event.touches && event.touches[0]) {
				event = event.touches[0]
			}
			const width = isReverseX ? originalWidth - (event.pageX - originalMouseX) : originalWidth + (event.pageX - originalMouseX)
			const height = isReverseY ? originalHeight - (event.pageY - originalMouseY) : originalHeight + (event.pageY - originalMouseY)
			if (shouldMoveX && width > this._MINIMUM_WIDTH) {
				this._windowElement.style.width = `${width}px`
				if (isReverseX) {
					this._windowElement.style.left = `${this._xPosition + (event.pageX - originalMouseX)}px`
				}
			}
			if (shouldMoveY && height > this._MINIMUM_HEIGHT && (!isReverseY || this._yPosition + event.pageY - originalMouseY > 0)) {
				this._windowElement.style.height = `${height}px`
				if (isReverseY) {
					this._windowElement.style.top = `${this._yPosition + (event.pageY - originalMouseY)}px`
				}
			}
		}
		const mouseUp = () => {
			this.setPosition(this._windowElement.offsetLeft, this._windowElement.offsetTop)
			this._windowElement.style.removeProperty("transition")
			window.removeEventListener("mousemove", resize)
			window.removeEventListener("mouseup", mouseUp)
			window.removeEventListener("touchmove", resize)
			window.removeEventListener("touchend", mouseUp)
		}
		window.addEventListener("mousemove", resize)
		window.addEventListener("mouseup", mouseUp)
		window.addEventListener("touchmove", resize)
		window.addEventListener("touchend", mouseUp)
	}
}

window.customElements.define("kiwi-window", WindowElement)
