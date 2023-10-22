export interface showToastOptions {
	/** Optional icon for the toast. Can be either a URL or "success", "warning", "error", "info" */
	icon?: string
	/** Optional title for the toast. */
	title?: string
	/** Optional subtitle for the toast. */
	subtitle?: string
	/** Optional rich, custom content for the toast. Usually used instead of title/body */
	html?: string | HTMLElement | (() => HTMLElement)
	/** How many milliseconds before the toast should remove itself. */
	timeout?: number
	/** A type can be configured to change the colors of the toast. */
	type?: "primary" | "secondary" | "neutral" | "info" | "success" | "error" | "warning"
	/** Configures how a user can interact to close the toast. Icon = X button, click = click anywhere, none = not closable. */
	closeMode?: "icon" | "click" | "none"
	/** Should the toast be placed towards the top of the screen? */
	top?: boolean
	/** Should the toast be placed towards the right of the screen? */
	right?: boolean
	/** Should the toast be placed towards the bottom of the screen? */
	bottom?: boolean
	/** Should the toast be placed towards the left of the screen? */
	left?: boolean
}
