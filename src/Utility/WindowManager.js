import styles from "./WindowManager.scss"
import { ICON_ROUND_CHECK, ICON_ROUND_ERROR, ICON_ROUND_QUESTION, ICON_ROUND_WARNING } from "../Assets/Icons/inline"

/**
 * @description Opens a window
 * @param {import("./interfaces").OpenWindowOptions} options
 * @returns {import("../Components/Window/interface").WindowElement} - The window element
 */
export const openWindow = options => {
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
	options.footer && kiwiWindow.setAttribute("footer", "true")
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
			if (container.children.length === 0) {
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
 * @param {string} message - The message to be displayed
 * @param {string=} title - The title to be displayed
 * @param {string=} cancelLabel - Label for the cancel button
 * @param {string=} confirmLabel - Label for the confirm button
 * @returns {Promise<boolean>} - Promise that will resolve to the choice made by the user.
 */
export const confirm = (message, title, cancelLabel, confirmLabel) => {
	const content = document.createElement("div")
	const body = document.createElement("div")
	const buttons = document.createElement("div")
	const titleElement = document.createElement("div")
	titleElement.appendChild(document.createTextNode(title || "Please Confirm"))
	titleElement.classList.add("kiwi-windowmanager-generic-title")
	content.appendChild(titleElement)
	content.appendChild(body)
	content.appendChild(buttons)
	content.classList.add("kiwi-windowmanager-generic-content")
	content.classList.add("kiwi-windowmanager-generic-message")
	buttons.classList.add("kiwi-windowmanager-generic-buttons")
	if (typeof message === "string") {
		body.appendChild(document.createTextNode(message))
	} else if (message instanceof HTMLElement) {
		body.appendChild(message)
	} else if (typeof message === "function") {
		body.appendChild(message())
	}
	const cancelButton = document.createElement("kiwi-button")
	cancelButton.innerText = cancelLabel || "Cancel"
	cancelButton.setAttribute("type", "secondary")
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
 * @param {string=} message - An optional message to be displayed
 * @returns {() => any} - Function that closes the spinner.
 */
export const showSpinner = message => {
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
	if (typeof message === "string") {
		body.appendChild(document.createTextNode(message))
	} else if (message instanceof HTMLElement) {
		body.appendChild(message)
	} else if (typeof message === "function") {
		body.appendChild(message())
	}
	const spinnerModal = openWindow({
		body: content,
		scale: "large",
		modality: "disabled",
		autosize: true,
		centered: true
	})
	return () => spinnerModal.close()
}

/**
 * @description Opens an alert modal to the user that must be actively dismissed.
 * @param {string=} title - An optional title to be displayed
 * @param {string=} message - An optional message to be displayed
 * @param {string=} buttonText - An optional button text to be displayed
 * @param {"success" | "question" | "warning" | "error"} type - An optional message type
 * @param {string} icon - Optional icon url
 * @returns {() => void} - A function that closes the alert
 */
export const alert = (title, message, buttonText, type, icon) => {
	const content = document.createElement("div")
	const iconImg = document.createElement("img")
	iconImg.classList.add("kiwi-windowmanager-alert-content-icon")
	let iconURL
	if (type === "success") iconURL = ICON_ROUND_CHECK
	else if (type === "question") iconURL = ICON_ROUND_QUESTION
	else if (type === "error") iconURL = ICON_ROUND_ERROR
	else iconURL = ICON_ROUND_WARNING
	iconImg.setAttribute("src", icon ? icon : iconURL)
	const header = document.createElement("div")
	header.classList.add("kiwi-windowmanager-generic-title")
	header.appendChild(document.createTextNode(title ? title : "Alert"))
	const body = document.createElement("div")
	body.classList.add("kiwi-windowmanager-generic-message")
	body.classList.add("kiwi-windowmanager-alert-body")
	const buttons = document.createElement("div")
	buttons.classList.add("kiwi-windowmanager-generic-buttons")
	const closeButton = document.createElement("kiwi-button")
	closeButton.appendChild(document.createTextNode(buttonText ? buttonText : "Close"))
	buttons.appendChild(closeButton)
	content.appendChild(iconImg)
	content.appendChild(header)
	content.appendChild(body)
	content.appendChild(buttons)
	content.classList.add("kiwi-windowmanager-generic-content")
	if (typeof message === "string") {
		body.appendChild(document.createTextNode(message))
	} else if (message instanceof HTMLElement) {
		body.appendChild(message)
	} else if (typeof message === "function") {
		body.appendChild(message())
	}
	const alertModal = openWindow({
		body: content,
		scale: "large",
		modality: "disabled",
		autosize: true,
		centered: true
	})
	return new Promise(resolve => {
		closeButton.addEventListener("click", () => {
			alertModal.close()
			resolve()
		})
	})
}

/**
 * @description Opens a prompt modal to the user that must be actively dismissed.
 * @param {string=} message - An optional title to be displayed
 * @param {(string | HTMLFormElement | {[key: string]: any})=} formOrInputAttributes - Attributes to be applied on the input field element, or a form as an HTML element or a string
 * @param {string=} cancelLabel - Label for the cancel button
 * @param {string=} confirmLabel - Label for the confirm button
 * @returns {Promise<any>} - Promise that will resolve to the value inserted by the user. If the user cancels the value will resolve to null.
 */
export const prompt = (message, formOrInputAttributes, cancelLabel, confirmLabel) => {
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
	cancelButton.setAttribute("type", "secondary")
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
