/**
 * Class for managing global state
 */
export class StateManager {
	constructor() {
		this.states = new Map()
		this.shouldDebug = false
		this.listeners = new Map()
		this.middleware = {
			set: [],
			get: []
		}
	}

	/**
	 * Add a middleware
	 * @param {"get"|"set"} type - The type of middleware
	 * @param {any => any} fn - Middleware function that will take the state as input and should return a transformed version as output
	 */
	addMiddleware(type, fn) {
		if (type === "get") this.middleware.get.push(fn)
		else if (type === "set") this.middleware.set.push(fn)
	}

	/**
	 * Remove a middleware
	 * @param {"get"|"set"} type - The type of middleware
	 * @param {any => any} fn - Removes an active middleware
	 */
	removeMiddleware(type, fn) {
		if (type === "get") this.middleware.get = this.middleware.get.filter(middleware => middleware !== fn)
		else if (type === "set") this.middleware.set = this.middleware.set.filter(middleware => middleware !== fn)
	}

	/**
	 * Returns the current call stack trace as a string
	 * @returns {string} - Current stack trace
	 */
	getTrace() {
		return new Error().stack
	}

	/**
	 * Adds a listener for state changes to a given key
	 * @param {any} key
	 * @param {({oldValue: any, newValue: any}) => any} fn
	 */
	addListener(key, fn) {
		if (!this.listeners.has(key)) {
			this.listeners.set(key, [])
		}
		this.listeners.get(key).push(fn)
	}

	/**
	 * removes a listener for state changes to a given key
	 * @param {any} key
	 * @param {({oldValue: any, newValue: any}) => any} fn
	 */
	removeListener(key, fn) {
		if (!this.listeners.has(key)) {
			return
		}
		this.listeners.set(
			key,
			this.listeners.get(key).filter(listener => listener !== fn)
		)
	}

	/**
	 * Sets the state for a given key to a given value
	 * @param {any} key
	 * @param {any} value
	 * @param {{emit: boolean}} options
	 */
	setState(key, value, options = {}) {
		const oldValue = this.states.get(key)
		this.states.set(
			key,
			this.middleware.set.reduce((acc, fn) => fn(acc), value)
		)
		if (options.emit !== false && this.listeners.has(key)) {
			this.listeners.get(key).forEach(listener => listener({ oldValue, newValue: value }))
		}
		if (!this.listeners.has(key)) {
			return
		}
		if (this.shouldDebug) {
			// eslint-disable-next-line no-console
			console.debug(`State updated ${options.emit === false ? "with no emit" : ""}`, { key, value, trace: this.getTrace() })
		}
	}

	/**
	 * Gets the current state for a given key
	 * @param {any} key
	 */
	getState(key) {
		return this.middleware.get.reduce((acc, fn) => fn(acc), this.states.get(key))
	}

	/**
	 * Clears all state for a given key
	 * @param {any} key - key to clear
	 */
	clearState(key) {
		this.states.delete(key)
	}

	/**
	 * Forces an update to be triggered either for a provided key or for all keys if no key is provided
	 * @param {any} key
	 */
	forceUpdate(key = null) {
		const keys = key ? [key] : this.listAllKeys()
		keys.forEach(key => {
			if (this.listeners.has(key)) {
				const value = this.states.get(key)
				this.listeners.get(key).forEach(listener => listener({ oldValue: undefined, newValue: value }))
			}
		})
		if (this.shouldDebug) {
			// eslint-disable-next-line no-console
			console.debug(`State forcefully updated for ${key ? key : "all keys"}`, { key, trace: this.getTrace() })
		}
	}

	/**
	 * Toggles the debug mode on and off
	 * @param {boolean} shouldDebug
	 */
	setDebug(shouldDebug) {
		this.shouldDebug = shouldDebug
	}

	/**
	 * Returns all state keys currently stored
	 * @returns {any[]} - State keys
	 */
	listAllKeys() {
		return Array.from(this.states.keys())
	}

	/**
	 * Returns the entire state kept in the manager
	 * @returns {[any, any][]} State
	 */
	listAllState() {
		return Array.from(this.states.entries())
	}

	/**
	 * Clear all state in the manager
	 */
	clearAllState() {
		this.states.clear()
	}
}
