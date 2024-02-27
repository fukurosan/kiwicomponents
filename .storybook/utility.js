import typoraphy from "../src/Stylesheets/External/text.scss"

export const createIsolatedStyles = (code, style, props) => {
	//We have to hide the global css from Storybook with some clever use of shadow doms
	const container = document.createElement("div")
	Object.keys(props).forEach(key => {
		if (!key.startsWith("--") || !props[key]) {
			return
		}
		container.style.setProperty(key, props[key])
	})
	container.attachShadow({ mode: "open" }).innerHTML = `${code}<style>${typoraphy}${style}</style>`.replace(/:root/g, "*")
	return container
}
