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
	/** The main content of the window */
	body?: string | HTMLElement | ((...args: any[]) => HTMLElement)
	/** A custom header for the window */
	header?: string | HTMLElement | ((...args: any[]) => HTMLElement)
	/** The footer content for the window */
	footer?: string | HTMLElement | ((...args: any[]) => HTMLElement)
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