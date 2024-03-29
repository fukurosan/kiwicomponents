# Forms

Kiwi Components comes with almost classless CSS styles that allow you to create beautiful forms without thinking about it. You can also use the flow css utility classes to structure your forms without much effort.

The css for forms is almost completely classless, so you can focus on writing only the html.

## Enabling Form CSS

To enable the global form stylesheets you can simply import the css file, either for forms specifically or for the whole bundle.

```javascript
import "kiwicomponents/dist/forms.css"
//OR
import "kiwicomponents/dist/bundle.css"
```

After doing so all your standard form elements should now look better.

## Quick example:

```html
<form>
	<div class="flex-down">
		<div class="flex-right">
			<label>
				First Name
				<input placeholder="First Name" />
			</label>
			<label>
				Last Name
				<input placeholder="Last Name" />
			</label>
		</div>
		<div class="flex-right">
			<input placeholder="Username" />
			<input placeholder="Password" type="password" />
		</div>
		<fieldset>
			<legend>Additional info</legend>
			<div class="flex-right">
				<input placeholder="Disabled" disabled />
				<input placeholder="Required" required />
				<select>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</select>
			</div>
		</fieldset>
		<fieldset class="label">
			<legend>Additional info</legend>
			<div class="flex-right">
				<input placeholder="Disabled" disabled />
				<input placeholder="Required" required />
				<select>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</select>
			</div>
		</fieldset>
		<label>
			Multiple
			<select multiple size="4">
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
			</select>
		</label>
		<label>Checkboxes</label>
		<div class="flex-right">
			<input type="checkbox" />
			<input type="radio" />
			<input type="checkbox" role="switch" />
			<input type="checkbox" disabled checked />
			<input type="radio" disabled checked />
			<input type="checkbox" role="switch" disabled checked />
		</div>
		<label>
			<input type="checkbox" />
			With a text
		</label>					
		<label>Range Slider</label>
		<div class="flex-right">
			<input type="range" />
			<input type="range" disabled />
		</div>
		<label>Color</label>
		<div>
			<input type="color" />
		</div>
		<label>File Uploads</label>
		<div>
			<input type="file" />
		</div>
		<label>Date and Time</label>
		<div class="flex-right">
			<input type="Date" />
			<input type="Time" />
		</div>
		<label>Text Area</label>
		<div>
			<textarea></textarea>
		</div>
	</div>
</form>
```

<kiwi-scoped-demo>
<form>
	<div class="flex-down">
		<div class="flex-right">
			<label>
				First Name
				<input placeholder="First Name" />
			</label>
			<label>
				Last Name
				<input placeholder="Last Name" />
			</label>
		</div>
		<div class="flex-right">
			<input placeholder="Username" />
			<input placeholder="Password" type="password" />
		</div>
		<fieldset>
			<legend>Additional info</legend>
			<div class="flex-right">
				<input placeholder="Disabled" disabled />
				<input placeholder="Required" required />
				<select>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</select>
			</div>
		</fieldset>
		<fieldset class="label">
			<legend>Additional info</legend>
			<div class="flex-right">
				<input placeholder="Disabled" disabled />
				<input placeholder="Required" required />
				<select>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</select>
			</div>
		</fieldset>
		<label>
			Multiple
			<select multiple size="4">
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
			</select>
		</label>
		<label>Checkboxes</label>
		<div class="flex-right">
			<input type="checkbox" />
			<input type="radio" />
			<input type="checkbox" role="switch" />
			<input type="checkbox" disabled checked />
			<input type="radio" disabled checked />
			<input type="checkbox" role="switch" disabled checked />
		</div>
		<label>
			<input type="checkbox" />
			With a text
		</label>
		<label>Range Slider</label>
		<div class="flex-right">
			<input type="range" />
			<input type="range" disabled />
		</div>
		<label>Color</label>
		<div>
			<input type="color">
		</div>
		<label>File Uploads</label>
		<div>
			<input type="file">
		</div>
		<label>Date and Time</label>
		<div class="flex-right">
			<input type="Date">
			<input type="Time">
		</div>
		<label>Text Area</label>
		<div>
			<textarea></textarea>
		</div>
	</div>
</form>
</kiwi-scoped-demo>

---

## Elements

The following elements will be styled.

### \<Input>

Most types of input elements will be styled. Including both text based, checkboxes, ranges, and so on. Textarea elements are also covered.

<kiwi-scoped-demo>
	<input type="text" placeholder="type='text'" style="margin-bottom:1rem;">
	<input type="checkbox" style="margin-bottom:1rem;">
	<input type="range" style="margin-bottom:1rem;">
	<textarea style="margin-bottom:1rem;"></textarea>
</kiwi-scoped-demo>

#### Switches

To create a switch, simply add "role='switch'" on any \<input type="checkbox"> element:

<kiwi-scoped-demo>
	<input type="checkbox" role="switch">
</kiwi-scoped-demo>

### \<select>

Kiwi components support both standard single select \<select> elements as well as multi select.

\<select>

<kiwi-scoped-demo>
<select>
<option>Option 1</option>
<option>Option 2</option>
<option>Option 3</option>
<option>Option 4</option>
<option>Option 5</option>
</select>
</kiwi-scoped-demo>

\<select multiple size="4">

<kiwi-scoped-demo>
<select multiple size="4">
<option>Option 1</option>
<option>Option 2</option>
<option>Option 3</option>
<option>Option 4</option>
<option>Option 5</option>
</select>
</kiwi-scoped-demo>

### \<label>

You can Create labels to label your input fields using standrd markdown

```html
<form>
	<label>
		Some Label
		<input />
	</label>
</form>
```

<kiwi-scoped-demo>
<form>
	<label>
		Some Label
		<input />
	</label>
</form>
</kiwi-scoped-demo>

### \<fieldset> and \<legend>

Fieldset and legens elements can be used to group or label multiple input fields

To create a visible group simply use the elements as always. To create a label for multiple elements, set "role='label'" on the fieldset element.

```html
<form>
	<fieldset>
		<legend>Dimensions</legend>
		<div style="display:flex;gap:1rem;">
			<input placeholder="Height" />
			<input placeholder="Weight" />
		</div>
	</fieldset>
	<fieldset class="label">
		<legend>Dimensions</legend>
		<div style="display:flex;gap:1rem;">
			<input placeholder="Height" />
			<input placeholder="Weight" />
		</div>
	</fieldset>
</form>
```

<kiwi-scoped-demo>
<form>
	<fieldset>
		<legend>Dimensions</legend>
		<div style="display:flex;gap:1rem;">
			<input placeholder="Height" />
			<input placeholder="Weight" />
		</div>
	</fieldset>
	<br>
	<fieldset class="label">
		<legend>Dimensions</legend>
		<div style="display:flex;gap:1rem;">
			<input placeholder="Height" />
			<input placeholder="Weight" />
		</div>
	</fieldset>
</form>
</kiwi-scoped-demo>

---

## Input element icons

You can add Icons to your input fields easily by simply setting the --kiwi-input-icon attribute on element to a valid css url(). This will automatically format the input field to display the icon on the left side.

```html
<form>
	<input
		style="--kiwi-input-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
	/>
</form>
```

<kiwi-scoped-demo>
<form>
	<input
		style="--kiwi-input-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='black' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
	/>
</form>
</kiwi-scoped-demo>
