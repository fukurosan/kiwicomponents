/**
 * @description Opens a drawer
 * @param {import("./interfaces").OpenDrawerOptions} options
 * @returns {import("../Components/Drawer/interface").DrawerElement} - The drawer element
 */
export const openDrawer = options => {
	//Create the drawer
	const kiwiDrawer = document.createElement("kiwi-drawer")
	options.closeIcon === false && kiwiDrawer.setAttribute("nocloseicon", options.closeIcon)
	options.backdrop && kiwiDrawer.setAttribute("usebackdrop", options.backdrop)
	options.direction && kiwiDrawer.setAttribute("direction", options.direction)
	options.subtitle && kiwiDrawer.setAttribute("subtitle", options.subtitle)
	options.title && kiwiDrawer.setAttribute("title", options.title)
	options.type && kiwiDrawer.setAttribute("type", options.type)
	if (options.body) {
		if (typeof options.body === "string") {
			kiwiDrawer.innerHTML = options.body
		} else if (options.body instanceof HTMLElement) {
			kiwiDrawer.appendChild(options.body)
		} else {
			kiwiDrawer.appendChild(options.body())
		}
	}
	kiwiDrawer.addEventListener("open", e => {
		e.detail === false && kiwiDrawer.remove()
	})

	//If a drawer container matching the configuration already exists then use it, otherwise create a new one
	let container = document.querySelector("#kiwi-drawer-container")
	if (!container) {
		container = document.createElement("div")
		container.setAttribute("id", "kiwi-drawer-container")
		//When the container eventually becomes empty from drawers, remove the container.
		const observer = new MutationObserver(() => {
			if (container.children.length === 0) {
				observer.disconnect()
				container.remove()
			}
		})
		observer.observe(container, { childList: true })
		document.body.appendChild(container)
	}
	container.appendChild(kiwiDrawer)
	setTimeout(() => {
		kiwiDrawer.setAttribute("open", "")
	}, 10)
	return kiwiDrawer
}
