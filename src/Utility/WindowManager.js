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
	options.backdrop && kiwiWindow.setAttribute("backdrop", options.backdrop) //"none"|"clickable"|"disabled"
	options.mode && kiwiWindow.setAttribute("mode", options.mode) //"large"|"default"|"compact"
	options.title && kiwiWindow.setAttribute("title", options.title)
	options.icon && kiwiWindow.setAttribute("icon", options.icon)
	options.noanimation && kiwiWindow.setAttribute("noanimation", options.noanimation)
	if (options.content) {
		if (typeof options.content === "string") {
			kiwiWindow.innerHTML = options.content
		} else if (options.content instanceof HTMLElement) {
			kiwiWindow.appendChild(options.content)
		} else {
			kiwiWindow.appendChild(options.content())
		}
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

export const alert = options => {}
export const prompt = options => {}
export const confirm = options => {}
