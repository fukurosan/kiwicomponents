import { getThreadPlanner } from "../api"

/**
 * Thread Manager
 */
export default {
	title: "Thread Manager/Thread Manager",
	tags: ["autodocs"],
	render: args => {
		return createComponent(args)
	}
}

export const Playground = {
	parameters: {
		docs: {
			story: { inline: true }
		}
	}
}

const createComponent = props => {
	const threadPlanner = getThreadPlanner()

	const container = document.createElement("div")
	container.setAttribute("style", "display:flex;flex-direction:column;gap:1rem;")

	setInterval(() => {
		container.querySelector("#threads-meta").innerHTML = `
          <div>Max Thread Count: ${threadPlanner.getMaxThreadCount()}</div>
          <div>Max Idle Time: ${threadPlanner.getMaxThreadIdleTime()}</div>
          <div>Running jobs: ${threadPlanner.getNumberOfRunningJobs()}</div>
          <div>Queued Jobs: ${threadPlanner.getNumberOfQueuedJobs()}</div>
        `
	}, 100)

	function someHeavyFunction(numberOne, numberTwo) {
		const start = Date.now()
		// eslint-disable-next-line no-empty
		while (start + 2000 > Date.now()) {}
		return numberOne + numberTwo
	}

	const createButton = (fn, label) => {
		const button = document.createElement("button")
		button.appendChild(document.createTextNode(label))
		button.addEventListener("click", fn)
		return button
	}

	const startThread = () => {
		const div = document.createElement("div")
		div.innerHTML = "Thread Queued 🟠"
		threadPlanner
			.runThread(someHeavyFunction, 1, 2)
			.then(result => {
				div.innerHTML = "Thread Completed 🟢"
			})
			.catch(error => {
				div.innerHTML = "Thread Terminated 🔴"
			})
		container.querySelector("#threads-executing").appendChild(div)
	}
	const btn = createButton(startThread, "Start Thread")
	container.appendChild(btn)

	const runManyInThread = () => {
		const div = document.createElement("div")
		div.innerHTML = "Many Ops Thread Queued 🟠"
		threadPlanner
			.runManyInThread(someHeavyFunction, [1, 2], [1, 2], [1, 2])
			.then(result => {
				div.innerHTML = "Many Ops Thread Completed 🟢"
			})
			.catch(error => {
				div.innerHTML = "Many Ops Thread Terminated 🔴"
			})
		container.querySelector("#threads-executing").appendChild(div)
	}
	container.appendChild(createButton(runManyInThread, "Run Many In Thread"))

	const terminateThreads = () => {
		threadPlanner.terminateAllThreads()
	}
	container.appendChild(createButton(terminateThreads, "Terminate All Threads"))

	const setMaxThreads = () => {
		threadPlanner.setMaxThreadCount(2)
	}
	container.appendChild(createButton(setMaxThreads, "Set Max Threads to 2"))

	const warmup = () => {
		threadPlanner.warmupThreads(someHeavyFunction, 0)
	}
	container.appendChild(createButton(warmup, "Warmup"))

	const asPrototype = () => {
		const div = document.createElement("div")
		div.innerHTML = "Thread Queued 🟠"
		someHeavyFunction
			.runThread(1, 2)
			.then(result => {
				div.innerHTML = "Thread Completed 🟢"
			})
			.catch(error => {
				div.innerHTML = "Thread Terminated 🔴"
			})
		container.querySelector("#threads-executing").appendChild(div)
	}
	container.appendChild(createButton(asPrototype, "Run through prototype"))

	const threadsMeta = document.createElement("div")
	threadsMeta.setAttribute("id", "threads-meta")
	const threadsExecuting = document.createElement("div")
	threadsExecuting.setAttribute("id", "threads-executing")
	container.appendChild(threadsMeta)
	container.appendChild(threadsExecuting)

	return container
}
