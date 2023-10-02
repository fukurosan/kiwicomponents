import { openWindow } from "./openWindow"

/**
 * @description Opens an alert modal to the user that must be actively dismissed.
 * @param {import("./interfaces").alertOptions} options - Options for the alert
 * @returns {import("./interfaces").alertDialog} - Alert dialog
 */
export const alert = (options = {}) => {
	const { title, message, buttonText, type, icon } = options
	const content = document.createElement("div")
	const iconDiv = document.createElement("div")
	iconDiv.classList.add("kiwi-windowmanager-alert-content-icon")
	if (icon) {
		const iconImg = document.createElement("img")
		iconImg.setAttribute("src", icon)
		iconDiv.appendChild(iconImg)
	} else {
		let svg
		if (type === "success") {
			svg =
				"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='success'><path d='M64,0.3M87.2,44.5c-0.9-0.9-2.3-0.9-3.2,0L55.2,73.2L41.4,59.5c-0.9-0.9-2.3-0.9-3.2,0l-4.8,4.8c-0.9,0.9-0.9,2.3,0,3.2l15.3,15.3c0,0,0,0,0,0l3.3,3.3l0.8,0.8l0,0l0.7,0.7c0.9,0.9,2.3,0.9,3.2,0L92,52.5c0.9-0.9,0.9-2.3,0-3.2L87.2,44.5z'/></svg>"
		} else if (type === "question") {
			svg =
				"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='question'><path d='M64,0.3M60.8,32.2c-14.5,0-19.1,13.3-19.2,25.5h9.6c-0.2-8.8,0.7-15.9,9.6-15.9c6.4,0,9.6,2.7,9.6,9.6c0,4.4-3.4,6.6-6.4,9.6c-6.2,6-5.7,10.4-6,18.7h8.4c0.3-7.5,0.2-7.3,6.4-13.9c4.2-4.1,7.1-8.2,7.1-14.5C80,41.2,74.6,32.2,60.8,32.2z M64.1,86.3c-3.6,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.6,0,6.4-2.9,6.4-6.4C70.5,89.1,67.6,86.3,64.1,86.3z'/></svg>"
		} else if (type === "error") {
			svg =
				"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='error'><path d='M64,0.3M85.9,48.1L81,43.3c-0.9-0.9-2.3-0.9-3.2,0L64,57L50.2,43.3c-0.9-0.9-2.3-0.9-3.2,0l-4.9,4.8c-0.9,0.9-0.9,2.3,0,3.2L55.9,65L42.1,78.8c-0.9,0.9-0.9,2.3,0,3.2l4.9,4.8c0.9,0.9,2.3,0.9,3.2,0L64,73.1l13.8,13.7c0.9,0.9,2.3,0.9,3.2,0l4.9-4.8c0.9-0.9,0.9-2.3,0-3.2L72.1,65l13.8-13.7C86.8,50.4,86.8,49,85.9,48.1z'/></svg>"
		} else {
			svg =
				"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='warning'><path d='M64,32.2c-4.4,0-8,3.3-8,7.3v24.8c0,4.1,3.6,7.3,8,7.3s8-3.3,8-7.3V39.5C72,35.4,68.4,32.2,64,32.2zM64,81.2c-4.4,0-8,3.3-8,7.3s3.6,7.3,8,7.3s8-3.3,8-7.3S68.4,81.2,64,81.2z'/></svg>"
		}
		iconDiv.innerHTML = svg
	}
	content.appendChild(iconDiv)
	if (title) {
		const header = document.createElement("div")
		header.classList.add("kiwi-windowmanager-generic-title")
		header.appendChild(document.createTextNode(title))
		content.appendChild(header)
	}
	if (message) {
		const body = document.createElement("div")
		body.classList.add("kiwi-windowmanager-generic-message")
		body.classList.add("kiwi-windowmanager-alert-body")
		if (typeof message === "string") {
			body.appendChild(document.createTextNode(message))
		} else if (message instanceof HTMLElement) {
			body.appendChild(message)
		} else if (typeof message === "function") {
			body.appendChild(message())
		}
		content.appendChild(body)
	}
	const buttons = document.createElement("div")
	buttons.classList.add("kiwi-windowmanager-generic-buttons")
	buttons.classList.add("kiwi-windowmanager-alert-buttons")
	const closeButton = document.createElement("kiwi-button")
	closeButton.appendChild(document.createTextNode(buttonText ? buttonText : "Close"))
	buttons.appendChild(closeButton)
	content.appendChild(buttons)
	content.classList.add("kiwi-windowmanager-generic-content")
	const alertModal = openWindow({
		body: content,
		scale: "large",
		modality: "disabled",
		autosize: true,
		centered: true
	})
	return {
		dialog: alertModal,
		closeButtonListener: new Promise(resolve => {
			closeButton.addEventListener("click", () => {
				alertModal.close()
				resolve()
			})
		})
	}
}
