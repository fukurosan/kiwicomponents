import scrollbar from "../Assets/Stylesheets/Global/scrollbar.scss"
import typography from "../Assets/Stylesheets/Global/typography.scss"

export const injectStyle = options => {
	const style = `
        ${options.scrollbar ? scrollbar : ""}
        ${options.typography ? typography : ""}
    `
	const styleElement = document.createElement("style")
	styleElement.innerText = style
	document.head.appendChild(styleElement)
}
