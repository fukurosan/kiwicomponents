import template from "./kiwi-badge.html"
import styles from "./kiwi-badge.scss"

/**
 * Kiwi Badge
 * A badge element that can automatically position itself in the top right corner of its closest relative parent
 * @element kiwi-badge
 * 
 * @attr {"round" | "square"} shape - Should the badge be round or square?
 * @attr {"floating" | "inline"} mode - Should the badge float in the top right corner or be positioned inline?
 * @attr {"primary" | "secondary" | "neutral" | "info" | "success" | "warning" | "error"} type - To change the background color of the badge element as required.
 *
 * @slot - Content of the badge
 */

class KiwiBadgeElement extends HTMLElement {
	static get observedAttributes() {
		return ["type", "shape", "mode"]
	}

	constructor() {
		super()
		if (!KiwiBadgeElement._template) {
			const templateElement = document.createElement("template")
			templateElement.innerHTML = `<style>${styles}</style>${template}`
			KiwiBadgeElement._template = templateElement
		}
		this.attachShadow({ mode: "open" }).appendChild(KiwiBadgeElement._template.content.cloneNode(true))
	}
}

export { KiwiBadgeElement }
