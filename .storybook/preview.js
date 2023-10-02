setInterval(() => {
	//Whenever we import a scss file it will automatically be added by storybook to the DOM, so we have to manually remove it.
    //Storybook automatically loads the import from just hovering the item in the story menu, so we define a global scanner that counteracts it.
	//I bet there is a much easier way of doing this.
	document.querySelector("[data-vite-dev-id]")?.remove()
	document.querySelector("link[href*='.stories-']")?.remove()
}, 1000);