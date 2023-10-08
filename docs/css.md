# CSS Utility

This library comes with a number of css utilities, as well as CSS styles for most things you might need to quickly get projects up and running. Kiwi Components takes an "almost" classless approach to css. Meaning you can focus on writing solid markup.

The following files can be imported:

| filename       | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| bundle.css     | Full bundle with all stylesheets included                                |
| button.css     | Button styles                                                            |
| details.css    | Details & summary element styles                                         |
| forms.css      | Form styling                                                             |
| image.css      | Image styling                                                            |
| layout.css     | Contains different layout modules to help structure elements and content |
| loading.css    | CSS utility for putting elements in a loading state                      |
| meter.css      | Meter element styling                                                    |
| navigation.css | Styles for navigation related elements                                   |
| progress.css   | Progress element elements                                                |
| scrollbar.css  | Scroll bar styling                                                       |
| table.css      | Table styling                                                            |
| text.css       | Text styling                                                             |
| tokens.css     | Makes the design system tokens available as CSS variables                |

```javascript
import "kiwicomponents/dist/css/filename"
```

Some of these imports are described in other sections of this documenation.

## Button

By enabling button styles your buttons will automatically look better. Your buttons can be configured using css classes.

-   Set the type using these classes: .type-primary .type-secondary .type-neutral .type-success .type-warning .type-info .type-error .type-glass
-   You can set the color combinations using these classes: .fill-solid .fill-light .fill-none
-   To get a cooler hover animation use .useanimation

You can apply the attribute role="button" to \<a> links to make them look like buttons too.

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

### Base Sections and Articles

When you place a \<section> element as a direct child to either a body, header, main or footer element the section will automatically configure a max width for yout content and center it in the viewport. The centering is done through padding, meaning that if you configure a background for the section it will take up the full width.

Inside of your root \<section> elements you can place \<article> elements, which will transform inte responsive content cards.

Sections by default has margins between elements on desktop, while blending everything together on mobile. You can configure the sections to keep the margins on mobile by setting the class "mobile-margins" on your sections.

If you want to use sections that are more narrow you can configure them with the classs "narrow"

Article elements by default have a maximum content width that allows for more inline air. You can configure them to fill more available space by applying the class "fill".

By default the layout class will change the background of the body element, and the same color will be applied to any sections put inside your articles. You can configure the look and feel like so:

| Variables                 | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| --kiwi-section-background | Applied to sections inside articles and the document body |
| --kiwi-article-background | Applied to articles                                       |
| --kiwi-article-box-shadow | Applied to articles                                       |
| --kiwi-article-border     | Applied to articles                                       |

```html
<main>
	<section>
		<article>
			<h2>This is an article</h2>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</article>
		<article>
			<h2>This is an article with a section</h2>
			<section>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</section>
		</article>
		<article class="fill">
			<h2>This article fills more space</h2>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</article>
	</section>
	<section class="narrow mobile-margins">
		<article>
			<h2>This article is part of a narrow section</h2>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</article>
		<article>
			<h2>And it has mobile margins</h2>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</article>
	</section>
</main>
```

<a href="./layout.html" target="_blank">Link</a>

### Containers

You can use the .container class to add a little bit of margin on the container's sides.

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

### Centering

You can use a number of utility classes to center things in the viewport. Use these classes on a wrapper container for whatever you want to have centered

-   .center-content will center things in the most basic way using automatic margins and text alignment
-   .center-content-flex will use flexbox to center its content
-   .center-content-absolute will use absolute positioning to center its content
-   .center-content-fixed will use fixed positioning to center its content

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
<meter min="0" max="100" optimum="100" low="30" high="50" value="25"></meter>
<meter min="0" max="100" optimum="100" low="30" high="50" value="50"></meter>
<meter min="0" max="100" optimum="100" low="30" high="50" value="75"></meter>
```

<kiwi-scoped-demo>
	<meter min="0" max="100" optimum="100" low="30" high="50" value="25"></meter>
	<br><br>
	<meter min="0" max="100" optimum="100" low="30" high="50" value="50"></meter>
	<br><br>
	<meter min="0" max="100" optimum="100" low="30" high="50" value="75"></meter>
</kiwi-scoped-demo>

## Details

These styles will make standard \<details> and \<summary> elements look better.

Some things are unfortunately not possible with CSS only while also staying semantically accurate, such as open/close animations. for the best possible UX experience use the kiwi-accordion component instead.

You can use the .bordered class to give the details element full borders.

```html
<details>
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
<details>
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
<details>
	<summary>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>

