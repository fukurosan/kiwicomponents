import { afterEach, beforeEach, describe, expect, it } from "vitest"
import getHeadlessBrowserInstance from "../../../__tests__/helpers/HeadlessBrowser"

describe("kiwi-button", () => {
	const ELEMENT_TAG = "kiwi-button"
	let browserInstance

	beforeEach(async () => {
		browserInstance = await getHeadlessBrowserInstance()
		browserInstance.loadComponentPage(ELEMENT_TAG)
		await browserInstance.execute(selector => {
			document.querySelector(selector).innerHTML = "Click Me!"
		}, [ELEMENT_TAG])
	})

	afterEach(async () => {
		await browserInstance.close()
	})

	it("Default looks Correct on Desktop", async () => {
		const image = await browserInstance.screenshot()
		expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${ELEMENT_TAG}-Desktop` })
	})

	it("Default looks Correct on Mobile", async () => {
		await browserInstance.setMobileResolution()
		const image = await browserInstance.screenshot()
		expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${ELEMENT_TAG}-Mobile` })
	})
})
