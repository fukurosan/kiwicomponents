import style from "../../Stylesheets/External/tokens.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Tokens styles
 */
export default {
	title: "CSS/Tokens",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
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
	const getColours = () => {
		const bases = ["primary", "secondary", "neutral", "info", "success", "warning", "error"]
		const scales = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
		const result = bases.reduce((acc, base) => {
			acc = `${acc}
      <b>${base}</b>
      <div style="display:flex;gap:1rem;">
      `
			scales.forEach(scale => {
				acc = `${acc}
        <div style="height:3.5rem;flex:auto;background-color:var(--kiwi-${base}-color-${scale});color:${
	parseInt(scale) > 400 ? "var(--kiwi-with-dark-color)" : "var(--kiwi-with-light-color)"
};">${scale}</div>`
			})
			acc = `${acc}
      <div style="height:3.5rem;flex:auto;background:var(--kiwi-${base}-color-gradient);color:var(--kiwi-with-dark-color);">Gradient</div>
      </div>
      `
			return acc
		}, "")

		return `<div style="display:flex;flex-direction:column;gap:1rem;">
    ${result}

    <h3>Light text</h3>
    <div style="background-color:var(--kiwi-black);padding:2rem;">
      <div style="color:var(--kiwi-with-dark-color);">With Dark Color</div>
      <div style="color:var(--kiwi-with-dark-color-faded);">With Dark Color Faded</div>
    </div>

    <h3>Dark text</h3>
    <div style="background-color:var(--kiwi-white);padding:2rem;">
      <div style="color:var(--kiwi-with-light-color);">With Light Color</div>
      <div style="color:var(--kiwi-with-light-color-faded);">With Light Color Faded</div>
    </div>
    </div>`
	}

	const getShadows = () => {
		const shadows = [
			"--kiwi-shadow-small",
			"--kiwi-shadow-medium",
			"--kiwi-shadow-large",
			"--kiwi-shadow-extra-large",
			"--kiwi-shadow-subtle-bottom",
			"--kiwi-shadow-subtle-top"
		]
		const result = shadows.reduce((acc, shadow) => {
			return `${acc}
      <div style="height:100px;width:50%;margin:auto;box-shadow:var(${shadow});">${shadow}</div>
      `
		}, "")
		return `<div style="display:flex;flex-direction:column;gap:1rem;">
      ${result}
    </div>
    `
	}

	const getBorderRadiuses = () => {
		const radiuses = ["--kiwi-border-radius-small", "--kiwi-border-radius-medium", "--kiwi-border-radius-large"]
		const result = radiuses.reduce((acc, radius) => {
			return `${acc}
      <div style="height:100px;width:50%;margin:auto;border:1px solid black;border-radius:var(${radius});">${radius}</div>
      `
		}, "")
		return `<div style="display:flex;flex-direction:column;gap:1rem;">
      ${result}
    </div>
    `
	}

	const getFonts = () => {
		const fonts = ["--kiwi-font-family-heading", "--kiwi-font-family-body"]
		const result = fonts.reduce((acc, font) => {
			return `${acc}
      <div style="font-family:var(${font});">${font}</div>
      `
		}, "")
		return `<div style="display:flex;flex-direction:column;gap:1rem;">
      ${result}
    </div>
    `
	}

	const code = `
	<div style="display:flex;flex-direction:column;gap:1rem;">
    <h3>Colors</h3>
    <div>  
      ${getColours()}
    </div>
    <h3>Shadows</h3>
    <div>
      ${getShadows()}
    </div>
    <h3>Border Radiuses</h3>
    <div>
      ${getBorderRadiuses()}
    </div>
    <h3>Font Families</h3>
    <div>
      ${getFonts()}
    </div>
  </div>
	`

	return createIsolatedStyles(code, style, props)
}
