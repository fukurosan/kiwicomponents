const { configureToMatchImageSnapshot } = require("jest-image-snapshot")
const { DEFAULT_IMAGE_CONFIG } = require("./Env")

//Extensions for Jest
const toMatchImageSnapshot = configureToMatchImageSnapshot(DEFAULT_IMAGE_CONFIG)
expect.extend({ toMatchImageSnapshot })

//Increase timeout since the browser is a bit slow
jest.setTimeout(120000)