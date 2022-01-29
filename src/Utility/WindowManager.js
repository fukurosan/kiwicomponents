/**
 * @description Opens a window
 * @param {import("./interfaces").OpenWindowOptions} options
 * @returns {import("../Components/Window/interface").WindowElement} - The window element
 */
export const openWindow = options => {
	//Create the window
	const kiwiWindow = document.createElement("kiwi-window")
	options.noheader && kiwiWindow.setAttribute("noheader", options.noheader)
	options.nofooter && kiwiWindow.setAttribute("nofooter", options.nofooter)
	options.nominimize && kiwiWindow.setAttribute("nominimize", options.nominimize)
	options.nomaximize && kiwiWindow.setAttribute("nomaximize", options.nomaximize)
	options.noclose && kiwiWindow.setAttribute("noclose", options.noclose)
	options.nodrag && kiwiWindow.setAttribute("nodrag", options.nodrag)
	options.noresize && kiwiWindow.setAttribute("noresize", options.noresize)
	options.modality && kiwiWindow.setAttribute("modality", options.modality) //"none"|"clickable"|"disabled"
	options.mode && kiwiWindow.setAttribute("mode", options.mode) //"large"|"default"|"compact"
	options.title && kiwiWindow.setAttribute("title", options.title)
	options.icon && kiwiWindow.setAttribute("icon", options.icon)
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
		footerContainer.setAttribute("style", "width:100%;height:100%;")
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
		headerContainer.setAttribute("style", "width:100%;height:100%;")
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

	//If a toast container matching the configuration already exists then use it, otherwise create a new one
	let container = document.querySelector("#kiwi-window-container")
	if (!container) {
		container = document.createElement("div")
		container.setAttribute("id", "kiwi-window-container")
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
	container.appendChild(kiwiWindow)

	return kiwiWindow
}
