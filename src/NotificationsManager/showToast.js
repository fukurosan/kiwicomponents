import { Components } from "../Components/index"
import styles from "./NotificationManager.scss"

/**
 * Shows a toast notification
 * @param {import("./interfaces").showToastOptions} options
 * @returns {HTMLElement} The toast element
 */
export const showToast = options => {
	Components.Toast()
	//Create the toast
	const toast = document.createElement("kiwi-toast")
	options.title && toast.setAttribute("title", options.title)
	options.subtitle && toast.setAttribute("subtitle", options.subtitle)
	options.timeout && toast.setAttribute("timeout", options.timeout)
	options.type && toast.setAttribute("type", options.type)
	if (options.icon) {
		if (!["success", "info", "error", "warning"].includes(options.icon)) {
			toast.setAttribute("icon", options.icon)
		} else {
			let svg
			if (options.icon === "success") {
				svg =
					"<svg class='success' version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='success'><path d='M64,0.3M87.2,44.5c-0.9-0.9-2.3-0.9-3.2,0L55.2,73.2L41.4,59.5c-0.9-0.9-2.3-0.9-3.2,0l-4.8,4.8c-0.9,0.9-0.9,2.3,0,3.2l15.3,15.3c0,0,0,0,0,0l3.3,3.3l0.8,0.8l0,0l0.7,0.7c0.9,0.9,2.3,0.9,3.2,0L92,52.5c0.9-0.9,0.9-2.3,0-3.2L87.2,44.5z'/></svg>"
			} else if (options.icon === "info") {
				svg =
					"<svg class='info' version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='question'><path d='M64,0.3M60.8,32.2c-14.5,0-19.1,13.3-19.2,25.5h9.6c-0.2-8.8,0.7-15.9,9.6-15.9c6.4,0,9.6,2.7,9.6,9.6c0,4.4-3.4,6.6-6.4,9.6c-6.2,6-5.7,10.4-6,18.7h8.4c0.3-7.5,0.2-7.3,6.4-13.9c4.2-4.1,7.1-8.2,7.1-14.5C80,41.2,74.6,32.2,60.8,32.2z M64.1,86.3c-3.6,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.6,0,6.4-2.9,6.4-6.4C70.5,89.1,67.6,86.3,64.1,86.3z'/></svg>"
			} else if (options.icon === "error") {
				svg =
					"<svg class='error' version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='error'><path d='M64,0.3M85.9,48.1L81,43.3c-0.9-0.9-2.3-0.9-3.2,0L64,57L50.2,43.3c-0.9-0.9-2.3-0.9-3.2,0l-4.9,4.8c-0.9,0.9-0.9,2.3,0,3.2L55.9,65L42.1,78.8c-0.9,0.9-0.9,2.3,0,3.2l4.9,4.8c0.9,0.9,2.3,0.9,3.2,0L64,73.1l13.8,13.7c0.9,0.9,2.3,0.9,3.2,0l4.9-4.8c0.9-0.9,0.9-2.3,0-3.2L72.1,65l13.8-13.7C86.8,50.4,86.8,49,85.9,48.1z'/></svg>"
			} else {
				svg =
					"<svg class='warning' version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='warning'><path d='M64,32.2c-4.4,0-8,3.3-8,7.3v24.8c0,4.1,3.6,7.3,8,7.3s8-3.3,8-7.3V39.5C72,35.4,68.4,32.2,64,32.2zM64,81.2c-4.4,0-8,3.3-8,7.3s3.6,7.3,8,7.3s8-3.3,8-7.3S68.4,81.2,64,81.2z'/></svg>"
			}
			const customIcon = document.createElement("div")
			customIcon.innerHTML = svg
			customIcon.setAttribute("class", "kiwi-notification-manager-icon")
			customIcon.setAttribute("slot", "icon")
			toast.appendChild(customIcon)
			const style = document.createElement("style")
			style.textContent = styles
			toast.appendChild(style)
		}
	}

	options.closeMode && toast.setAttribute("closemode", options.closeMode)
	if (options.html) {
		if (typeof options.html === "string") {
			toast.innerHTML = options.html
		} else if (options.html instanceof HTMLElement) {
			toast.appendChild(options.html)
		} else {
			toast.appendChild(options.html())
		}
	}

	//If a toast container matching the configuration already exists then use it, otherwise create a new one
	let container = document.querySelector(
		`kiwi-toast-container${options.top ? "[top]" : ":not([top])"}${options.right ? "[right]" : ":not([right])"}${
			options.bottom ? "[bottom]" : ":not([bottom])"
		}${options.left ? "[left]" : ":not([left])"}`
	)
	if (!container) {
		container = document.createElement("kiwi-toast-container")
		options.top && container.setAttribute("top", "")
		options.right && container.setAttribute("right", "")
		options.bottom && container.setAttribute("bottom", "")
		options.left && container.setAttribute("left", "")
		//When the container eventually becomes empty from toasts, remove the container.
		const observer = new MutationObserver(() => {
			if (container.children.length === 0) {
				observer.disconnect()
				container.remove()
			}
		})
		observer.observe(container, { childList: true })
		document.documentElement.appendChild(container)
	}

	//Clear existing (optional) and add the new toast
	options.clearExisting && container.querySelectorAll("kiwi-toast").forEach(element => element.delete())
	container.appendChild(toast)

	return toast
}
