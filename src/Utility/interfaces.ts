export interface OpenWindowOptions {
	/** If set to any value the minimize button will be added to the header. */
	minimizable?: boolean
	/** If set to any value the maximize button will be added to the header and if the header is double clicked the window will maximize. */
	maximizable?: boolean
	/** If set to any value the close button will be added to the header. */
	closebutton?: boolean
	/** If set to any value the window will be dragable. */
	draggable?: boolean
	/** If set to any value the window will be resizable. */
	resizable?: boolean
	/** If set to any value the window will be centered in the viewport. */
	centered?: boolean
	/** If set to any value the window's size will be automatically adjusted based on its content and the viewport. */
	autosize?: boolean
	/** configures the backdrop of the window. */
	modality?: "none"|"clickable"|"disabled"
	/** Determines the general dimensions of the window's sections. */
	scale?: "none"|"compact"|"small"|"medium"|"large"
	/** Header text. */
	title?: string
	/** Header icon. */
	icon?: string
	/** If set to any value no animations will take place. */
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
