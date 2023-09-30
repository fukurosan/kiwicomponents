import { Components } from "../Components/index"
import styles from "./WindowManager.scss"

/**
 * @description Opens a window
 * @param {import("./interfaces").OpenWindowOptions} options
 * @returns {import("../Components/Window/interface").IWindowElement} - The window element
 */
export const openWindow = options => {
	Components.Window()
	//Create the window
	const kiwiWindow = document.createElement("kiwi-window")
	options.minimizable && kiwiWindow.setAttribute("useminimizable", options.minimizable)
	options.maximizable && kiwiWindow.setAttribute("usemaximizable", options.maximizable)
	options.closeButton && kiwiWindow.setAttribute("useclosebutton", options.closebutton)
	options.draggable && kiwiWindow.setAttribute("usedraggable", options.draggable)
	options.resizable && kiwiWindow.setAttribute("useresizable", options.resizable)
	options.centered && kiwiWindow.setAttribute("usecentered", options.centered)
	options.autosize && kiwiWindow.setAttribute("useautosize", options.autosize)
	options.modality && kiwiWindow.setAttribute("modality", options.modality)
	options.scale && kiwiWindow.setAttribute("scale", options.scale)
	options.title && kiwiWindow.setAttribute("title", options.title)
	options.icon && kiwiWindow.setAttribute("icon", options.icon)
	options.footer && kiwiWindow.setAttribute("usefooter", "true")
	options.noanimation && kiwiWindow.setAttribute("noanimation", options.noanimation)
	if (options.body) {
		if (typeof options.body === "string") {
			kiwiWindow.innerHTML = options.body
		} else if (options.body instanceof HTMLElement) {
			kiwiWindow.appendChild(options.body)
		} else {
			kiwiWindow.appendChild(options.body())
		}
	}
	if (options.footer) {
		const footerContainer = document.createElement("div")
		footerContainer.classList.add("kiwi-windowmanager-general-footer")
		footerContainer.setAttribute("slot", "footer")
		if (typeof options.footer === "string") {
			footerContainer.innerHTML = options.footer
		} else if (options.footer instanceof HTMLElement) {
			footerContainer.appendChild(options.footer)
		} else {
			footerContainer.appendChild(options.footer())
		}
		kiwiWindow.appendChild(footerContainer)
	}
	if (options.header) {
		const headerContainer = document.createElement("div")
		headerContainer.classList.add("kiwi-windowmanager-general-header")
		headerContainer.setAttribute("slot", "footer")
		if (typeof options.header === "string") {
			headerContainer.innerHTML = options.header
		} else if (options.header instanceof HTMLElement) {
			headerContainer.appendChild(options.header)
		} else {
			headerContainer.appendChild(options.header())
		}
		kiwiWindow.appendChild(headerContainer)
	}

	//If a window container matching the configuration already exists then use it, otherwise create a new one
	let container = document.querySelector("#kiwi-window-container")
	if (!container) {
		container = document.createElement("div")
		container.setAttribute("id", "kiwi-window-container")
		const styleElement = document.createElement("style")
		styleElement.innerHTML = styles
		container.appendChild(styleElement)
		//When the container eventually becomes empty from windows, remove the container.
		const observer = new MutationObserver(() => {
			const childTypes = new Set()
			Array.from(container.children).map(child => childTypes.add(child.tagName))
			if (childTypes.size === 1) {
				observer.disconnect()
				container.remove()
			}
		})
		observer.observe(container, { childList: true })
		document.body.appendChild(container)
	}
	container.appendChild(kiwiWindow)
	return kiwiWindow
}

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
		scale: "large",
		modality: "disabled",
		autosize: true,
		centered: true
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

/**
 * @description Opens a prompt modal to the user that must be actively dismissed.
 * @param {import("./interfaces").promptOptions} options - Options for the prompt
 * @returns {Promise<any>} - Promise that will resolve to the value inserted by the user. If the user cancels the value will resolve to null.
 */
export const prompt = (options = {}) => {
	const { message, formOrInputAttributes, cancelLabel, confirmLabel } = options
	const content = document.createElement("div")
	const buttons = document.createElement("div")
	if (message) {
		const title = document.createElement("div")
		title.appendChild(document.createTextNode(message))
		title.classList.add("kiwi-windowmanager-generic-title")
		content.appendChild(title)
	}
	//If a form was provided then use that
	let form
	if (formOrInputAttributes instanceof HTMLFormElement && formOrInputAttributes.tagName === "FORM") {
		form = formOrInputAttributes
	}
	//If a string was provided then parse it to an HTML element and assume it is a form
	else if (typeof formOrInputAttributes === "string") {
		form = new DOMParser().parseFromString(formOrInputAttributes, "text/html").body.children[0]
	}
	//Otherwise configure a form with a single input field
	else {
		const input = document.createElement("input")
		if (typeof formOrInputAttributes === "object" && formOrInputAttributes !== null) {
			Object.keys(formOrInputAttributes).forEach(key => {
				input.setAttribute(key, formOrInputAttributes[key])
			})
		}
		form = document.createElement("form")
		form.appendChild(input)
	}
	form.style.width = "100%"
	content.appendChild(form)
	content.appendChild(buttons)
	content.classList.add("kiwi-windowmanager-generic-content")
	content.classList.add("kiwi-windowmanager-generic-message")
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
	const window = openWindow({
		body: content,
		scale: "large",
		modality: "disabled",
		autosize: true,
		centered: true
	})
	return new Promise(resolve => {
		cancelButton.addEventListener("click", () => {
			window.close()
			resolve(null)
		})
		confirmButton.addEventListener("click", () => {
			if (form.reportValidity()) {
				//If its a user provided form, format the data into an object
				if (formOrInputAttributes instanceof HTMLElement || typeof formOrInputAttributes === "string") {
					const formData = Array.from(new FormData(form).entries()).reduce((obj, item) => {
						if (obj[item[0]]) {
							!Array.isArray(obj[item[0]]) && (obj[item[0]] = [obj[item[0]]])
							obj[item[0]].push(item[1])
						} else {
							obj[item[0]] = item[1]
						}
						return obj
					}, {})
					window.close()
					resolve(formData)
				}
				//If its just a simple input field, return the value as is
				else {
					if (form.reportValidity()) {
						window.close()
						resolve(form.children[0].value)
					}
				}
			}
		})
	})
}
