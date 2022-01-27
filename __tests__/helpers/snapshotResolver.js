module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath
            .replace(/.test.([tj]sx?)/, ".test" + snapshotExtension)
            .replace(/src[/\\]Components/, "__tests__/__snapshots__")
    },

    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath.replace(snapshotExtension, ".js").replace(/__tests__[/\\]__snapshots__/, "src/Components")
    },

    testPathForConsistencyCheck: "src/components/some.test.js",
}