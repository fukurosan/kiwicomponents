const CustomPuppet = require("../../../__tests__/helpers/CustomPuppet")
const Config = require("../../../__tests__/helpers/Env")

describe("kiwi-button", () => {
	const ELEMENT_TAG = "kiwi-button"
	let puppet

	const setContent = async () => {
		await puppet.loadComponentPage(ELEMENT_TAG)
		await puppet.evaluate(selector => {
			document.querySelector(selector).innerHTML = "Click Me!"
		}, ELEMENT_TAG)
	}

	beforeEach(async () => {
		puppet = await CustomPuppet.CreatePuppet("chrome", Config.isDebugMode)
		await setContent()
		if (Config.isDebugMode) {
			puppet.attachToClientConsole()
		}
	})

	afterEach(async () => {
		await puppet.close()
	})

	it("Default looks Correct on Desktop", async () => {
		const image = await puppet.screenshot()
		expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${ELEMENT_TAG}-Desktop` })
	})

	it("Default looks Correct on Mobile", async () => {
		await puppet.setMobileResolution()
		const image = await puppet.screenshot()
		expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${ELEMENT_TAG}-Mobile` })
	})
})
