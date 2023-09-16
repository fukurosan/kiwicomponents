import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import scss from "rollup-plugin-scss"
import { string } from "rollup-plugin-string"
import copy from "rollup-plugin-copy"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import sass from "sass"
import fs from "fs"

const DIST_FOLDER = "development"
const HTML_TEST_FILE = "index.html"
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
			file: `${DIST_FOLDER}/bundle.js`,
			name: LIBRARY_NAME,
			format: "umd",
			banner: BANNER,
			sourcemap: "inline"
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
		copy({
			targets: [
				{
					src: `src/${HTML_TEST_FILE}`,
					dest: `${DIST_FOLDER}/`,
					rename: "index.html",
					transform: content =>
						content
							.toString()
							.replace(
								"<head>",
								'<head><script src="./bundle.js"></script><link rel="stylesheet" href="./bundle.css"><script>kiwicomponents.init()</script>'
							)
				},
				{
					src: "src/Assets/Icons",
					dest: `${DIST_FOLDER}/`
				}
			],
			copyOnce: true
		}),
		{
			name: "build-kiwi-stylesheets",
			buildEnd() {
				fs.readdirSync("./src/Assets/Stylesheets/Global/").map(fileName => {
					const css = sass.compile(`./src/Assets/Stylesheets/Global/${fileName}`, {
						style: "compressed",
						sourceMap: false
					})
					fs.writeFileSync(`${DIST_FOLDER}/${fileName.replace(/.scss$/, "")}.css`, `${BANNER}${css.css}`, "utf-8")
				})
				return null
			}
		},
		serve({
			open: true,
			openPage: "/index.html",
			contentBase: ["", `${DIST_FOLDER}`],
			port: "8085"
		}),
		livereload({
			watch: `${DIST_FOLDER}`
		})
	]
}
