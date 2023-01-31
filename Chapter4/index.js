const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// Initialize object
const myEmitter = new MyEmitter();

// Add event listener
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // Emit event
  myEmitter.emit("log", "Log event emitted after 2 seconds!");
}, 2000);
