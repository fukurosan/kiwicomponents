# CSS Utility

This library comes with a number of css utilities, as well as CSS styles for most things you might need to quickly get projects up and running. Kiwi Components takes an "almost" classless approach to css. Meaning you can focus on writing solid markup.

The following files can be imported:

| filename        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| bundle.css      | Full bundle with all stylesheets included                                |
| backgrounds.css | Various background patterns                                              |
| button.css      | Button styles                                                            |
| card.css        | Styles for basic cards                                                   |
| details.css     | Details & summary element styles                                         |
| divider.css     | Divier element styling                                                   |
| forms.css       | Form styling                                                             |
| image.css       | Image styling                                                            |
| layout.css      | Contains different layout modules to help structure elements and content |
| loading.css     | CSS utility for putting elements in a loading state                      |
| meter.css       | Meter element styling                                                    |
| navigation.css  | Styles for navigation related elements                                   |
| progress.css    | Progress element elements                                                |
| scrollbar.css   | Scroll bar styling                                                       |
| shape.css       | Shape styling                                                            |
| table.css       | Table styling                                                            |
| text.css        | Text styling                                                             |
| tokens.css      | Makes the design system tokens available as CSS variables                |

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

## Colors & tokens

You can get access to the internal color & token system of kiwi components and use these parameters in your own code. For more information about the color system, check out the theming page.

Example:

```html
<style>
	.colorful-div {
		padding: 1rem;
		background-color: var(--kiwi-primary-color-600);
		color: var(--kiwi-foreground-color-light);
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

## Cards

Importing the card stylesheets allows you to use the .card class to create cards. The card class will make the container the class is set on into a flex column (vertical) layout with padding and spacing preconfigured. \<header> and \<footer> elements inside of the element will ignore padding and take up their full available space which allows you to, for example, place side-to-side images.

Example:

```html
<div class="card" style="width:200px;">
	<header style="height:150px;background:gray;"></header>
	<div>This is some content in the card</div>
	<div>This is an additional sentence</div>
	<footer>This is the footer</footer>
</div>
```

<kiwi-scoped-demo>
<div class="card" style="width:200px;">
	<header style="height:150px;background:gray;"></header>
	<div>This is some content in the card</div>
	<div>This is an additional sentence</div>
	<footer>This is the footer</footer>
</div>
</kiwi-scoped-demo>

## Layouts

You can use a number of different elements to create responsive, easy to understand layouts.

### .Layout

You can create layouts using the .layout utility class. The .layout class creates a responsive grid with different max-width breakpoints.

You can control the max-width of sections inside of the layout by setting them to different classes:
- .full-width (100%)
- .breakout (75rem, 1200px)
- .content (56rem, 896px - default)
- .narrow (37rem, 592px)

You can customize the breakpoints using CSS variables:
- --kiwi-layout-narrow-max-width 
- --kiwi-layout-content-max-width 
- --kiwi-layout-breakout-max-width

By default the layout sections will have an inline margin of 1rem. You can customize this margin by setting the "--kiwi-layout-margin-inline" css variable. You can also configure a gap between sections using the "--kiwi-layout-gap-space" css variable

By setting .no-mobile-spacing on the .layout container all inline-padding and gaps will be removed on mobile resolutions, making all sections merge together

You can of course also put one layout as a child to another layout to achieve different effects.

Example:

```html
<div class="layout no-mobile-spacing">
	<section class="full-width" style="background-color:lightblue;">
		<h2>Full Width</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		<div class="layout">
			<div>
				<h2>Second Layout item</h2>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</div>
		</div>
	</section>
	<section class="breakout"  style="background-color:coral;">
		<h2>Breakout</h2>
		<section>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</section>
	</section>
	<section style="background-color:lightgreen;">
		<h2>Content</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</section>
	<section class="narrow"  style="background-color:orange;">
		<h2>Narrow</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</section>
