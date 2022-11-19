# Forms

Kiwi Components comes with a few form utilities that can be used to quickly create html forms. This includes both global styles that can be injected, as well as helper elements for formatting the forms properly.

By updating a series of css variables the look and feel of your forms can change according to your needs.

## Enabling Global Form Stylesheets

To enable the global form stylesheets you can use the injectStyle function, and set forms to true.

```javascript
import { injectStyle } from "kiwicomponents"
kiwicomponents.injectStyle({
	forms: true
})
```

After doing so all your standard form elements should now look better.

## Formatting forms using \<kiwi-form-flow>

\<kiwi-form-flow> is an element that allows you to compose forms by thinking of them in groups of columns and rows.

Quick example:

```html
<kiwi-form-flow direction="column">
	<kiwi-form-flow direction="row" label="User Info">
		<input placeholder="First Name" />
		<input placeholder="Last Name" />
	</kiwi-form-flow>
	<kiwi-form-flow direction="row">
		<input placeholder="Username" />
		<input placeholder="Password" type="password" />
	</kiwi-form-flow>
	<kiwi-form-flow direction="row" label="Additional Info">
		<input placeholder="Disabled" disabled />
		<input placeholder="Required" required />
		<select>
			<option>Option 1</option>
			<option>Option 2</option>
			<option>Option 3</option>
		</select>
	</kiwi-form-flow>
	<kiwi-form-flow direction="row" label="Checkboxes">
		<input type="checkbox" />
		<input type="radio" />
		<input type="checkbox" class="kiwi-switch" />
		<input type="checkbox" disabled checked />
		<input type="radio" disabled checked />
		<input type="checkbox" class="kiwi-switch" disabled checked />
	</kiwi-form-flow>
	<kiwi-form-flow direction="row" label="Range Slider">
        <input type="range">
        <input type="range" disabled>
    </kiwi-form-flow>
</kiwi-form-flow>
```

<kiwi-form-flow direction="column">
	<kiwi-form-flow direction="row" label="User Info">
		<input placeholder="First Name" />
		<input placeholder="Last Name" />
	</kiwi-form-flow>
	<kiwi-form-flow direction="row">
		<input placeholder="Username" />
		<input placeholder="Password" type="password" />
	</kiwi-form-flow>
	<kiwi-form-flow direction="row" label="Additional Info">
		<input placeholder="Disabled" disabled />
		<input placeholder="Required" required />
		<select>
			<option>Option 1</option>
			<option>Option 2</option>
			<option>Option 3</option>
		</select>
	</kiwi-form-flow>
	<kiwi-form-flow direction="row" label="Checkboxes">
		<input type="checkbox" />
		<input type="radio" />
		<input type="checkbox" class="kiwi-switch" />
		<input type="checkbox" disabled checked />
		<input type="radio" disabled checked />
		<input type="checkbox" class="kiwi-switch" disabled checked />
	</kiwi-form-flow>
	<kiwi-form-flow direction="row" label="Range Slider">
        <input type="range">
        <input type="range" disabled>
    </kiwi-form-flow>
</kiwi-form-flow>

---

The following attributes can be set on the element:

| Attribute | Type               | Description                                                             |
| --------- | ------------------ | ----------------------------------------------------------------------- |
| Direction | "row" \| "columns" | Can be set to "row" (horizontal) or "column" (vertical)                 |
| Label     | string             | Optional label that will be placed in the top left corner of the layout |

## CSS variables

The following CSS variables can be set to configure your forms:

| Variable                         | Description                              |
| -------------------------------- | ---------------------------------------- |
| --kiwi-form-padding              | Padding for form elements                |
| --kiwi-form-font-size            | Font size for form elements              |
| --kiwi-form-line-height          | Line height for form elements            |
| --kiwi-form-color                | Color for form elements                  |
| --kiwi-form-background           | Background for form elements             |
| --kiwi-form-hover-background     | Hover background for form elements       |
| --kiwi-form-border               | Border for form elements                 |
| --kiwi-form-border-radius        | Border radius for form elements          |
| --kiwi-form-animation-duration   | Animation duration for form elements     |
| --kiwi-form-margin               | Margin between label and layout          |
| --kiwi-form-focus-outline        | Outline for focused form elements        |
| --kiwi-form-placeholder-color    | Color for form placeholder texts         |
| --kiwi-form-checkbox-dark-color  | Dark color for checkboxes                |
| --kiwi-form-checkbox-light-color | Light color for checkboxes               |
| --kiwi-form-gap                  | Gap size between elements in form layout |
