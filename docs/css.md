# CSS Utility

This library comes with a number of css utilities, as well as CSS styles for most things you might need to quickly get projects up and running. Kiwi Components takes an "almost" classless approach to css. Meaning you can focus on writing solid markup.

The following files can be imported:

| filename       | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| bundle.css     | Full bundle with all stylesheets included                                |
| button.css     | Button styles                                                            |
| tokens.css     | Makes the design system tokens available as CSS variables                |
| layout.css     | Contains different layout modules to help structure elements and content |
| loading.css    | CSS utility for putting elements in a loading state                      |
| forms.css      | Form styling                                                             |
| navigation.css | Styles for navigation related elements                                   |
| progress.css   | Styles \<progress> elements                                              |
| scrollbar.css  | Scroll bar styling                                                       |
| table.css      | Table styling                                                            |
| text.css       | Text styling                                                             |

```javascript
import "kiwicomponents/dist/css/filename"
```

Some of these imports are described in other sections of this documenation.

## Button

By enabling button styles your buttons will automatically look like \<kiwi-button> elements. Your buttons can be configured similarly, but using css classes instead of element attributes.

-   type="primary" becomes class="type-primary"
-   fill="light" becomes class="fill-light"
-   useanimation="" becomes class="useanimation"

You can also apply the attribute role="button" to links to make them look like buttons too.

Example:

```html
<button>Hello World</button>
<button class="type-info fill-light">Hello World</button>
<a role="button">This is a link button</a>
```

<kiwi-scoped-demo>
<div style="display:flex;flex-direction:column;gap:0.5rem;">
<button>Hello World</button>
<button class="type-info fill-light">Hello World</button>
<a href="javascript:void(0)" role="button">This is a link button</a>
</div>
</kiwi-scoped-demo>

## Colors

You can get access to the internal color system of kiwi components and use the colors in your own code. For more information about the color system, check out the theming page.

Example:

```html
<style>
	.colorful-div {
		padding: 1rem;
		background-color: var(--kiwi-primary-color-600);
		color: var(--kiwi-with-dark-color);
	}
</style>
<div class="colorful-div">Hello World!</div>
```

<kiwi-scoped-demo>
<style>
	.colorful-div {
		padding: 1rem;
		background-color: #4f46e5;
		color: white;
	}
</style>
<div class="colorful-div">Hello World!</div>
</kiwi-scoped-demo>

## Layout

You can use a number of different elements to create responsive, easy to understand layouts.

### Containers

You can use the .container class to create a responsive base container on your page to put content in. The container will always leave a little bit of margin on its sides, and never grow beyond a certain point.

```html
<div class="container" style="background-color:aliceblue;padding:1rem;">Hello World</div>
```

<kiwi-scoped-demo>
<div class="container" style="background-color:aliceblue;padding:1rem;">Hello World</div>
</kiwi-scoped-demo>

### Desktop and Mobile

```html
<div class="desktop-only">Hello Desktop</div>
<div class="mobile-only">Hello Mobile</div>
```

<kiwi-scoped-demo>
<div class="desktop-only">Hello Desktop</div>
<div class="mobile-only">Hello Mobile</div>
</kiwi-scoped-demo>

### Grids

Creating responsive grids is super easy. By using the .grid class combined with configuring --kiwi-grid-column-min-measurement to the minimum allowed measurement of the containers inside the grid kiwi components can figure out the rest. You can also use --kiwi-grid-gap to define the gap between elements in the grid.

Example:

```html
<style>
	.grid {
		--kiwi-grid-column-min-measurement: 150px;
		background-color: aliceblue;
		padding: 1rem;
	}
	.grid-item {
		background-color: white;
		padding: 1rem;
		text-align: center;
	}
</style>
<div class="grid">
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
</div>
```

<kiwi-scoped-demo>
<style>
	.grid {
		--kiwi-grid-column-min-measurement: 150px;
		background-color: aliceblue;
		padding: 1rem;
	}
	.grid-item {
		background-color: white;
		padding: 1rem;
		text-align: center;
	}
</style>
<div class="grid">
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
	<div class="grid-item">Hello World</div>
</div>
</kiwi-scoped-demo>

### Flex flows

Sometimes the easiest way of thinking about layouts is content moving from left to right or from top to bottom. using .flex-right and .flex-down you can control this behaviour. You can additionally configure the gap between items using --kiwi-flex-gap.

Example:

