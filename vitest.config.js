import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: "./__tests__/helpers/setup.js",
		testTimeout: 10000,
		env: {
			bundlePath: "./dist/js/bundle.js",
			isGlobalDebugMode: false,
			imageSnapshotConfig: JSON.stringify({
				blur: 1,
				customSnapshotsDir: "./__tests__/__image_snapshots__/",
				customDiffDir: "./__tests__/__image_snapshots__/__diff_output__/",
				customDiffConfig: {
					threshold: 0.01
				}
			})
		}
	}
})
