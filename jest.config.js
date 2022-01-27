module.exports = {
	transform: {},
	setupFilesAfterEnv: ["<rootDir>/__tests__/helpers/setupJest.js"],
	modulePathIgnorePatterns: ["<rootDir>/__tests__/helpers"],
	snapshotResolver: "<rootDir>/__tests__/helpers/snapshotResolver.js"
}
