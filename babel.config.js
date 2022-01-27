module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: false,
				targets: {
					browsers: "> 0.25%, not ie 11, not op_mini all, not android 4.4.3, not dead"
				},
				useBuiltIns: false
			}
		]
	]
}
