/**
 * The target observer class is used in compositions where a symbiotic component needs to closely interact with - or observe - another element.
 * For example, tooltips or context menus.
 * This class helps locate and monitor the target, as well as manage all necessary listeners and state.
 */
export class TargetObserver {
	constructor(owner, childSlot = null, listeners = {}) {
		this._owner = owner
		this._childSlot = childSlot
		if (childSlot) {
			childSlot.addEventListener("slotchange", () => {
				this.updateTarget()
			})
		}
		this._listeners = {
			click: null,
			dblclick: null,
			contextmenu: null,
			mouseenter: null,
			mousemove: null,
			mouseleave: null,
			targetRemoved: null,
			...listeners
		}
		this.query = null
		this._targetElement = null
		this._attached = false
		this._targetRemovalObserver = null
	}

	set targetElement(newValue) {
		if (this._targetElement) {
			this._detachFromTarget()
			this._targetElement = null
		}
		if (newValue) {
			this._targetElement = newValue
			this._attachToTarget()
		}
	}

	get targetElement() {
		return this._targetElement
	}

	observe() {
		if (!this.targetElement) {
			this.updateTarget()
		}
		if (this.targetElement && !this._attached) {
			this._attachToTarget()
		}
	}

	disconnect() {
		if (this._attached) {
			this._detachFromTarget()
		}
	}

	updateListeners(newListeners) {
		if (this._attached) {
			this._detachFromTarget()
		}
		this._listeners = newListeners
		if (this.targetElement) {
			this._attachToTarget()
		}
	}

	updateTarget() {
		if (this._attached) {
			this._detachFromTarget()
		}
		const assignedNodes = this._childSlot ? this._childSlot.assignedNodes() : []
		if (this.query) {
			this.setTargetElementByQuery(this.query)
		} else if (assignedNodes.length) {
			this.targetElement = assignedNodes[0]
		} else if (this._owner.parentElement) {
			this.targetElement = this._owner.parentElement
		}
		if (this.targetElement) {
			this._attachToTarget()
		}
	}

	setTargetElementByQuery(query, element = this._owner.parentElement) {
		this.targetElement = this._findTarget(query, element)
	}

	/**
	 * Attempts to find the closest element matching the given css query.
	 * I.e. it first looks at the siblings, then the parent's siblings, and so on recursively.
	 * Eventually it reaches the document root.
	 * The reason for doing it this way is partly to make it more intuitive,
	 * but also because it allows for the feature to work within shadow doms which not be accessible via document.querySelector().
	 * @param {string} query
	 * @param {HTMLElement|HTMLNode} element
	 * @returns {HTMLElement|null}
	 */
	_findTarget(query, element = this._owner.parentElement) {
		if (!element || element === document) {
			return null
		}
		const target = element.querySelector ? element.querySelector(query) : null
		return target ? target : this.setTargetElementByQuery(query, element.parentElement || element.parentNode || element.host)
	}

	_attachToTarget() {
		this._listeners.mouseenter && this.targetElement.addEventListener("mouseenter", this._listeners.mouseenter, false)
		this._listeners.mousemove && this.targetElement.addEventListener("mousemove", this._listeners.mousemove, false)
		this._listeners.mouseleave && this.targetElement.addEventListener("mouseleave", this._listeners.mouseleave, false)
		this._listeners.click && this.targetElement.addEventListener("click", this._listeners.click, false)
		this._listeners.dblclick && this.targetElement.addEventListener("dblclick", this._listeners.dblclick, false)
		this._listeners.contextmenu && this.targetElement.addEventListener("contextmenu", this._listeners.contextmenu, false)
		if (this._listeners.targetRemoved) {
			this._targetRemovalObserver = new MutationObserver(mutations => {
				mutations.forEach(mutation => {
					mutation.removedNodes.forEach(removedNode => {
						if (removedNode === this._targetElement) {
							this._targetRemovalObserver.disconnect()
							this._listeners.targetRemoved()
						}
					})
				})
			})
			this._targetRemovalObserver.observe(document.body, { subtree: true, childList: true })
		}
		this._attached = true
	}

	_detachFromTarget() {
		this._listeners.mouseenter && this.targetElement.removeEventListener("mouseenter", this._listeners.mouseenter, false)
		this._listeners.mousemove && this.targetElement.removeEventListener("mousemove", this._listeners.mousemove, false)
		this._listeners.mouseleave && this.targetElement.removeEventListener("mouseleave", this._listeners.mouseleave, false)
		this._listeners.click && this.targetElement.removeEventListener("click", this._listeners.click, false)
		this._listeners.dblclick && this.targetElement.removeEventListener("dblclick", this._listeners.dblclick, false)
		this._listeners.contextmenu && this.targetElement.removeEventListener("contextmenu", this._listeners.contextmenu, false)
		if (this._targetRemovalObserver) {
			this._targetRemovalObserver.disconnect()
			this._targetRemovalObserver = null
		}
		this._attached = false
	}
}
