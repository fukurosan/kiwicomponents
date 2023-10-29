import { openWindow } from "./openWindow"

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
		variant: "default",
		modality: "disabled",
		mode: options.scrollPage ? "scrollable" : "auto",
		maxWidth: 500
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
