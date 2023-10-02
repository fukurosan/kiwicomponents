export default {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: ["@storybook/addon-essentials"],
	core: {
		disableTelemetry: true
	},
	framework: {
		name: "@storybook/html-vite",
		options: {}
	}
}
