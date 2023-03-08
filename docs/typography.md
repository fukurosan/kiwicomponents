# Text

Kiwi Components comes with both responsive typography, css for standard text html elements, as well as some other tools. The text css module will modify standard elements like headers (\<h1>, \<h2>, \<h3>, etc) and will add a few css-classes that can be used to style your elements.

import either only the specific css file, or the full bundle.

```javascript
import "kiwicomponents/dist/text.css"
//OR
import "kiwicomponents/dist/bundle.css"
```

## Typography

The typography uses the a similar system to Material, but adds a few additional text types. All header elements and links will automatically be styled, you can also apply the following css classes:

-   .h1 (Heading 1)
-   .h2 (Heading 2)
-   .h3 (Heading 3)
-   .h4 (Heading 4)
-   .h5 (Heading 5)
-   .h6 (Heading 6)
-   .subtitle-1 (For primary subtitles)
-   .subtitle-2 (For smaller secondary subtitles)
-   .body-1 (For large text)
-   .body-2 (For most text)
-   .body-3 (For small text)
-   .button (For button labels)
-   .link (For link labels)
-   .caption (For captions)
-   .overline (For overline)

Example:

```html
<div style="display:flex;flex-direction:column;gap:0.5rem;">
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
	<a href="#">Link</a>
</div>
```

<kiwi-scoped-demo>
<div style="display:flex;flex-direction:column;gap:0.5rem;">
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
	  <a href="#">Link</a>
</div>
</kiwi-scoped-demo>

## Header Groups

When grouping two headers inside of \<hgroup> elements the second one will be faded.

Example:

```html
<hgroup>
	<h2>Header</h2>
	<h3>Sub Header</h3>
</hgroup>
```

<kiwi-scoped-demo>
<hgroup>
  <h2>Header</h2>
  <h3>Sub Header</h3>
</hgroup>
</kiwi-scoped-demo>

## Spoilers

Use the .spoiler class to hide spoilers. When the element is focused or active the text will be revealed.

Example:

```html
<div class="spoiler">Citrus pepper contains no citrus fruit</div>
```

<kiwi-scoped-demo>
<div class="spoiler">Citrus pepper contains no citrus fruit</div>
</kiwi-scoped-demo>

## Text Types

You can use native HTML markup to render different types of text.

Example:

```html
<strong>Bold</strong>
<!-- can be either <strong> or <b> -->
<em>Italic</em>
<!-- can be either <i> or <em> -->
<s>Strikethrough</s>
<u>Underline</u>
<div>Text <sub>Sub</sub></div>
<div>Text <sup>Sup</sup></div>
<del>Deleted</del>
<ins>Inserted</ins>
<abbr title="Abbreviation">Abbr.</abbr>
<kbd>Ctrl + S</kbd>
<mark>Highlighted</mark>
<code>Code block</code>
```

<kiwi-scoped-demo>
<div style="display:flex;flex-direction:column;gap:1rem;">
<div><strong>Bold</strong></div>
<div><em>Italic</em></div>
<div><s>Strikethrough</s></div>
<div><u>Underline</u></div>
<div><div>Text <sub>Sub</sub></div></div>
<div><div>Text <sup>Sup</sup></div></div>
<div><del>Deleted</del></div>
<div><ins>Inserted</ins></div>
<div><abbr title="Abbreviation">Abbr.</abbr></div>
<div><kbd>Ctrl + S</kbd></div>
<div><mark>Highlighted</mark></div>
<div><code>Code block</code></div>
</div>
</kiwi-scoped-demo>

## Quotes

You can create styled quotes using standard HTML elements.

Example:

```html
<blockquote>
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ea obcaecati iusto, temporibus sapiente doloremque maiores incidunt magnam libero culpa,
	nulla eos suscipit, aperiam laborum. Laudantium maxime cupiditate nemo fuga."
	<cite>- The Computer</cite>
</blockquote>
```

<kiwi-scoped-demo>
  <blockquote>
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ea obcaecati iusto, temporibus sapiente
    doloremque maiores incidunt magnam libero culpa, nulla eos suscipit, aperiam laborum. Laudantium maxime
    cupiditate nemo fuga."
    <cite>- Someone</cite>
  </blockquote>
</kiwi-scoped-demo>

### Text Selection

All text selections will by default use a variant of your primary color.

<kiwi-scoped-demo>
<div>Select this text.</div>
</kiwi-scoped-demo>

## Fonts

You can configure the fonts that are used for the typography. This will also affect the fonts used inside of the different components of the library.

The following CSS variables can be set:

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| --kiwi-font-family-heading | Font used by all headers     |
| --kiwi-font-family-body    | Font used by everything else |
