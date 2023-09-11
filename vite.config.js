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
 */\n`

export default defineConfig({
	build: {
		target: "es2020",
		outDir: "./dist",
		emptyOutDir: false,
		minify: "esbuild",
		lib: {
			entry: "./src/index.bundle.js",
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
			//With scss files it works, except there is no way to tell Vite to not spit out random css files in the output dir
			//without polluting the source code files' import statements with "?inline" everywhere
			//With HTML the only way to do it is to also pollute the source code files' import statements - with "?raw"
			//So we have to write a plugin to tell Vite to stop being a jerk.
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
			name: "kiwi-ssr-support-transform",
			transform(code, id) {
				let generatedCode = code
				if (id.match(/Components[/\\].*[/\\]kiwi-.*.js/)) {
					const searchString = 'const templateElement = document.createElement("template")'
					if (code.includes(searchString)) {
						generatedCode = `${code.replace(
							searchString,
							`if(typeof document !== "undefined" && typeof window !== "undefined"){\n${searchString}`
						)}}`
					} else {
						generatedCode = `${code.replace("/**", 'if(typeof document !== "undefined" && typeof window !== "undefined"){\n/**')}}`
					}
				}
				return {
					code: generatedCode
				}
			}
		},
		{
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
			name: "banner",
			async writeBundle(_, bundle) {
				//Vite does not put the banner specified in rollupConfig at the very top of the file, but inside the UMD module
				//So we have to write a plugin to tell Vite to stop being a jerk.
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
			name: "copy-js-to-kiwi-docs",
			buildEnd() {
				//Copy the built files from dist to docs
				fs.copyFileSync(`${DIST_FOLDER}/js/bundle.js`, `${DOCS_FOLDER}/js/bundle.js`)
				return null
			}
		}
	]
})