</div>
```

<kiwi-scoped-demo>
<div class="layout no-mobile-spacing">
	<section class="full-width" style="background-color:lightblue;">
		<h2>Full Width</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		<div class="layout">
			<div>
				<h2>Second Layout item</h2>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
				alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
			</div>
		</div>
	</section>
	<section class="breakout"  style="background-color:coral;">
		<h2>Breakout</h2>
		<section>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</section>
	</section>
	<section style="background-color:lightgreen;">
		<h2>Content</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</section>
	<section class="narrow"  style="background-color:orange;">
		<h2>Narrow</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</section>
</div>
</kiwi-scoped-demo>


### \<article> Elements

Article elements can be used to create high level content containers

Article elements will create a column flex container for all child elements. You can configure how some key aspects of articles behave using CSS variables.

- --kiwi-article-content-max-width (Max width for content, the rest is filled with responsive padding)
- --kiwi-article-min-padding-inline (Minimum inline padding)
- --kiwi-article-min-padding-block (Minimum block padding)

If you place an article inside of another article it will get a different background color, creating a contrast to the parent.

#### .article-list

You can create lists of articles by using the .article-list class. This creates a column layout with some sensible defaults that also integrate well with .layout.

You can configure the spacing using these variables:

- --kiwi-article-list-padding-inline
- --kiwi-article-list-padding-block
- --kiwi-article-list-gap

If an .article-list is placed inside of a .layout all padding will be set to 0 and instead managed by the layout element.

You can apply the .no-mobile-spacing class to the .article-list element to set all spacing to 0 on mobile. When doing this all child articles will also have shadows, border radius and so on removed, making them merge together into one visual element.


Example:

```html
<div>Default list of articles</div>
<div class="article-list" style="background:aliceblue;">
	<article>
		<h2>This is an article</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
	<article>
		<h2>This is an article with a another article in it</h2>
		<article>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</article>
	</article>
	<article style="--kiwi-article-min-padding-inline: 1.5rem; --kiwi-article-min-padding-block: 3rem;">
		<h2>This article has custom padding</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
	<article style="--kiwi-article-content-max-width:20rem;">
		<h2>This article has limited content width</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
</div>
<div>List of articles with no mobile spacing</div>
<div class="article-list no-mobile-spacing" style="background:aliceblue;">
	<article style="background:coral;">
		<h2>This is an article</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
	<article style="background:lightgreen;">
		<h2>This is an article</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
</div>
```

<kiwi-scoped-demo>
<div>Default list of articles</div>
<div class="article-list" style="background:aliceblue;">
	<article>
		<h2>This is an article</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
	<article>
		<h2>This is an article with a another article in it</h2>
		<article>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
			alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
		</article>
	</article>
	<article style="--kiwi-article-min-padding-inline: 1.5rem; --kiwi-article-min-padding-block: 3rem;">
		<h2>This article has custom padding</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
	<article style="--kiwi-article-content-max-width:20rem;">
		<h2>This article has limited content width</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
</div>
<div>List of articles with no mobile spacing</div>
<div class="article-list no-mobile-spacing" style="background:aliceblue;">
	<article style="background:coral;">
		<h2>This is an article</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
	<article style="background:lightgreen;">
		<h2>This is an article</h2>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam modi odit nisi, quod officiis dignissimos consequatur, voluptate quasi corporis
		alias, suscipit incidunt? Maxime, ducimus unde placeat officiis perspiciatis.
	</article>
</div>
</kiwi-scoped-demo>

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

These styles will make standard \<details> and \<summary> elements look better by adding a .accordion class to them.

You can also use the .bordered class to give the details element full borders.

```html
<details class="accordion">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
<details class="accordion">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
<details class="accordion">
	<summary>
		<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>

<details class="accordion bordered">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
<details class="accordion bordered">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
```

<kiwi-scoped-demo>
<details class="accordion">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
<details class="accordion">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
<details class="accordion">
	<summary>
		<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis.</div>
	</summary>
	<div>
		    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>

<br><br>

<div>
<details class="accordion bordered">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
<details class="accordion bordered">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis harum natus omnis, unde temporibus et saepe placeat nobis animi, cumque, sed
		sunt ratione voluptate debitis atque aspernatur veniam dolorum.
	</div>
</details>
</div>
</kiwi-scoped-demo>

### Dropdowns

By adding the class .dropdown to your \<details> element you can make it look like a styled \<select> element with no JavaScript required.

```html
<details class="dropdown">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<ul>
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</details>
```

<kiwi-scoped-demo>
<details class="dropdown">
	<summary>
		<div>Lorem, ipsum dolor.</div>
	</summary>
	<ul>
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</details>
</kiwi-scoped-demo>

## Image

These styles will improve your image elements

## Shapes

You can configure elements to take certain shapes using shape utility classes. The utility classes will apply clip paths to the elements to cut out shapes. All clip paths use percentages to determine how to clip the element, so the size of your element will determine how the result looks

The following shapes can be applied:

-   .shape-round
-   .shape-triangle
-   .shape-rounded-square
-   .shape-rounded-hexagon
-   .shape-x
-   .shape-message
-   .shape-star
-   .shape-chevron-right
-   .shape-chevron-left
-   .shape-rabbet
-   .shape-bevel
-   .shape-octagon
-   .shape-hexagon
-   .shape-pentagon
-   .shape-rhombus
-   .shape-parallelogram
-   .shape-trapezoid
-   .shape-nonagon

Example:

```html
<div class="shape-round" style="width:100px;height:100px;background:gray;"></div>
```

<kiwi-scoped-demo>
	<div class="shape-round" style="width:100px;height:100px;background:gray;"></div>
</kiwi-scoped-demo>

## Dividers

You can create dividers of content by using the .divider class as well as the .horizontal class.

Check out the below example:

```html
<div style="display:flex;flex-direction:column;gap:2rem;">
	<div class="divider">A Divider</div>
	<div class="divider horizontal" style="height:10rem;">Horizontal</div>
