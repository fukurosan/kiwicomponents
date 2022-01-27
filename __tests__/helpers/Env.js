module.exports = Object.freeze({
    snapshotPath: "./__tests__/__snapshots__/",
    bundlePath: "./dist/build/kiwicomponents-bundle.js",
    isDebugMode: false,
    DEFAULT_IMAGE_CONFIG: {
        blur: 1,
        customSnapshotsDir: "./__tests__/__image_snapshots__/",
        customDiffDir: "./__tests__/__image_snapshots__/__diff_output__/",
        customDiffConfig: {
            threshold: 0.01
        }
    }
})