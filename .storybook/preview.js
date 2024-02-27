setInterval(() => {
	//Whenever we import a scss file it will automatically be added by storybook to the DOM, so we have to manually remove it.
    //Storybook automatically loads the import from just hovering the item in the story menu, so we define a global scanner that counteracts it.
	//I bet there is a much easier way of doing this.
	Array.from(document.querySelectorAll("[data-vite-dev-id]")).forEach(el => el.remove())
	Array.from(document.querySelectorAll("link[href*='.stories-']")).forEach(el => el.remove())
}, 1000);