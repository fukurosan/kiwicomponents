import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: "./test/helpers/setup.js",
		testTimeout: 10000,
		env: {
			bundlePath: "./dist/js/bundle.js",
			isGlobalDebugMode: false,
			imageSnapshotConfig: JSON.stringify({
				blur: 1,
				customSnapshotsDir: "./test/imagesnapshots/",
				customDiffDir: "./test/imagesnapshots/__diff_output__/",
				customDiffConfig: {
					threshold: 0.01
				}
			})
		}
	}
})
