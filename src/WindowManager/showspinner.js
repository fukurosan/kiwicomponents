import { openWindow } from "./openWindow"

/**
 * @description Opens a modal spinner window
 * @param {import("./interfaces").showSpinnerOptions} options - Options for the spinner dialog
 * @returns {import("./interfaces").showSpinnerDialog} - Show spinner dialog
 */
export const showSpinner = (options = {}) => {
	const { message } = options
	const content = document.createElement("div")
	const spinner = document.createElement("kiwi-spinner")
	spinner.setAttribute("size", "100px")
	spinner.setAttribute("usebackground", "")
	const body = document.createElement("div")
	body.classList.add("kiwi-windowmanager-generic-title")
	content.appendChild(spinner)
	content.appendChild(body)
	content.classList.add("kiwi-windowmanager-spinner-content")
	content.classList.add("kiwi-windowmanager-generic-content")
	const applyMessage = message => {
		body.innerHTML = ""
		if (typeof message === "string") {
			body.appendChild(document.createTextNode(message))
		} else if (message instanceof HTMLElement) {
			body.appendChild(message)
		} else if (typeof message === "function") {
			body.appendChild(message())
		}
	}
	applyMessage(message)
	const spinnerModal = openWindow({
		body: content,
		scale: "large",
		modality: "disabled",
		autosize: true,
		centered: true
	})
	const updateMessage = newMessage => {
		applyMessage(newMessage)
	}
	return {
		close: () => spinnerModal.close(),
		dialog: spinnerModal,
		updateMessage
	}
}
