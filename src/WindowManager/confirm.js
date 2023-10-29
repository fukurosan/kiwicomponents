import { openWindow } from "./openWindow"

/**
 * @description Opens a confirmation window
 * @param {import("./interfaces").confirmOptions} options - Confirm dialog options
 * @returns {Promise<boolean>} - Promise that will resolve to the choice made by the user.
 */
export const confirm = (options = {}) => {
	const { message, title, cancelLabel, confirmLabel } = options
	const content = document.createElement("div")
	const buttons = document.createElement("div")
	if (title) {
		const titleElement = document.createElement("div")
		titleElement.appendChild(document.createTextNode(title || "Please Confirm"))
		titleElement.classList.add("kiwi-windowmanager-generic-title")
		content.appendChild(titleElement)
	}
	if (message) {
		const body = document.createElement("div")
		body.classList.add("kiwi-windowmanager-generic-message")
		if (typeof message === "string") {
			body.appendChild(document.createTextNode(message))
		} else if (message instanceof HTMLElement) {
			body.appendChild(message)
		} else if (typeof message === "function") {
			body.appendChild(message())
		}
		content.appendChild(body)
	}
	buttons.classList.add("kiwi-windowmanager-generic-buttons")
	const cancelButton = document.createElement("kiwi-button")
	cancelButton.innerText = cancelLabel || "Cancel"
	cancelButton.setAttribute("type", "neutral")
	cancelButton.setAttribute("fill", "light")
	const confirmButton = document.createElement("kiwi-button")
	confirmButton.innerText = confirmLabel || "Confirm"
	confirmButton.setAttribute("type", "primary")
	buttons.appendChild(cancelButton)
	buttons.appendChild(confirmButton)
	content.appendChild(buttons)
	content.classList.add("kiwi-windowmanager-generic-content")
	const window = openWindow({
		body: content,
		variant: "default",
		modality: "disabled",
		mode: options.scrollPage ? "scrollable" : "auto",
		maxWidth: 500
	})
	return new Promise(resolve => {
		cancelButton.addEventListener("click", () => {
			window.close()
			resolve(false)
		})
		confirmButton.addEventListener("click", () => {
			window.close()
			resolve(true)
		})
	})
}