```html
<style>
	.box {
		background-color: aliceblue;
		padding: 1rem;
	}
	.item {
		background-color: white;
		padding: 1rem;
		flex: auto;
	}
</style>
<div class="box">
	<div class="flex-down">
		<div class="flex-right">
			<div class="item">Item 1</div>
			<div class="item">Item 2</div>
		</div>
		<div class="item">Item 3</div>
	</div>
</div>
```

<kiwi-scoped-demo>
<style>
    .box {
        background-color: aliceblue;
        padding: 1rem;
    }
    .item {
        background-color: white;
        padding: 1rem;
        flex: auto;
    }
</style>
<div class="box">
    <div class="flex-down">
    	<div class="flex-right">
    		<div class="item">Item 1</div>
    		<div class="item">Item 2</div>
    	</div>
    	<div class="item">Item 3</div>
    </div>
</div>
</kiwi-scoped-demo>

## Loading and Disabled

You can make elements show that they are loading using the aria-busy="true" attribute, as well as disable any element visually and interactively using aria-disabled="true".

The aria-busy attribute will use the :before selector for the element in order to position a spinner in it.

Example:

```html
<button>Hello World</button>
<button aria-busy="true">Hello World</button>
<button aria-disabled="true">Hello World</button>
<button aria-busy="true" aria-disabled="true">Hello World</button>
```

<kiwi-scoped-demo>
<div style="display:flex;flex-direction:column;gap:1rem;">
<button>Hello World</button>
<button aria-busy="true">Hello World</button>
<button aria-disabled="true">Hello World</button>
<button aria-busy="true" aria-disabled="true">Hello World</button>
</div>
</kiwi-scoped-demo>

## Progress

These styles will make standard \<progress> elements look better.

```html
<progress value="25" max="100"></progress>
-
<progress indeterminate></progress>
```

<kiwi-scoped-demo>
<progress value="25" max="100"></progress>
<br><br>
<progress indeterminate></progress>
</kiwi-scoped-demo>

## Meter

These styles will make standard \<meter> elements look better.

```html
<meter value="40" min="0" max="100" low="50" optimum="20" high="80"></meter>
<meter value="70" min="0" max="100" low="50" optimum="20" high="80"></meter>
<meter value="90" min="0" max="100" low="50" optimum="20" high="80"></meter>
```

<kiwi-scoped-demo>
    <meter value="40" min="0" max="100" low="50" optimum="20" high="80"></meter>
	<br><br>
    <meter value="70" min="0" max="100" low="50" optimum="20" high="80"></meter>
	<br><br>
    <meter value="90" min="0" max="100" low="50" optimum="20" high="80"></meter>
</kiwi-scoped-demo>

## Image

These styles will improve your image elements

## Navigation

For all navigation styling you can use --kiwi-navigation-spacing to configure the spacing and padding. All measurements will adjust to this one value

To create an evenly spaced horizontal navigation menu simply use \<nav> elements with \<ul> elements inside of them

```html
<style>
	nav {
		background: aliceblue;
	}
</style>
<nav>
	<ul>
		<li>Left Item</li>
	</ul>
	<ul>
		<li>Right Item 1</li>
		<li>Right Item 2</li>
		<li>Right Item 3</li>
	</ul>
</nav>
```

<kiwi-scoped-demo>
<style>
    nav {
        background: aliceblue;
    }
</style>
<nav>
	<ul>
		<li>Left Item</li>
	</ul>
	<ul>
		<li>Right Item 1</li>
		<li>Right Item 2</li>
		<li>Right Item 3</li>
	</ul>
</nav>
</kiwi-scoped-demo>

Alternatively you can create a vertical menu by putting the \<nav> element inside of an \<aside> element.

```html
<style>
	aside {
		background: aliceblue;
	}
</style>
<aside>
	<nav>
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ul>
	</nav>
</aside>
```

<kiwi-scoped-demo>
<style>
	aside {
		background: aliceblue;
	}
</style>
<aside>
  <nav>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </nav>
</aside>
</kiwi-scoped-demo>

By setting the attribute aria-label="breadcrumb" on your \<nav> element you can create a breadcrumb element.

```html
<style>
	nav {
		background: aliceblue;
	}
</style>
<nav aria-label="breadcrumb">
	<ul>
		<li><span>Item 1</span></li>
		<li><span>Item 2</span></li>
		<li><span>Item 3</span></li>
	</ul>
</nav>
```

<kiwi-scoped-demo>
<style>
	nav {
		background: aliceblue;
	}
</style>
<nav aria-label="breadcrumb">
	<ul>
		<li><span>Item 1</span></li>
		<li><span>Item 2</span></li>
		<li><span>Item 3</span></li>
	</ul>
</nav>
</kiwi-scoped-demo>
