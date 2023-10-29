export interface OpenDrawerOptions {
	/** If set to true a close icon will be added in the top corner closest to the viewport */
	closeIcon?: boolean
	/** If set to true the backdrop will be visible */
	backdrop?: boolean
	/** Header text. */
	title?: string
	/** subtitle text. */
	subtitle?: string
	/** Determines if the drawer opens from the left or right of the screen. */
	direction?: "right" | "left"
	/** The main content of the drawer */
	body?: string | HTMLElement | ((...args: any[]) => HTMLElement)
	/** A type can be configured to change the colors of the drawer header. */
	type?: "primary" | "secondary" | "neutral" | "info" | "success" | "error" | "warning"
}