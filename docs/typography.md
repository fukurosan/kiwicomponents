# Typography

Kiwi Components comes with responsive typography. This typography is already integrated into all components in the library, but can also be be applied globally to your project. The typography will modify standard elements like headers (\<h1>, \<h2>, \<h3>, etc) and will add a few css-classes that can be used to style your elements.

By updating your typography settings you can also adjust what fonts are used by the various components of this library.

## Enabling Global Typography

To enable the global typography you can use the injectStyle function, and set typography to true.

```javascript
import { injectStyle } from "kiwicomponents"
kiwicomponents.injectStyle({
	typography: true
})
```

## CSS Classes

By enabling the global typography all your heading elements will now be styled and responsive in size. All other elements will by default be styled as "body-1" (see below).

To apply a certain type of look and feel to your different elements in your project you simply apply the most suitable class.

CSS Classes:

-   .subtitle-1 (For primary subtitles)
-   .subtitle-2 (For smaller secondary subtitles)
-   .body-1 (For most text)
-   .body-2 (For smaller secondary text)
-   .button (For button labels)
-   .caption (For captions)
-   .overline (For overline)

## Fonts

You can configure the fonts that are used by the typography. This will also affect the fonts used inside of the different components of the library.

The following CSS variables can be set:

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| --kiwi-font-family-heading | Font used by all headers     |
| --kiwi-font-family-body    | Font used by everything else |
