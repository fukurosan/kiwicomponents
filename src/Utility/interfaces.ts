import { IWindowElement } from "../Components/Window/interface"

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
	modality?: "none" | "clickable" | "disabled"
	/** Determines the general dimensions of the window's sections. */
	scale?: "none" | "compact" | "small" | "medium" | "large"
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

export interface showToastOptions {
	/** Optional icon for the toast. */
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
	/** If true the toast will not animate.*/
	noanimation?: boolean
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

export interface confirmOptions {
	/** Message body to be confirmed */
	message?: string | HTMLElement | (() => string | HTMLElement)
	/** Dialog title */
	title?: string
	/** Label on the cancel button */
	cancelLabel?: string
	/** Label on the confirm button */
	confirmLabel?: string
}

export interface showSpinnerOptions {
	/** Optional message to display on the spinner */
	message?: string | HTMLElement | (() => string | HTMLElement)
}

export interface showSpinnerDialog {
	/** Function that closes the spinner upon execution */
	close: () => void
	/** The dialog HTML element */
	dialog: IWindowElement
	/** Function to update the message body in the spinner dialog */
	updateMessage: (newMessage: string | HTMLElement | (() => string | HTMLElement)) => void
}

export interface alertOptions {
	/** Title for the alert dialog */
	title?: string
	/** Message body for the alert dialog */
	message: string | HTMLElement | (() => string | HTMLElement)
	/** Button text for the OK button */
	buttonText?: string
	/** Type of alert */
	type?: "success" | "question" | "warning" | "error"
	/** Optional custom icon for the alert */
	icon?: string
}

export interface alertDialog {
	/** The dialog HTML element */
	dialog: IWindowElement
	/** A promise that will resolve when the button of the alert is clicked  */
	closeButtonListener: Promise<any>
}

export interface promptOptions {
	/** An optional title to be displayed */
	message?: string
	/** Attributes to be applied on the input field element, or a form as an HTML element or a string */
	formOrInputAttributes?: string | HTMLFormElement | { [key: string]: any }
	/** Label for the cancel button */
	cancelLabel: string
	/** Label for the confirm button */
	confirmLabel: string
}

export interface StyleInjectionOptions {
	/** Should scrollbars be injected? */
	scrollbar?: boolean
	/** Should typography be injected? */
	typography?: boolean
}
