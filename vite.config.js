import { defineConfig } from "vite"
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

export default defineConfig({
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
			//With scss files it works, except there is seemlingly no way to tell Vite to not spit out css files in the output dir without polluting the source code files' import statements with "?inline" everywhere which causes different side effects
			//With html files the only way to do it seems to similarly be to pollute the source code files' import statements with "?raw"
			//Solving this with a simple transform plugin works with rollup, but not vite. Seems like vite is doing some magic that causes the content argument to be empty for some file extensions
			//This plugin is a bit of a hack but solves it globally and isolates the issue within the vite config file by manually adding these suffixes at the resolver level
			name: "kiwi-inline-html-and-scss-imports",
			enforce: "pre",
			apply: "build",
			async resolveId(id, importer, options) {
				const isHTML = id.match(/\.html$/)
				const isSCSS = id.match(/\.scss\?used$/)
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
			//After the JS build has completed we build all the css assets manually
			name: "build-kiwi-stylesheets",
			buildEnd() {
				fs.mkdirSync(`${DIST_FOLDER}/css`, { recursive: true })
				fs.readdirSync("./src/Assets/Stylesheets/Global/").map(fileName => {
					const css = sass.compile(`./src/Assets/Stylesheets/Global/${fileName}`, {
						style: "compressed",
						sourceMap: false
					})
					fs.writeFileSync(`${DIST_FOLDER}/css/${fileName.replace(/.scss$/, "")}.css`, `${BANNER}${css.css}`, "utf-8")
					if (fileName.startsWith("bundle") || fileName.startsWith("form")) {
						fs.writeFileSync(`docs/css/${fileName.replace(/.scss$/, "")}.css`, `${BANNER}${css.css}`, "utf-8")
					}
				})
				return null
			}
		},
		{
			//Vite does not put the banner specified in rollupConfig at the very top of the file, but instead inside the UMD module for some reason
			//This plugin adds the banner at the top at the very end.
			name: "banner",
			async writeBundle(_, bundle) {
				for (const fileName of Object.entries(bundle)) {
					const file = fileName[0]
					if (file.match(/\.(css|js)$/i)) {
						const fileURL = `${DIST_FOLDER}/${file}`
						let data = fs.readFileSync(fileURL, { encoding: "utf8" })
						data = `${BANNER} ${data}`
						fs.writeFileSync(fileURL, data)
					}
				}
			}
		},
		{
			//There seems to be no easy way to add multiple output directories to the build for Vite
			//To solve this we just manually copy the bundle file at the end of the build into the docs folder.
			name: "copy-js-to-kiwi-docs",
			buildEnd() {
				fs.copyFileSync(`${DIST_FOLDER}/js/bundle.js`, `${DOCS_FOLDER}/js/bundle.js`)
				return null
			}
		}
	]
})
