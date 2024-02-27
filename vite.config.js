import { createLogger, defineConfig } from "vite"
import pkg from "./package.json"
import fs from "fs"
import sass from "sass"

const DIST_FOLDER = "dist"
const DOCS_FOLDER = "docs"
const LIBRARY_NAME = pkg.name
const VERSION = pkg.version
const AUTHOR = pkg.author
const DESCRIPTION = pkg.description
const BANNER = `/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * ${LIBRARY_NAME} version ${VERSION}
 * ${DESCRIPTION}
 * Copyright (c) ${new Date().getFullYear()} ${AUTHOR}
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */
`

//Vite seems to do its code analysis before the resolveId hook is fired, causing incorrect logs
//This fixes that
const logger = createLogger()
const originalWarning = logger.warn
const originalError = logger.error
logger.warn = (message, options) => {
	if (!message.includes("Default and named imports from CSS files are deprecated.")) {
		originalWarning(message, options)
	}
}
logger.error = (message, options) => {
	if (!message.includes("Do not know how to load path: html:")) {
		originalError(message, options)
	}
}

export default defineConfig({
	customLogger: logger,
	build: {
		target: "esnext",
		outDir: "./dist",
		emptyOutDir: false,
		minify: "terser",
		lib: {
			entry: "./src/index.js",
			formats: ["es", "umd"],
			name: LIBRARY_NAME,
			fileName: format => {
				return format === "umd" ? "js/bundle.js" : "js/esm-bundle.js"
			}
		}
	},
	plugins: [
		{
			//We want html imports and scss imports to be strings
			//To accomplish this in the Vite way we would need to pollute all of our import statements with ?inline for .scss and ?raw for .html
			//Using transform plugins works in Rollup but for some reason not in build mode in vite. The "code" argument is empty for some file extensions
			//This plugin is a bit of a hack but solves it globally and isolates the logic for these imports within the vite config file
			name: "inline-html-and-scss-imports",
			enforce: "pre",
			async resolveId(id, importer, options) {
				const isHTML = id.match(/kiwi-.*\.html$/)
				const isSCSS = id.match(/kiwi-.*\.scss(\?used)?$/) //For some reason Vite adds ?used to some scss resources before this hook runs 🤷‍♂️
				if ((isHTML || isSCSS) && !options.isEntry) {
					const res = await this.resolve(id, importer, {
						skipSelf: true,
						...options
					})
					if (!res || res.external) return res
					return `${res.id}${isSCSS ? "?inline" : "?raw"}`
				}
			}
		},
		{
			//After the JavaScript build has completed we build all the css assets manually
			name: "build-kiwi-stylesheets",
			writeBundle() {
				fs.mkdirSync(`${DIST_FOLDER}/css`, { recursive: true })
				fs.readdirSync("./src/Stylesheets/External/").map(fileName => {
					const css = sass.compile(`./src/Stylesheets/External/${fileName}`, {
						style: "compressed",
						sourceMap: false
					})
					fs.writeFileSync(`${DIST_FOLDER}/css/${fileName.replace(/.scss$/, "")}.css`, `${BANNER}${css.css}`, "utf-8")
					if (fileName.startsWith("bundle") || fileName.startsWith("form")) {
						fs.writeFileSync(`docs/css/${fileName.replace(/.scss$/, "")}.css`, `${BANNER}${css.css}`, "utf-8")
					}
				})
				//Vite creates this seemingly by default, we can safely remove it.
				fs.existsSync(`${DIST_FOLDER}/style.css`) && fs.rmSync(`${DIST_FOLDER}/style.css`)
				return null
			}
		},
		{
			//Vite does not put the banner specified in rollupConfig at the very top of the file, but instead inside the UMD module for some reason
			//This plugin adds the banner at the very top when writing the bundle to disk so as to guarantee its always in the right place.
			name: "add-banner",
			apply: "build",
			async writeBundle(_, bundle) {
				for (const fileName of Object.entries(bundle)) {
					const file = fileName[0]
					if (_.dir.endsWith("dist") && file.match(/(css|js)(\\|\/).*\.(css|js)$/i)) {
						const fileURL = `${DIST_FOLDER}/${file}`
						let data = fs.readFileSync(fileURL, { encoding: "utf8" })
						data = `${BANNER} ${data}`
						fs.writeFileSync(fileURL, data)
					}
				}
			}
		},
		{
			//There seems to be no easy way to add multiple outputs to the build for Vite
			//To solve this we just manually copy the bundle file at the end of the build into the docs folder.
			name: "copy-bundle-to-docs",
			closeBundle() {
				fs.copyFileSync(`${DIST_FOLDER}/js/bundle.js`, `${DOCS_FOLDER}/js/bundle.js`)
				return null
			}
		},
		{
			//The SCSS files are built outside of the scope of the input entrypoint file, so we need to manually tell the watcher to include them.
			name: "rebuild-on-css-changes",
			buildStart() {
				fs.readdirSync("./src/Stylesheets/External/").forEach(fileName => {
					this.addWatchFile(`./src/Stylesheets/External/${fileName}`)
				})
				this.addWatchFile("./src/index.html")
				return null
			}
		},
		{
			//If we want index.html to be served on the root URL it seems like the safest option is a server middleware
			//Although one can also just manually go to /src/index.html
			name: "redirect-to-index-html",
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url === "/") {
						req.url = "/src/index.html"
					} else if (req.url.startsWith("/Stylesheets") || req.url.startsWith("/Assets")) {
						req.url = `/src${req.url}`
					}
					next()
				})
			}
		}
	]
})
