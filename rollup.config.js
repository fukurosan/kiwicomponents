import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import { terser } from "rollup-plugin-terser"
import scss from "rollup-plugin-scss"
import { string } from "rollup-plugin-string"
import bundleSize from "rollup-plugin-bundle-size"
import sass from "sass"
import fs from "fs"

const DIST_FOLDER = "dist"
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

export default {
	input: "./src/index.js",
	output: [
		{
			file: `${DIST_FOLDER}/js/bundle.js`,
			name: LIBRARY_NAME,
			format: "umd",
			banner: BANNER,
			plugins: [terser()]
		},
		{
			file: `${DIST_FOLDER}/js/esm-bundle.js`,
			format: "esm",
			banner: BANNER
		},
		{
			file: "docs/js/bundle.js",
			name: LIBRARY_NAME,
			format: "umd",
			banner: BANNER,
			plugins: [terser()]
		}
	],
	plugins: [
		json(),
		resolve({
			extensions: [".js"]
		}),
		commonjs(),
		scss({
			output: false,
			outputStyle: "compressed"
		}),
		string({
			include: ["**/*.html"]
		}),
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
		bundleSize()
	]
}
