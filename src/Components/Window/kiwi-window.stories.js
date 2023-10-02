import { Components } from "../../index"
Components.Window()

/**
 * A window that can be opened within the browser viewport. Can work either as a dialog or a modal.
 */
export default {
	title: "Internal Components/kiwi-window",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		title: {
			control: "text",
			description: "Header text",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		icon: {
			control: "text",
			description: "Header icon",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		body: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		footer: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		header: {
			control: "text",
			description: "HTML content",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		},
		modality: {
			control: { type: "select" },
			options: ["none", "clickable", "disabled"],
			description: "configures the backdrop of the window",
			table: { type: { summary: "" }, defaultValue: { summary: "solid" } }
		},
		scale: {
			control: { type: "select" },
			options: ["none", "compact", "small", "medium", "large"],
			description: "Determines the general dimensions of the window's sections",
			table: { type: { summary: "" }, defaultValue: { summary: "solid" } }
		},
		usefooter: {
			control: "boolean",
			description: "If set to any value the footer will be rendered",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		useminimizable: {
			control: "boolean",
			description: "If set to any value the minimize button will be added to the header",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		usemaximizable: {
			control: "boolean",
			description: "If set to any value the maximize button will be added to the header and double clicking the header will maximize the window",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		useclosebutton: {
			control: "boolean",
			description: "If set to any value the close button will be added to the header",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		usedraggable: {
			control: "boolean",
			description: "If set to any value the window will be dragable",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		useresizable: {
			control: "boolean",
			description: "If set to any value the window will be resizable",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		usecentered: {
			control: "boolean",
			description: "If set to any value the window will be centered in the viewport. If set to scroll the page will scroll instead of the body",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		useautosize: {
			control: "boolean",
			description: "If set to any value the window will automatically adjust its size to its content and the viewport",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		noanimation: {
			control: "boolean",
			description: "If set to any value no animations will take place",
			table: { type: { summary: "" }, defaultValue: { summary: "Not set" } }
		},
		"@function close": { description: "Will close the window" },
		"@function minimize": { description: "Will hide the window" },
		"@function isMinimized": { description: "Returns true of the window is minimized" },
		"@function reset": { description: "Will show the window" },
		"@function maximize": { description: "toggles the window size between the original size and the maximize size" },
		"@function isMaximized": { description: "Returns true if the window is maximized" },
		"@function bringToFront": { description: "Brings the window in front" },
		"@function setPosition(left, top)": { description: "Sets the position of the window" },
		"@function setSize(width, height)": { description: "Sets the size of the window. Can be either integer (pixel) or string" },
		"@function scaleToFit": { description: "Auto-sizes the window based on its content" },
		"@function center": { description: "Centers the window in the viewport" },
		"@slot - default": { description: "Inserts content into the body" },
		"@slot - header": { description: "Inserts content into the header" },
		"@slot - footer": { description: "Inserts content into the footer" },
		"@event - onClose": { action: "onClose", description: "Sent when the window is closed" },
		...["--kiwi-window-backdrop-blur", "--kiwi-window-body-background", "--kiwi-window-footer-background", "--kiwi-window-separator-color"].reduce(
			(acc, attr) => {
				acc[attr] = {
					control: "text",
					description: "",
					table: { type: { summary: "" }, defaultValue: { summary: "" } }
				}
				return acc
			},
			{}
		)
	}
}

export const Playground = {
	parameters: {
		docs: {
			story: { inline: true }
		}
	}
}

const createComponent = props => {
	const {
		title,
		icon,
		body,
		footer,
		header,
		modality,
		scale,
		usefooter,
		useminimizable,
		usemaximizable,
		useclosebutton,
		usedraggable,
		useresizable,
		usecentered,
		useautosize,
		noanimation
	} = props
	const container = document.createElement("div")
	container.setAttribute("style", "display:flex;gap:0.5rem;flex-wrap:wrap;")

	const createWindow = () => {
		const element = document.createElement("kiwi-window")
		element.innerHTML = `
	<div slot="header">${header ? header : ""}</div>
	<div>${body ? body : "This is some content inside of the window"}</div>
	<div slot="footer">${footer ? footer : "And this is some footer content"}</div>
	`

		title && element.setAttribute("title", title)
		icon && element.setAttribute("icon", icon)
		modality && element.setAttribute("modality", modality)
		scale && element.setAttribute("scale", scale)
		usefooter && element.setAttribute("usefooter", usefooter)
		useminimizable && element.setAttribute("useminimizable", useminimizable)
		usemaximizable && element.setAttribute("usemaximizable", usemaximizable)
		useclosebutton && element.setAttribute("useclosebutton", useclosebutton)
		usedraggable && element.setAttribute("usedraggable", usedraggable)
		useresizable && element.setAttribute("useresizable", useresizable)
		usecentered && element.setAttribute("usecentered", usecentered)
		useautosize && element.setAttribute("useautosize", useautosize)
		noanimation && element.setAttribute("noanimation", noanimation)

		element.addEventListener("close", props["@event - onClose"])
		container.appendChild(element)
	}
	createWindow()

	const createWindowButton = document.createElement("button")
	createWindowButton.innerHTML = "Open Window"
	createWindowButton.addEventListener("click", createWindow)

	container.appendChild(createWindowButton)
	;[
		"close",
		"minimize",
		"isMinimized",
		"reset",
		"maximize",
		"isMaximized",
		"bringToFront",
		"setPosition 0, 0",
		"setSize 500 500",
		"scaleToFit",
		"center"
	].forEach(operation => {
		const button = document.createElement("button")
		button.innerHTML = operation
		button.addEventListener("click", () => {
			container.querySelectorAll("kiwi-window").forEach(element => {
				if (operation.startsWith("is")) {
					// eslint-disable-next-line no-console
					console.log(element[operation]())
					return
				}
				if (operation.startsWith("setPosition")) {
					element.setPosition(0, 0)
					return
				}
				if (operation.startsWith("setSize")) {
					element.setSize(500, 500)
					return
				}
				element[operation]()
			})
		})
		container.appendChild(button)
	})

	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})

	return container
}
