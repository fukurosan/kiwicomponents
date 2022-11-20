import { ThreadPlanner } from "./threadplanner"

const getThreadPlanner = () => {
	class Planner {
		constructor() {
			this.threadPlanner = new ThreadPlanner()
		}

		/**
		 * Executes the function in a separate thread.
		 * @param {(...args: any) => any} fn - Function to execute
		 * @param {any[]} args - Arguments for the function
		 */
		runThread(fn, ...args) {
			return this.threadPlanner.run(fn, [...args]).then(result => result[0])
		}

		/**
		 * Executes the function in a separate thread multiple times with different arguments. Returns an array of results.
		 * E.g. fn.runManyInThread([arg1, arg2], [arg1, arg2])
		 * -> [Result1, Result2]
		 * @param {(...args: any) => any} fn - Function to execute
		 * @param {any[][]} args Arguments for the function passed as arrays, one for each iteration.
		 */
		runManyInThread(fn, ...args) {
			return this.threadPlanner.run(fn, ...args)
		}

		/**
		 * Pre-allocates a number of workers for a given function. This can be done to lower the initial cost when actually executing the workers.
		 * If no number is specified the threadplanner will guess.
		 * Note that if you only want one single thread then it is *always* better to specify 1.
		 * @param {...any => any} fn - Function to allocate threads for
		 * @param {number=} numberOfThreads - Number of threads to allocate
		 */
		warmupThreads(fn, numberOfThreads = null) {
			this.threadPlanner.warmup(fn, numberOfThreads)
		}

		/**
		 * Terminates all running threads for the function.
		 * @param {(...args: any) => any} fn - Function to terminate
		 */
		terminateThreads(fn) {
			this.threadPlanner.terminate(fn)
		}

		/**
		 * Terminates all threads in the thread planner.
		 */
		terminateAllThreads() {
			this.threadPlanner.terminateAllThreads()
		}

		/**
		 * Returns the maximum number of estimated threads that can be executed in parallel on this host.
		 */
		getMaxThreadCount() {
			return this.threadPlanner.getMaxThreadCount()
		}

		/**
		 * Sets the maximum number of threads that can be executed in parallel on the host.
		 * @param {number} maxThreadCount - New maximum thread count. Set to 0 for no limit.
		 */
		setMaxThreadCount(maxThreadCount) {
			return this.threadPlanner.setMaxThreadCount(maxThreadCount)
		}

		/**
		 * Returns the total time in ms that a thead can be idle before it is terminated.
		 * @returns {number}
		 */
		getMaxThreadIdleTime() {
			return this.threadPlanner.getMaxThreadIdleTime()
		}

		/**
		 * Sets the maximum time (in ms) that a thread can be idle before being terminated automatically.
		 * If set to 0 threads will never terminate.
		 * @param {number} maxIdleTime - New maximum idle time in ms before termination.
		 */
		setMaxThreadIdleTime(maxIdleTime) {
			return this.threadPlanner.setMaxThreadIdleTime(maxIdleTime)
		}

		/**
		 * Returns the number of running threads
		 * @returns {number}
		 */
		getNumberOfRunningJobs() {
			return this.threadPlanner.getNumberOfRunningJobs()
		}

		/**
		 * Returns the number of queued jobs
		 * @returns {number}
		 */
		getNumberOfQueuedJobs() {
			return this.threadPlanner.getNumberOfQueuedJobs()
		}

		enableGlobalThreadPlanner() {
			const planner = this
			/**
			 * Executes the function in a separate thread.
			 */
			Function.prototype.runThread = function (...args) {
				return planner.runThread(this, ...args)
			}

			/**
			 * Executes the function in a separate thread multiple times with different arguments. Returns an array of results.
			 * E.g. fn.runManyInThread([arg1, arg2], [arg1, arg2])
			 * -> [Result1, Result2]
			 * @param args Arguments for the function passed as arrays.
			 */
			Function.prototype.runManyInThread = function (...args) {
				return planner.runManyInThread(this, ...args)
			}

			/**
			 * Pre-allocates a number of workers for a given function. This can be done to lower the initial cost when actually executing the workers.
			 * If no number is specified the threadplanner will guess.
			 * Note that if you only want one single thread then it is *always* better to specify 1.
			 * @param {...any => any} fn - Function to allocate threads for
			 * @param {number=} numberOfThreads - Number of threads to allocate
			 */
			Function.prototype.warmupThreads = function (numberOfThreads) {
				planner.warmupThreads(this, numberOfThreads)
			}

			/**
			 * Terminates all running threads for the function.
			 */
			Function.prototype.terminateThreads = function () {
				planner.terminate(this)
			}
		}
	}
	if (!Function.prototype.kiwiThreadPlanner) {
		Function.prototype.kiwiThreadPlanner = new Planner()
	}
	return Function.prototype.kiwiThreadPlanner
}

export { getThreadPlanner }
