import { StateManager as SM } from "./statemanager"

/**
 * The state manager API
 */
class StateManager {
	constructor() {
		this.stateManager = new SM()
	}

	/**
	 * Add a middleware
	 * @param {"get"|"set"} type - The type of middleware
	 * @param {any => any} fn - Middleware function that will take the state as input and should return a transformed version as output
	 */
	addMiddleware(type, fn) {
		this.stateManager.addMiddleware(type, fn)
	}

	/**
	 * Remove a middleware
	 * @param {"get"|"set"} type - The type of middleware
	 * @param {any => any} fn - Removes an active middleware
	 */
	removeMiddleware(type, fn) {
		this.stateManager.removeMiddleware(type, fn)
	}

	/**
	 * Adds a listener for state changes to a given key
	 * @param {any} key
	 * @param {({oldValue: any, newValue: any}) => any} fn
	 */
	addListener(key, fn) {
		this.stateManager.addListener(key, fn)
	}

	/**
	 * removes a listener for state changes to a given key
	 * @param {any} key
	 * @param {({oldValue: any, newValue: any}) => any} fn
	 */
	removeListener(key, fn) {
		this.stateManager.removeListener(key, fn)
	}

	/**
	 * Sets the state for a given key to a given value
	 * @param {any} key
	 * @param {any} value
	 * @param {{emit: boolean}} options
	 */
	setState(key, value, options = {}) {
		this.stateManager.setState(key, value, options)
	}

	/**
	 * Gets the current state for a given key
	 * @param {any} key
	 */
	getState(key) {
		return this.stateManager.getState(key)
	}

	/**
	 * Clears all state for a given key
	 * @param {any} key - key to clear
	 */
	clearState(key) {
		this.stateManager.clearState(key)
	}

	/**
	 * Forces an update to be triggered either for a provided key or for all keys if no key is provided
	 * @param {any} key
	 */
	forceUpdate(key = null) {
		this.stateManager.forceUpdate(key)
	}

	/**
	 * Toggles the debug mode on and off
	 * @param {boolean} shouldDebug
	 */
	setDebug(shouldDebug) {
		this.stateManager.setDebug(shouldDebug)
	}

	/**
	 * Returns all state keys currently stored
	 * @returns {any[]} - State keys
	 */
	listAllKeys() {
		return this.stateManager.listAllKeys()
	}

	/**
	 * Returns the entire state kept in the manager
	 * @returns {[any, any][]} State
	 */
	listAllState() {
		return this.stateManager.listAllState()
	}

	/**
	 * Clear all state in the manager
	 */
	clearAllState() {
		this.stateManager.clearAllState()
	}

	/**
	 * Completely resets the state manager
	 */
	reset() {
		this.stateManager = new SM()
	}
}

/**
 * Returns the global state manager.
 * @returns {StateManager} State Manager
 */
export const getStateManager = () => {
	if (window._kiwi?.stateManager) return window._kiwi.stateManager
	const instance = new StateManager()
	window._kiwi || (window._kiwi = {})
	window._kiwi.stateManager = instance
	return instance
}
