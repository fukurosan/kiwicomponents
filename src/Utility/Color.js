/**
 * Determines the optimal black/white foreground color for a given element's background color.
 * Used for computing if icon colors / text colors need to be inverted or not.
 * @param {HTMLElement} element
 * @returns {"black"|"white"}
 */
export const computePreferredForegroundColor = element => {
	const rgbValue = getComputedStyle(element).backgroundColor.split(",")
	rgbValue[0] = parseInt(rgbValue[0].substring(5))
	rgbValue[1] = parseInt(rgbValue[1])
	rgbValue[2] = parseInt(rgbValue[2].substring(0, 4))
	const color = Math.round((parseInt(rgbValue[0]) * 299 + parseInt(rgbValue[1]) * 587 + parseInt(rgbValue[2]) * 114) / 1000)
	const foregroundColor = color > 125 ? "black" : "white"
	return foregroundColor
}
