import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import { terser } from "rollup-plugin-terser"
import scss from "rollup-plugin-scss"
import { string } from "rollup-plugin-string"
import bundleSize from "rollup-plugin-bundle-size"

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

const bundles = {
	bundle: "./src/index.js"
}

let productionBuilds = []
productionBuilds = Object.keys(bundles).map(bundle => {
	return {
		input: bundles[bundle],
		output: [
			{
				file: `${DIST_FOLDER}/build/${LIBRARY_NAME}-${bundle}.js`,
				name: LIBRARY_NAME,
				format: "umd",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/build/${LIBRARY_NAME}-esm-${bundle}.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `docs/${LIBRARY_NAME}-${bundle}.js`,
				name: LIBRARY_NAME,
				format: "umd",
				banner: BANNER
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
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled"
			}),
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			}),
			bundleSize()
		]
	}
})

export default productionBuilds
