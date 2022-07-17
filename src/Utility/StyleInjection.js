import scrollbar from "../Assets/Stylesheets/Global/scrollbar.scss"
import typography from "../Assets/Stylesheets/Global/typography.scss"
import forms from "../Assets/Stylesheets/Global/forms.scss"
import tables from "../Assets/Stylesheets/Global/table.scss"

/**
 * Injects style globally
 * @param {import("./interfaces").StyleInjectionOptions} options
 */
export const injectStyle = options => {
	const style = `
        ${options.scrollbar ? scrollbar : ""}
        ${options.typography ? typography : ""}
        ${options.forms ? forms : ""}
        ${options.tables ? tables : ""}
    `
	const styleElement = document.createElement("style")
	styleElement.innerText = style
	document.head.appendChild(styleElement)
}
