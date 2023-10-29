/**
 * This class could use a bit more work in the future, but for now.
 */
export class ThreadPlanner {
	constructor() {
		/** @type {[Promise<any>, (...any) => any, any[][]][]} - A list of queued jobs. The first item is the promise that is waiting for the resolution of the thread. The second is the function to execute, and the third is a list of lists of arguments. */
		this.threadQueue = []
		/** @type {number} Currently running number of threads */
		this.numberOfRunningThreads = 0
		/** @type {number} Maximum allowed number of threads */
		this.maxThreads = Math.max(navigator.hardwareConcurrency - 1, 1)
		/** @type {WeakMap<(...any) => any, { pendingTasks: number, terminationTimeout: number, dependencyString: string, freeThreads: any[]>}} - A map between functions and information about how many tasks are currently pending, a timeout object used to keep track of worker idle time for auto-termination, worker dependencies, as well as free worker threads. */
		this.metaData = new WeakMap()
		/** @type {number} Maximum idle time before workers are terminated (in ms) */
		this.MAXIMUM_IDLE_TIME_MS = 60000 //1 minute
		/** @type {(...any) => any} All registered functions */
		this.registeredFns = []
	}

	/**
	 * Returns the current maximum amount of concurrent threads allowed
	 * @returns {number}
	 */
	getMaxThreadCount() {
		return this.maxThreads
	}

	/**
	 * Sets the maximum amount of concurrent threads allowed
	 * @param {number} maxThreadCount
	 */
	setMaxThreadCount(maxThreadCount) {
		this.maxThreads = maxThreadCount
	}

	/**
	 * Gets the maximum amount of thread idle time in ms before termination.
	 * @returns {number}
	 */
	getMaxThreadIdleTime() {
		return this.MAXIMUM_IDLE_TIME_MS
	}

	/**
	 * Sets the maximum amount of thread idle time in ms before termination.
	 * @param {number} maxIdleTime
	 */
	setMaxThreadIdleTime(maxIdleTime) {
		this.MAXIMUM_IDLE_TIME_MS = maxIdleTime
	}

	/**
	 * Gets the number of currently queued jobs
	 * @returns {number}
	 */
	getNumberOfQueuedJobs() {
		return this.threadQueue.length
	}

	/**
	 * Gets the current number of running jobs
	 * @returns {number}
	 */
	getNumberOfRunningJobs() {
		return this.numberOfRunningThreads
	}

	/**
	 * Checks if there are jobs waiting in the queue
	 * @returns {boolean}
	 */
	hasNext() {
		return !!this.threadQueue.length
	}

	/**
	 * Creates a Worker object from a given function by serializing it to a string
	 * @param {(...any) => any} fn - Function to be inlined
	 * @param {string} dependencyString - Dependency string to be injected
	 */
	createInlineWorker(fn, dependencyString) {
		const functionString = fn.toString()
		const args = functionString.substring(functionString.indexOf("(") + 1, functionString.indexOf(")"))
		const content = functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"))
		const code = `
		${dependencyString}

		function execute(${args}) {
			${content}
		}
			self.onmessage = async (params) => {
				let result = []
				for(let i = 0; i < params.data.length; i++) {
					result.push(execute(...params.data[i]))
				}
				for(let i = 0; i < params.data.length; i++)
				if(result[i] instanceof Promise) {
					result[i] = await result[i]
				}
				postMessage(result)
		}
	`
		const worker = new Worker(URL.createObjectURL(new Blob([code], { type: "text/javascript" })))
		return worker
	}

	/**
	 * Terminates all workers for a given function. This will reject promises for any queued instances.
	 * @param {(...args: any) => any} fn - Function for which workers should be terminated
	 */
	terminate(fn) {
		if (this.metaData.has(fn)) {
			const meta = this.metaData.get(fn)
			if (meta.terminationTimeout) {
				clearTimeout(meta.terminationTimeout)
			}
			meta.freeThreads.forEach(worker => {
				worker.terminate()
			})
			this.metaData.delete(fn)
		}
		this.threadQueue.filter(thread => thread[1] === fn).forEach(thread => thread[0].reject("Thread was terminated."))
		this.threadQueue = this.threadQueue.filter(thread => thread[1] !== fn)
	}

	/**
	 * Recursively computes a dependency string for a given function
	 * @param {{[key: string]: any}} obj - Object to compute dependency string for
	 * @param {string} result - Should never be set externally! Recursively updated dependency string
	 */
	getDependencyString(obj, result = "") {
		if (obj._kiwicomponents?.dependencyString) {
			result += `${obj._kiwicomponents.dependencyString}
			
			`
		}
		if (obj._kiwicomponents?.dependencies) {
			const dependencies = obj._kiwicomponents.dependencies
			Object.keys(dependencies).forEach(key => {
				const dependency = dependencies[key]
				result += `var ${key} = ${dependency.toString ? dependency.toString() : dependency}
				
				`
				result = this.getDependencyString(dependency, result)
			})
		}
		return result
	}

