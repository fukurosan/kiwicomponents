import { showSpinner } from "../index"

/**
 * Opens a modal spinner window that prevents the user from interacting with the page until it has been closed
 */
export default {
	title: "Utility/Dialog Manager/showSpinner()",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	},
	argTypes: {
		message: {
			control: "text",
			description: "Message for the spinner",
			table: { type: { summary: "" }, defaultValue: { summary: "" } }
		}
	}
}

export const Playground = {
	parameters: {
		docs: {
			story: { inline: true }
		}
	}
}

const createComponent = props => {
	const show = () => {
		const spinner = showSpinner(props)
		setTimeout(() => {
			spinner.close()
		}, 2000)
	}

	const showAndChange = () => {
		const spinner = showSpinner(props)
		setTimeout(() => {
			spinner.updateMessage("A second message!")
			setTimeout(() => {
				spinner.close()
			}, 2000)
		}, 2000)
	}

	const showButton = document.createElement("button")
	showButton.innerHTML = "showSpinner() (for 2 seconds)"
	showButton.addEventListener("click", show)

	const showAndChangeButton = document.createElement("button")
	showAndChangeButton.innerHTML = "showSpinner() (Change message then close)"
	showAndChangeButton.addEventListener("click", showAndChange)

	const container = document.createElement("div")
	container.appendChild(showButton)
	container.appendChild(showAndChangeButton)

	return container
}
