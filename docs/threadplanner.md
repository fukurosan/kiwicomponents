# Thread Planner (Beta)

The thread planner is meant to help make multi threading easier in the web browser. You do not need to deal with creating worker objects, terminating workers after execution, nor do you need to keep track of how many threads are running at any given point in time. This all handled for you.

## How to

The basic API for the thread planner is really simple. You can import the planner like so:

```javascript
import { getThreadPlanner } from "kiwicomponents"
const tp = getThreadPlanner()
```

You can then either use the thread planner itself to execute threads, or enable global multi threading, which will enhance the browser's function prototype by attaching a series of new functions that are internally managed by the planner.

```javascript
tp.enableGlobalThreadPlanner()
```

The most basic function is "runThread". Executing the runThread function will run the function in a separate thread, and return a promise that will either resolve with the result from the function, or reject with an error.

Check out this example:

```javascript
function heavyWork(numberOne, numberTwo) {
	return numberOne + numberTwo
}

//Execute in main thread (blocking)
console.log(heavyWork(1, 2))

//Execute in separate thread (non-blocking) without global thread planner
tp.runThread(heavyWork, 1, 2).then(result => {
	console.log(result) // -> 3
})

//Execute in separate thread (non-blocking) with global thread planner
heavyWork.runThread(1, 2).then(result => {
	console.log(result) // -> 3
})
```

If your function returns a promise (e.g. if it is an async function) then the thread will resolve/reject according to the result of the promise from the function.

## Concurrency limitations

There total amount of concurrent threads will by default never exceed the amount of logical processors (-1 for headroom) on the system. This means that if for example your system's CPU has 12 logical cores then no more than 11 simultaneous threads will be executed. Any additional threads will be put into a queue and execute after previous ones have completed.

You can change this to be any number you want, or have the thread planner simply never wait.

```javascript
tp.getMaxThreadCount() // -> Retrieves the current number
tp.setMaxThreadCount(2) // -> Reconfigured to 2
tp.setMaxThreadCount(0) // -> Reconfigured to unlimited
```

# How it works

When you run a function as a thread workers are created to accomodate the requests. When this happens your function will be serialized into a string, and deserialized/executed inside of the Worker. After execution has finished the thread planner will wait for new requests for a given idle time (default 60 seconds) before finally terminating the workers. The reason for this is that creating a Worker object is a fairly expensive operation, and reusing workers is a way of negating this cost. If the function is executed again within the idle timeframe then the already existing object can be reused, and the timer restarts.

You can configure this time manually:

```javascript
tp.getMaxThreadIdleTime() // -> Retrieves the set time in ms
tp.setMaxThreadIdleTime(Infinity) // -> Workers will never terminate automatically
```

You can also terminate threads manually, either for a given function or for all threads known to the planner. Note that currently only queued threads will be terminated, and not actively running ones.

```javascript
//Through the thread planner object
tp.terminateThreads(myFunction)
tp.terminateAllThreads()
//Or with global thread planner
const myFn = () => {}
myFn.terminateThreads()
```

Another way of negating the cost of creating workers is to preemptively create them. This can be done through the warmup function.

```javascript
tp.warmupThreads(fn, 2) //-> Warm up two threads. If not specified then the maximum amount will be warmed up
//Or with the global thread planner
const myFn = () => {}
myfn.warmupThreads(2)
```

## Meta data

You can access a little bit of meta data from the thread planner to see the current status of threads:

```javascript
tp.getNumberOfRunningJobs() // -> Number of executing threads
tp.getNumberOfQueuedJobs() // -> Number of queued threads
```

## Function Dependencies

The thread planner is limited by the nature of JavaScript multi-threading and workers. When a function is executed in a separate thread it will be serialized, and therefore any references to memory stored in the main thread will be unavailable.

For example:

```javascript
const someVariable = {
	something: 0
}
function doSomething() {
	return someVariable.something
}
doSomething.runThread() //This will not work, because "someVariable" will be undefined in the new thread.
```

The thread planner deals with this problem by allowing you to define dependencies for your functions. This can be done either as a string, or as an object. Dependencies will be evaluated recursively, so you can have a function as a dependency that in turn has other dependencies.
Note that dependencies will not update once the thread has been created. The only way to update them is to terminate all running threads, and then run a new thread.

```javascript
const someVariable = {
    something: 1
}
function doSomething() {
    return someVariable.something + someOtherVariable
}

doSomething._kiwicomponents = {
    //A dependency string is essentially just a snippet of JavaScript as a string. This will execute first of all when the worker loads
    dependencyString: "const someOtherVariable = 2"
    //Dependencies are named dependencies that will be parsed into strings. You can even map functions here.
    dependencies: {
        //The below results in:
        //var someVariable = { something: 1 }
        [someVariable.name]: someVariable
    },
}

//This will now work, because the dependencies are mapped
doSomething.runThread() // -> 2
```

Note the syntax "[someVariable.name]: someVariable" that is used instead of "someVariable: someVariable". It is recommended to use the above syntax, because it stops you from running into strange errors with minifiers that mangle your function names, and inadvertantly end up breaking your depdency tree.

## Execute a function many times (with better performance)

If you need to execute a function many times then you can potentially speed it up by passing all execution arguments simultaneously. This will generally be faster because it negates the cost of posting several messages between threads which can be expensive. Posting all information in one message can result in significant performance benefits

Consider the below example:

```javascript
const someFunction = (arg1, arg2) {
    return arg1 + arg2
}
//This
Promise.all(
    someFunction.runThread(1, 1),
    someFunction.runThread(1, 1),
    someFunction.runThread(1, 1),
).then(results => {
    results // -> [2, 2, 2]
})
//Is equal to this
someFunction.runManyInThread([1, 1], [1, 1], [1, 1]).then(results => {
    results // -> [2, 2, 2]
})

//Or with the regular thread planner object:
tp.runManyInThread(someFunction, [1, 1], [1, 1], [1, 1]).then(results => {
    results // -> [2, 2, 2]
})
```