	/**
	 * Retrieves meta data for a function from the threadplanner. If no meta data exists then it will be created by this function.
	 * @param {(...args: any) => any} fn
	 * @returns {{ pendingTasks: number, terminationTimeout: number|undefined, dependencyString: string, freeThreads: any[]}}
	 */
	getMetaData(fn) {
		if (!this.metaData.has(fn)) {
			this.metaData.set(fn, {
				pendingTasks: 0,
				terminationTimeout: undefined,
				dependencyString: this.getDependencyString(fn),
				freeThreads: []
			})
			this.registeredFns.push(fn)
		}
		return this.metaData.get(fn)
	}

	/**
	 * Warms up threads for a given function for later use.
	 * @param {(...args: any) => any} fn - function to warm up threads for
	 * @param {number} number - number of threads to warmup. Max threads if not defined.
	 */
	warmup(fn, number) {
		const metaData = this.getMetaData(fn)
		const threads = metaData.freeThreads
		const loops = number ? number : Math.max(0, this.maxThreads - threads.length)
		for (let i = 0; i < loops; i++) {
			threads.push(this.createInlineWorker(fn, metaData.dependencyString))
		}
	}

	/**
	 * Terminates all threads in the threadplanner
	 */
	terminateAllThreads() {
		let fn
		while ((fn = this.registeredFns.pop())) {
			this.terminate(fn)
		}
	}

	/**
	 * Queues a function in the thread planner (and starts a thread execution loop if possible).
	 * @param {(...args: any) => any} fn - Function to run
	 * @param {any[]} args - Arguments for the function
	 */
	async run(fn, ...args) {
		const metaData = this.getMetaData(fn)
		if (metaData.terminationTimeout) {
			clearTimeout(metaData.terminationTimeout)
			delete metaData.terminationTimeout
		}
		metaData.pendingTasks++
		let resolve
		let reject
		const result = new Promise((outerResolve, outerReject) => {
			resolve = outerResolve
			reject = outerReject
		})
		this.threadQueue.push([{ resolve, reject }, fn, [...args]])
		//There should never be more execution loops than max thread count.
		//If there is still headroom then execute a new queue loop,
		//otherwise the thread will eventually be picked up by one of the existing ones.
		if (this.numberOfRunningThreads !== this.maxThreads) {
			this.executeQueueLoop()
		}
		return result
	}

	/**
	 * Executes threads one by one until the queue is empty.
	 */
	async executeQueueLoop() {
		while (this.hasNext()) {
			const nextItem = this.threadQueue.splice(0, 1)[0]
			const resolve = nextItem[0].resolve
			const reject = nextItem[0].reject
			const fn = nextItem[1]
			const args = nextItem[2]
			const threads = this.metaData.get(fn).freeThreads
			if (!threads.length) {
				threads.push(this.createInlineWorker(fn, this.metaData.get(fn).dependencyString))
			}
			const thread = threads.splice(0, 1)[0]
			this.numberOfRunningThreads++
			try {
				await this.executeWorker(thread, ...args)
					.then(executionResult => {
						this.handleThreadCompleted(fn, thread)
						resolve(executionResult)
					})
					.catch(error => {
						this.handleThreadCompleted(fn, thread)
						reject(error)
					})
			} catch (e) {
				console.error(e)
			}
			this.numberOfRunningThreads--
		}
	}

	/**
	 * Executes a worker and returns a promise with the result
	 * @param worker - Worker to be executed
	 * @param args - arguments for the worker
	 */
	executeWorker(worker, ...args) {
		return new Promise((resolve, reject) => {
			worker.onmessage = result => {
				resolve(result.data)
			}
			worker.onerror = reject
			worker.postMessage(args)
		})
	}

	/**
	 * Handles when a worker completes an operation
	 * @param fn - Function that completed
	 * @param thread - Worker that completed
	 */
	handleThreadCompleted(fn, thread) {
		const metaData = this.metaData.get(fn)
		if (!metaData) {
			//A termination command must have been executed
			return
		}
		metaData.freeThreads.push(thread)
		metaData.pendingTasks--
		if (!metaData.pendingTasks) {
			if (this.MAXIMUM_IDLE_TIME_MS) {
				metaData.terminationTimeout = setTimeout(() => {
					this.terminate(fn)
					this.registeredFns = this.registeredFns.filter(registeredFn => registeredFn !== fn)
				}, this.MAXIMUM_IDLE_TIME_MS)
			}
		}
	}
}