</div>
```

<kiwi-scoped-demo>
<div style="display:flex;flex-direction:column;gap:2rem;">
	<div class="divider">A Divider</div>
	<div class="divider horizontal" style="height:10rem;">Horizontal</div>
</div>
</kiwi-scoped-demo>

## Lists

### Steps

You can create lists of steps using either ordered or unordered lists. You can style each step in your list thematically as well as provide your own content. Each list can be either vertical or horizontal. You can configure your lists to look like steps by adding the .step class, as well as toggle them vertical or horizontal by using .horizontal. To provide your own content to the list dot, use the attribute "kiwi-content". To theme the list dot use one of the following classes:

-   is-secondary
-   is-neutral
-   is-success
-   is-info
-   is-warning
-   is-error
-   is-error

Check out the below example:

```html
<div style="display:flex;flex-direction:column;">
	<ul class="steps">
		<li>List Item 1</li>
		<li>List Item 2</li>
	</ul>
	<ul class="steps horizontal">
		<li>List Item 1</li>
		<li>List Item 2</li>
	</ul>
	<ol class="steps">
		<li>List Item 1</li>
		<li class="is-secondary">List Item Secondary</li>
		<li class="is-neutral">List Item Neutral</li>
		<li class="is-success">List Item Success</li>
		<li class="is-info">List Item Info</li>
		<li class="is-warning">List Item Warning</li>
		<li class="is-error">List Item Error</li>
		<li class="is-error" kiwi-content="@">List Item Custom</li>
	</ol>
	<ol class="steps horizontal">
		<li>List Item 1</li>
		<li>List Item 2</li>
	</ol>
</div>
```

<kiwi-scoped-demo>
<div style="display:flex;flex-direction:column;">
	<ul class="steps">
		<li>List Item 1</li>
		<li>List Item 2</li>
	</ul>
    <ul class="steps horizontal">
    	<li>List Item 1</li>
    	<li>List Item 2</li>
    </ul>
    <ol class="steps">
    	<li>List Item 1</li>
    	<li>List Item 2</li>
    	<li>List Item 3</li>
    	<li class="is-secondary">List Item Secondary</li>
    	<li class="is-neutral">List Item Neutral</li>
    	<li class="is-success">List Item Success</li>
    	<li class="is-info">List Item Info</li>
    	<li class="is-warning">List Item Warning</li>
    	<li class="is-error">List Item Error</li>
    	<li class="is-error" kiwi-content="@">List Item Custom</li>
    </ol>
    <ol class="steps horizontal">
    	<li>List Item 1</li>
    	<li>List Item 2</li>
    </ol>
</div>
</kiwi-scoped-demo>

### Menu

You can easily create menus using unordered lists by applying the "menu" class. Toggle the menu as horizontal or vertical using .horizontal. By adding \<details> elements into the menu you can create expandable sub-menus.

Check out the below example:

```html
<ul class="menu" style="padding:0.5rem;border:1px solid lightgray;">
	<li><div>List Item 1</div></li>
	<li><div>List Item 2</div></li>
	<li>
		<details>
			<summary>Sub menu</summary>
			<ul>
				<li><div>Sub Item 1</div></li>
				<li><div>Sub Item 2</div></li>
			</ul>
		</details>
	</li>
	<li><div>List Item 3</div></li>
</ul>
<ul class="menu horizontal" style="padding:0.5rem;border:1px solid lightgray;">
	<li><div>List Item 1</div></li>
	<li><div>List Item 2</div></li>
	<li>
		<details>
			<summary>Sub menu</summary>
			<ul>
				<li><div>Sub Item 1</div></li>
				<li><div>Sub Item 2</div></li>
			</ul>
		</details>
	</li>
	<li><div>List Item 3</div></li>
</ul>
```

<kiwi-scoped-demo>
<ul class="menu" style="padding:0.5rem;border:1px solid lightgray;margin-bottom:1rem;">
	<li><div>List Item 1</div></li>
	<li><div>List Item 2</div></li>
	<li>
		<details>
			<summary>Sub menu</summary>
			<ul>
				<li><div>Sub Item 1</div></li>
				<li><div>Sub Item 2</div></li>
			</ul>
		</details>
	</li>
	<li><div>List Item 3</div></li>
</ul>
<ul class="menu horizontal" style="padding:0.5rem;border:1px solid lightgray;">
	<li><div>List Item 1</div></li>
	<li><div>List Item 2</div></li>
	<li>
		<details>
			<summary>Sub menu</summary>
			<ul>
				<li><div>Sub Item 1</div></li>
				<li><div>Sub Item 2</div></li>
			</ul>
		</details>
	</li>
	<li><div>List Item 3</div></li>
</ul>
</kiwi-scoped-demo>

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
