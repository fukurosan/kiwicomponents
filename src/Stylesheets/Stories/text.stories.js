import style from "../../Stylesheets/External/text.scss"
import { createIsolatedStyles } from "../../../.storybook/utility"

/**
 * Text styles
 */
export default {
	title: "CSS/Text",
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
	const code = `
	<div style="display:flex;flex-direction:column;gap:1rem;">

    <h3>Base Typography:</h3>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <div class="subtitle-1">Subtitle 1</div>
    <div class="subtitle-2">Subtitle 2</div>
    <div class="body-1">Body 1</div>
    <div class="body-2">Body 2</div>
    <div class="body-3">Body 3</div>
    <div class="button">Button</div>
    <div class="caption">Caption</div>
    <div class="overline">Overline</div>
    <div><a>Link</a></div>
    <figcaption>Figcaption</figcaption>
    <pre>Pre</pre>
    <br /><br />

    <h3>Header Group:</h3>
    <hgroup>
      <h2>Header</h2>
      <h3>Sub Header</h3>
    </hgroup>
    <br /><br />

	<h3>Semantic Typography:</h3>
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <div><strong>Bold</strong> [strong, b]</div>
      <div><em>Italic</em> [i, em]</div>
      <div><s>Strikethrough</s> [s]</div>
      <div><u>Underline</u> [u]</div>
      <div>Text <sub>Sub</sub> [sub]</div>
      <div>Text <sup>Sup</sup> [sup]</div>
      <div><del>Deleted</del> [del]</div>
      <div><ins>Inserted</ins> [ins]</div>
      <div><abbr title="Abbreviation">Abbr.</abbr> [abbr]</div>
      <div><kbd>Ctrl + S</kbd> [kbd]</div>
      <div><mark>Highlighted</mark> [mark]</div>
      <div><code>Code block</code> [code]</div>
    </div>
    <br /><br />

    <h3>Quotes:</h3>
    <div>
      <blockquote>
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ea obcaecati iusto, temporibus sapiente
        doloremque maiores incidunt magnam libero culpa, nulla eos suscipit, aperiam laborum. Laudantium maxime
        cupiditate nemo fuga."
        <cite>- Someone</cite>
      </blockquote>
    </div>

	</div>
	`

	return createIsolatedStyles(code, style, props)
}
