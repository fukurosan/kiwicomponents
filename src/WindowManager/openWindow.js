import { Components } from "../Components/index"
import styles from "./WindowManager.scss"

/**
 * @description Opens a window
 * @param {import("./interfaces").OpenWindowOptions} options
 * @returns {import("../Components/Window/interface").IWindowElement} - The window element
 */
export const openWindow = options => {
	Components.Window()
	Components.Button()
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
