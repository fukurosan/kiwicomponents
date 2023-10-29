import { describe, expect, it } from "vitest"
import { StateManager } from "./api"

describe("State Manager", () => {
	it("Handles basic state", () => {
		const stateManager = new StateManager()
		stateManager.setState("fruits", ["apple", "orange", "banana"])
		stateManager.setState("vegetables", ["cucumber", "tomato", "paprika"])
		const allKeys = stateManager.listAllKeys()
		expect(allKeys.length).toStrictEqual(2)
		expect(allKeys[0]).toStrictEqual("fruits")
		const allState = stateManager.listAllState()
		expect(allState.length).toStrictEqual(2)
		expect(allState[0].length).toStrictEqual(2)
		expect(JSON.stringify(allState[0][1])).toStrictEqual(JSON.stringify(["apple", "orange", "banana"]))
		stateManager.clearState("fruits")
		expect(stateManager.getState("fruits")).toBeUndefined()
		expect(stateManager.listAllKeys().length).toStrictEqual(1)
		expect(JSON.stringify(stateManager.getState("vegetables"))).toStrictEqual(JSON.stringify(["cucumber", "tomato", "paprika"]))
		stateManager.clearAllState()
		expect(stateManager.listAllKeys().length).toStrictEqual(0)
		stateManager.reset()
	})

	it("Handles Listeners", () => {
		const stateManager = new StateManager()
		let listenerOneTimes = 0
		let listenerTwoTimes = 0
		const listenerOne = () => listenerOneTimes++
		const listenerTwo = () => listenerTwoTimes++
		stateManager.addListener("fruit", listenerOne)
		stateManager.setState("fruit", "apple")
		expect(listenerOneTimes).toStrictEqual(1)
		stateManager.addListener("fruit", listenerTwo)
		stateManager.setState("fruit", "apple")
		expect(listenerOneTimes).toStrictEqual(2)
		expect(listenerTwoTimes).toStrictEqual(1)
		stateManager.removeListener("fruit", listenerOne)
		stateManager.setState("fruit", "apple")
		expect(listenerOneTimes).toStrictEqual(2)
		expect(listenerTwoTimes).toStrictEqual(2)
		stateManager.forceUpdate("fruit")
		expect(listenerOneTimes).toStrictEqual(2)
		expect(listenerTwoTimes).toStrictEqual(3)
		stateManager.reset()
	})

	it("Handles Middleware", () => {
		const stateManager = new StateManager()
		stateManager.addMiddleware("set", value => value + 1)
		stateManager.addMiddleware("get", JSON.stringify)
		stateManager.setState("number", 1)
		expect(stateManager.getState("number")).toStrictEqual("2")
		stateManager.removeMiddleware("get", JSON.stringify)
		expect(stateManager.getState("number")).toStrictEqual(2)
		stateManager.reset()
	})
})