<details class="bordered">
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
<details class="bordered">
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
```

<kiwi-scoped-demo>
<details>
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
<details>
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
<details>
	<summary>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis.</p>
	</summary>
	<p>
		    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>

<br><br>

<div>
<details class="bordered">
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
<details class="bordered">
	<summary>
		<p>Lorem, ipsum dolor.</p>
	</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</p>
</details>
</div>
</kiwi-scoped-demo>

## Image

These styles will improve your image elements

## Navigation

### Navbar

To create an evenly spaced horizontal navigation menu simply use \<nav class="navbar"> elements with \<ul>/\<li> elements inside of them. You can put \<li> elements with \<hr> elements in them to create separators between sections.

```html
<style>
	nav {
		background: aliceblue;
	}
</style>
<nav class="navbar">
	<ul>
		<li>Left Item</li>
	</ul>
	<ul>
		<li>Right Item 1</li>
		<li>Right Item 2</li>
		<li><hr /></li>
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
<nav class="navbar">
	<ul>
		<li>Brand</li>
	</ul>
	<ul>
		<li>Item 1</li>
		<li><hr /></li>
		<li>Item 2</li>
	</ul>
</nav>
</kiwi-scoped-demo>

### Bottom Navbar

You can also make a mobil navbar using .bottom-navbar.

```html
<style>
	nav {
		background: aliceblue;
	}
</style>
<nav class="bottom-navbar">
	<ul>
		<li><div>Item 1</div></li>
		<li><div>Item 2</div></li>
		<li><div>Item 3</div></li>
		<li><div>Item 4</div></li>
	</ul>
</nav>
```

### Vertical Navigation Menu

Alternatively you can create a vertical menu by putting the \<nav> element inside of an \<aside> element to create a vertical navigation menu. It is recommended to put a second element inside of the list items, since this will create a nice overflow effect.

If you add the class .dark to the \<ul> element it will get a darker background

```html
<style>
	aside {
		background: aliceblue;
		padding: 1rem;
	}
</style>
<aside>
	<nav>
		<ul>
			<li><div>Item 1</div></li>
			<li><div>Item 2</div></li>
			<li><div>Item 3 loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</div></li>
		</ul>
	</nav>
</aside>
<br /><br />
<aside>
	<nav>
		<ul class="dark">
			<li><div>Item 1</div></li>
		</ul>
	</nav>
</aside>
```

<kiwi-scoped-demo>
<style>
	aside {
		background: aliceblue;
		padding: 1rem;
	}
</style>
<aside>
	<nav>
		<ul>
			<li><div>Item 1</div></li>
			<li><div>Item 2</div></li>
			<li><div>Item 3 loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</div></li>
		</ul>
	</nav>
</aside>
<br /><br />
<aside>
	<nav>
		<ul class="dark">
			<li><div>Item 1</div></li>
		</ul>
	</nav>
</aside>
</kiwi-scoped-demo>

### Breadcrumbs

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

### Icons

You can add icons to list items by setting the --kiwi-li-icon attribute to a valid url() value. This _must_ be set inline. If you are using this inside of one of the aforementioned types of navigation menus the layout and sizing will automatically adapt.

```html
<ul class="dark">
	<li
		style="--kiwi-li-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='gray' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
	>
		Item
	</li>
</ul>
```

<kiwi-scoped-demo>
<ul class="dark">
	<li
		style="--kiwi-li-icon: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='gray' fill-rule='evenodd' d='M6.5 0a6.5 6.5 0 0 1 5.25 10.334l3.957 3.959a1 1 0 0 1-1.414 1.414l-3.96-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>&quot;)"
	>
		Item
	</li>
</ul>
</kiwi-scoped-demo>
