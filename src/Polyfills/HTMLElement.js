/* eslint-disable no-undef */
// Ensures that the build process in some frameworks won't crash when reading the bundle
const polyfill = () => {
	try {
		if (!global.HTMLElement) {
			global.HTMLElement = class HTMLElementPolyfill {}
		}
	} catch (e) {
		e
	}
}
polyfill()
