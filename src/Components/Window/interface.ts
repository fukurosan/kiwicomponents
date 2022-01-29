export interface WindowElement extends HTMLElement {
	/** Closes the window */
	close: () => any
	/** Will hide the window */
	minimize: () => any
	/** Returns true of the window is minimized */
	isMinimized: () => any
	/** Will show the window */
	reset: () => any
	/** toggles the window size between the original size and the maximize size */
	maximize: () => any
	/** Returns true if the window is maximized */
	isMaximized: () => any
	/** Brings the window in front */
	bringToFront: () => any
	/** Sets the position of the window */
	setPosition: (left: number, top: number) => any
	/** Sets the size of the window. Can be either integer (pixel) or string. */
	setSize: (width: number, height: number) => any
	/** Auto-sizes the window based on its content. */
	scaleToFit: () => any
	/** Centers the window in the viewport. */
	center: () => any
}
