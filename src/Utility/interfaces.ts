export interface OpenWindowOptions {
	/** If true the window will have no built-in header. */
	noheader?: boolean
	/** If true the window will have no built-in footer. */
	nofooter?: boolean
	/** If true the window will have no minimize button. */
	nominimize?: boolean
	/** If true the window will have no maximize button. */
	nomaximize?: boolean
	/** If true the window will have no close button. */
	noclose?: boolean
	/** If true the window will not be draggable. */
	nodrag?: boolean
	/** If true the window will not be resizable. */
	noresize?: boolean
	/** Determines if the window has a backdrop, and if the backdrop closes the window when clicked. */
	modality?: "none" | "clickable" | "disabled"
	/** Determines the general dimensions of the window's sections. */
	mode?: "large" | "default" | "compact"
	/** The title for the modal header. */
	title?: string
	/** Icon URL for the window. */
	icon?: string
	/** If set the window will not animate. */
	noanimation?: boolean
	/** The main content of the window */
	body?: string | HTMLElement | ((...args: any[]) => HTMLElement)
	/** A custom header for the window */
	header?: string | HTMLElement | ((...args: any[]) => HTMLElement)
	/** The footer content for the window */
	footer?: string | HTMLElement | ((...args: any[]) => HTMLElement)
}

export interface showToastOptions {
	/** Optional icon for the toast. */
	icon?: string
	/** Optional title for the toast. */
	title?: string
	/** Optional body for the toast. */
	body?: string
	/** Optional rich, custom content for the toast. Usually used instead of title/body */
	html?: string | HTMLElement | (() => HTMLElement)
	/** How many milliseconds before the toast should remove itself. */
	timeout?: number
	/** A type can be configured to change the colors of the toast. */
	type?: "primary" | "secondary" | "neutral" | "info" | "success" | "error" | "warning"
	/** If true the toast will not animate.*/
	noanimation?: boolean
	/** If true the toast will not close when clicked. */
	noclickclose?: boolean
	/** Should the toast be placed towards the top of the screen? */
	top?: boolean
	/** Should the toast be placed towards the right of the screen? */
	right?: boolean
	/** Should the toast be placed towards the bottom of the screen? */
	bottom?: boolean
	/** Should the toast be placed towards the left of the screen? */
	left?: boolean
}

export interface StyleInjectionOptions {
	scrollbar?: boolean
	typography?: boolean
}
