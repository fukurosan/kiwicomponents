# Theming

The components of this project can be themed by using CSS variables. For more information about typography (fonts, text, etc) check the Typography section. For more information about scrollbars check the Scrollbar section.

## Colors

Some components like toasts and buttons can be configured with a type that changes their color. All these colors are configurable using CSS variables. The default colors are based on TailwindCSS.

"with" colors are used to determine what color goes well in the foreground of a given background color. You can configure two sets of foreground colors, with a predetermined threshold within the color scales.

If you want to have access to all color variables inside of your project you can import them:

```javascript
import "kiwicomponents/dist/variableexport.css"
//OR
import "kiwicomponents/dist/bundle.css"
```

The following CSS color variables can be set:

| Variable Name                 |
| ----------------------------- |
| --kiwi-black                  |
| --kiwi-white                  |
| --kiwi-with-dark-color        |
| --kiwi-with-dark-color-faded  |
| --kiwi-with-light-color       |
| --kiwi-with-light-color-faded |
| --kiwi-primary-color-50       |
| --kiwi-primary-color-100      |
| --kiwi-primary-color-200      |
| --kiwi-primary-color-300      |
| --kiwi-primary-color-400      |
| --kiwi-primary-color-500      |
| --kiwi-primary-color-600      |
| --kiwi-primary-color-700      |
| --kiwi-primary-color-800      |
| --kiwi-primary-color-900      |
| --kiwi-secondary-color-50     |
| --kiwi-secondary-color-100    |
| --kiwi-secondary-color-200    |
| --kiwi-secondary-color-300    |
| --kiwi-secondary-color-400    |
| --kiwi-secondary-color-500    |
| --kiwi-secondary-color-600    |
| --kiwi-secondary-color-700    |
| --kiwi-secondary-color-800    |
| --kiwi-secondary-color-900    |
| --kiwi-neutral-color-50       |
| --kiwi-neutral-color-100      |
| --kiwi-neutral-color-200      |
| --kiwi-neutral-color-300      |
| --kiwi-neutral-color-400      |
| --kiwi-neutral-color-500      |
| --kiwi-neutral-color-600      |
| --kiwi-neutral-color-700      |
| --kiwi-neutral-color-800      |
| --kiwi-neutral-color-900      |
| --kiwi-info-color-50          |
| --kiwi-info-color-100         |
| --kiwi-info-color-200         |
| --kiwi-info-color-300         |
| --kiwi-info-color-400         |
| --kiwi-info-color-500         |
| --kiwi-info-color-600         |
| --kiwi-info-color-700         |
| --kiwi-info-color-800         |
| --kiwi-info-color-900         |
| --kiwi-success-color-50       |
| --kiwi-success-color-100      |
| --kiwi-success-color-200      |
| --kiwi-success-color-300      |
| --kiwi-success-color-400      |
| --kiwi-success-color-500      |
| --kiwi-success-color-600      |
| --kiwi-success-color-700      |
| --kiwi-success-color-800      |
| --kiwi-success-color-900      |
| --kiwi-warning-color-50       |
| --kiwi-warning-color-100      |
| --kiwi-warning-color-200      |
| --kiwi-warning-color-300      |
| --kiwi-warning-color-400      |
| --kiwi-warning-color-500      |
| --kiwi-warning-color-600      |
| --kiwi-warning-color-700      |
| --kiwi-warning-color-800      |
| --kiwi-warning-color-900      |
| --kiwi-error-color-50         |
| --kiwi-error-color-100        |
| --kiwi-error-color-200        |
| --kiwi-error-color-300        |
| --kiwi-error-color-400        |
| --kiwi-error-color-500        |
| --kiwi-error-color-600        |
| --kiwi-error-color-700        |
| --kiwi-error-color-800        |
| --kiwi-error-color-900        |

## Border Radius

Border radius can be set using the following variables:

| Variable Name               |
| --------------------------- |
| --kiwi-border-radius-small  |
| --kiwi-border-radius-medium |
| --kiwi-border-radius-large  |

## Shadows

Shadows can be set using the following variables:

| Variable Name      |
| ------------------ |
| kiwi-shadow-small  |
| kiwi-shadow-medium |
| kiwi-shadow-large  |

## Text

| Variable Name              |
| -------------------------- |
| --kiwi-font-family-heading |
| --kiwi-font-family-body    |
