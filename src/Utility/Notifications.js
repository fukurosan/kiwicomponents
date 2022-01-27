export const showNotification = options => {
	//Create the toast
	const toast = document.createElement("kiwi-toast")
	options.title && toast.setAttribute("title", options.title)
	options.icon && toast.setAttribute("icon", options.icon)
	options.body && toast.setAttribute("body", options.body)
	options.timeout && toast.setAttribute("timeout", options.timeout)
	options.type && toast.setAttribute("type", options.type)
	options.noanimation && toast.setAttribute("noanimation", options.noanimation)
	options.noclickclose && toast.setAttribute("noclickclose", options.noclickclose)

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
