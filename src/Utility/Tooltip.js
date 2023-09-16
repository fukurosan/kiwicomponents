import { Components } from "../Components/index"

/**
 * Enables global tooltips
 * @returns {any}
 */
export const enableGlobalTooltips = () => {
	Components.Tooltip()
	const observer = new MutationObserver(mutations => {
		const addedTargetElements = mutations.reduce((acc, mutation) => {
			mutation.addedNodes.forEach(addedNode => {
				if (addedNode instanceof HTMLElement && addedNode.hasAttribute("kiwi-tooltip")) {
					acc.push(addedNode)
				}
			})
			return acc
		}, [])
		if (addedTargetElements.length) {
			let container = document.querySelector("#kiwi-tooltip-container")
			if (!container) {
				container = document.createElement("div")
				container.setAttribute("id", "kiwi-tooltip-container")
				const containerObserver = new MutationObserver(() => {
					if (container.children.length === 0) {
						containerObserver.disconnect()
						container.remove()
					}
				})
				containerObserver.observe(container, { childList: true })
				document.body.appendChild(container)
			}
			addedTargetElements.forEach(target => {
				const tooltip = document.createElement("kiwi-tooltip")
				tooltip.appendChild(document.createTextNode(target.getAttribute("kiwi-tooltip")))
				target.hasAttribute("kiwi-tooltip-position") && tooltip.setAttribute("position", target.getAttribute("kiwi-tooltip-position"))
				target.hasAttribute("kiwi-tooltip-delay") && tooltip.setAttribute("delay", target.getAttribute("kiwi-tooltip-delay"))
				target.hasAttribute("kiwi-tooltip-padding") && tooltip.setAttribute("padding", target.getAttribute("kiwi-tooltip-padding"))
				target.hasAttribute("kiwi-tooltip-noanimation") && tooltip.setAttribute("noanimation", target.getAttribute("kiwi-tooltip-noanimation"))
				tooltip.targetElement = target
				container.appendChild(tooltip)
			})
		}
	})
	observer.observe(document.documentElement, { subtree: true, childList: true })
}
