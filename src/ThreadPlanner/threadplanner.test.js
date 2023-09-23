import { afterEach, beforeEach, describe, expect, it } from "vitest"
import getHeadlessBrowserInstance from "../../__tests__/helpers/HeadlessBrowser"

describe("Threadplanner", () => {
	let browserInstance

	beforeEach(async () => {
		browserInstance = await getHeadlessBrowserInstance()
		await browserInstance.loadBundle()
	})

	afterEach(async () => {
		await browserInstance.close()
	})

	it("Executes threads", async () => {
		const result = await browserInstance.execute(async () => {
			// eslint-disable-next-line no-undef
			const threadPlanner = kiwicomponents.getThreadPlanner()
			const longRunningFunction = (someNumber) => {
				const start = Date.now()
				// eslint-disable-next-line no-empty
				while (start + 100 > Date.now()) {}
				return someNumber
			}
			const promises = [
				threadPlanner.runThread(longRunningFunction, 1),
				threadPlanner.runThread(longRunningFunction, 2),
				threadPlanner.runThread(longRunningFunction, 3),
				threadPlanner.runThread(longRunningFunction, 4),
				threadPlanner.runThread(longRunningFunction, 5)
			]
			const result = await Promise.all(promises)
			threadPlanner.terminateThreads(longRunningFunction)
			return result.reduce((acc, number) => acc + number, 0)
		})
		expect(result).toStrictEqual(15)
	})

	it("Handles dependencies", async () => {
		const result = await browserInstance.execute(async () => {
			// eslint-disable-next-line no-undef
			const threadPlanner = kiwicomponents.getThreadPlanner()
			const innerReference = () => "World"
			const reference = () => `Hello ${innerReference()}`
			const functionWithReference = () => {
				return reference()
			}
			functionWithReference._kiwicomponents = { dependencies: { reference } }
			reference._kiwicomponents = { dependencies: { innerReference } }
			const promises = [
				threadPlanner.runThread(functionWithReference),
				threadPlanner.runThread(functionWithReference),
				threadPlanner.runThread(functionWithReference),
				threadPlanner.runThread(functionWithReference),
				threadPlanner.runThread(functionWithReference)
			]
			const threadResult = await Promise.all(promises)
			threadPlanner.terminateThreads(functionWithReference)
			return threadResult[0]
		})
		expect(result).toStrictEqual("Hello World")
	})

	it("Handles passing many operations simultaneously", async () => {
		const result = await browserInstance.execute(async () => {
			// eslint-disable-next-line no-undef
			const threadPlanner = kiwicomponents.getThreadPlanner()
			const innerReference = () => "World"
			const reference = () => `Hello ${innerReference()}`
			const functionWithReference = () => {
				return reference()
			}
			functionWithReference._kiwicomponents = { dependencies: { reference } }
			reference._kiwicomponents = { dependencies: { innerReference } }
			const promises = [
				threadPlanner.runManyInThread(functionWithReference, [], [], []),
				threadPlanner.runManyInThread(functionWithReference, [], [], []),
				threadPlanner.runManyInThread(functionWithReference, [], [], []),
				threadPlanner.runManyInThread(functionWithReference, [], [], []),
				threadPlanner.runManyInThread(functionWithReference, [], [], [])
			]
			threadPlanner.terminateAllThreads()
			return await Promise.all(promises)
		})
		expect(result.length).toStrictEqual(5)
		expect(result[0].length).toStrictEqual(3)
		expect(result[0][1]).toStrictEqual("Hello World")
	})
})
