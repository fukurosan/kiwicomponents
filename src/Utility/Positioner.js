/**
 * Computes how many pixels a provided element needs to be adjusted on its x/y axis to align as close to the preferred position as possible without overflowing the viewport.
 * The provided element should have either position fixed or position absolute set.
 * @param {DOMRect} elementBCR
 * @param {DOMRect} targetBCR
 * @param {"top"|"right"|"bottom"|"left"|"mouse"} position
 * @param {"start"|"center"|"end"} justification
 * @param {MouseEvent=} event
 * @param {number=} leftOffset
 * @param {number=} topOffset
 * @returns {{x: number, y: number}} - Optimal coordinates
 */
export const computePositionAdjustment = (elementBCR, targetBCR, position = "mouse", justification = "center", event, leftOffset, topOffset) => {
	let x = 0
	let y = 0

	//Handle basic positioning
	if (position === "top") {
		x = Math.round(targetBCR.left + targetBCR.width / 2 - elementBCR.width / 2)
		y = Math.round(targetBCR.top - elementBCR.height)
	} else if (position === "right") {
		x = Math.round(targetBCR.right)
		y = Math.round(targetBCR.top + targetBCR.height / 2 - elementBCR.height / 2)
	} else if (position === "bottom") {
		x = Math.round(targetBCR.left + targetBCR.width / 2 - elementBCR.width / 2)
		y = Math.round(targetBCR.bottom)
	} else if (position === "left") {
		x = Math.round(targetBCR.left - elementBCR.width)
		y = Math.round(targetBCR.top + targetBCR.height / 2 - elementBCR.height / 2)
	} else {
		//"mouse" is default
		//6 is just a magic padding number to give some space from the cursor
		x = event.clientX + 6
		y = event.clientY + 6
	}

	//Handle justification
	if (justification && position !== "mouse") {
		let axis
		if (position === "top" || position === "bottom") {
			axis = "x"
		} else {
			axis = "y"
		}
		const justifiedAdjustment = computeJustificationAdjustment(x, y, elementBCR, targetBCR, axis, justification)
		x = justifiedAdjustment.x
		y = justifiedAdjustment.y
	}

	//Apply provided adjustments (if applicable)
	leftOffset && (x += leftOffset)
	topOffset && (y += topOffset)

	//Adjust for viewport overflow
	const viewportAdjustment = computeViewportAdjustment(x, y, elementBCR.width, elementBCR.height)
	x = viewportAdjustment.x
	y = viewportAdjustment.y

	//Apply any potential offset from the viewports coordinate system.
	//This ensures that the element is positioned from 0,0.
	//Even if a fixed element is set to 0,0 there can still be an offset.
	//This can be caused by transformations outside of the dom flow, like "transform: translate(x,y)" or two nested, fixed elements.
	x -= Math.round(elementBCR.left)
	y -= Math.round(elementBCR.top)

	return { x, y }
}

/**
 * Computes new coordinates for a given element where it is justified with the target on a given axis
 * @param {number} x - Element X coordinate
 * @param {number} y - Element Y coordinate
 * @param {DOMRect} elementBCR - Element bounding client rect
 * @param {DOMRect} targetBCR - Element bounding client rect
 * @param {"x"|"y"} axis - Axis to justify
 * @param {"start"|"center"|"end"} justify - Type of justification
 */
export const computeJustificationAdjustment = (x, y, elementBCR, targetBCR, axis, justify) => {
	const adjustment = { x, y }
	let measurement
	if (axis === "x") {
		measurement = "width"
	} else {
		measurement = "height"
	}
	let offset = 0
	if (justify === "start") {
		offset = elementBCR[measurement] / 2 - targetBCR[measurement] / 2
	} else if (justify === "end") {
		offset = -(elementBCR[measurement] / 2 - targetBCR[measurement] / 2)
	}
	//For center justification we do not need to apply any further changes
	axis === "x" ? (adjustment.x += offset) : (adjustment.y += offset)
	return adjustment
}

/**
 * Using coordates and size attempts to adjust coordinates so that the element does not overflow the viewport
 * @param {number} x - Element X coordinate
 * @param {number} y - Element Y coordinate
 * @param {number} width - Element width
 * @param {number} height - Element height
 * @returns {{x, y}} - Adjusted coordinates that fall within the viewport
 */
export const computeViewportAdjustment = (x, y, width, height) => {
	const adjustment = { x, y }
	//Attempt to adjust for viewport overflow
	if (x < 0) {
		//Overflowing to the left
		adjustment.x -= x
	} else if (x + width > window.innerWidth) {
		//Overflowing to the right
		adjustment.x += window.innerWidth - (x + width)
	}
	if (y < 0) {
		//Overflowing to the top
		adjustment.y -= y
	} else if (y + height > window.innerHeight) {
		//Overflowing to the bottom
		adjustment.y += window.innerHeight - (y + height)
	}
	return adjustment
}

/**
 * Computes if an element that is positioned to a given side of a target should be flipped to the opposite side.
 * Will return true if there is not enough space on the preferred side, but fully fits on the other. Otherwise false.
 * @param {DOMRect} elementBCR
 * @param {DOMRect} targetBCR
 * @param {"top"|"right"|"bottom"|"left"} preferredPosition
 * @returns {boolean} - Should we flip to the other side?
 */
export const computeShouldFlipSide = (elementBCR, targetBCR, preferredPosition) => {
	let axis
	let measurement
	if (preferredPosition === "left" || preferredPosition === "right") {
		axis = "left"
		measurement = "width"
	} else {
		axis = "top"
		measurement = "height"
	}
	if (preferredPosition === "left" || preferredPosition === "top") {
		if (elementBCR[axis] - elementBCR[measurement] > 0) {
			return false
		} else {
			return true
		}
	} else if (preferredPosition === "right" || preferredPosition === "bottom") {
		if (elementBCR[axis] + elementBCR[measurement] + targetBCR[measurement] > window[`inner${measurement[0].toUpperCase() + measurement.slice(1)}`]) {
			return true
		} else {
			return false
		}
	}
	return false
}
