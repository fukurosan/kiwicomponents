/**
 * The movement observer executes a callback when a given target has moved within the viewport.
 * This is typically used to reposition tooltips or menus when the user scrolls or otherwise moves elements around.
 * Note that some browsers will throw up warning for positioning effects inside scroll listeners.
 * Performance-wise it is certainly not an optimal approach, but everything considered it still seems the best way to do it.
 */
export class MovementObserver {
	constructor() {
		this._parentList = []
		this._callback = null
	}

	_findParentsRecursive(current, list = []) {
		if (current instanceof HTMLElement) {
			list.push(current)
		}
		const next = current.parentElement || current.parentNode || current.host
		if (next && current !== document) {
			this._findParentsRecursive(next, list)
		}
		return list
	}

	observe(target, callback) {
		this._callback = callback
		this._parentList = this._findParentsRecursive(target)
		this._parentList.push(window)
		this._parentList.forEach(parent => {
			parent.addEventListener("scroll", this._callback)
			parent.addEventListener("resize", this._callback)
		})
	}

	disconnect() {
		this._parentList.forEach(parent => {
			parent.removeEventListener("scroll", this._callback)
			parent.removeEventListener("resize", this._callback)
		})
		this._parentList = []
		this._callback = null
	}
}
