import template from "./kiwi-pill.html"
import styles from "./kiwi-pill.scss"

/**
 * Kiwi Badge
 * A pill element that can automatically position itself in the top right corner of its closest relative parent
 * @element kiwi-pill
 *
 * @attr {"round" | "square"} shape - Should the pill be round or square?
 * @attr {"floating" | "inline"} mode - Should the pill float in the top right corner or be positioned inline?
 * @attr {"primary" | "secondary" | "neutral" | "info" | "success" | "warning" | "error"} type - To change the background color of the pill element as required.
 *
 * @slot - Content of the pill
 */

class KiwiPillElement extends HTMLElement {
	static get observedAttributes() {
		return ["type", "shape", "mode"]
	}

	constructor() {
		super()
		if (!KiwiPillElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiPillElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiPillElement._template.content.cloneNode(true))
	}
}

export { KiwiPillElement }
