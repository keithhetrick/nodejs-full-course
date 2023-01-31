// CHECK TERMINAL: node server.js
// console.log("\nHello World");

// GLOBAL OBJECT
// console.log("\nGLOBAL OBJECT METHODS:\n\n", global);

/*
// GLOBAL METHODS
const os = require("os");
const path = require("path");

console.log("\nOS: ", os.type());
console.log("\nVERSION:\n", os.version());
console.log("\nHOME DIRECTORY: ", os.homedir());
console.log("\nTOTAL MEMORY: ", os.totalmem());
console.log("\nFREE MEMORY: ", os.freemem());
console.log("\nCPU INFO: ", os.cpus());


console.log("\nCPU ARCHITECTURE: \n", os.arch());
console.log("\nDIRECTORY NAME: \n", __dirname);
console.log("\nFILE NAME: \n", __filename);

console.log("\nPATH DIRECTORY NAME: \n", path.dirname(__filename));
console.log("\nPATH BASE NAME: \n", path.basename(__filename));
console.log("\nPATH EXTENSION NAME: \n", path.extname(__filename));

console.log("\nPATH PARSE: \n", path.parse(__filename));
*/

// IMPORT MODULES
// const math = require("./math");
const { add, subtract, multiply, divide, square, cube } = require("./math");

// console.log("\nMATH MODULE: ", math);
console.log("\nMATH MODULE ADD: ", add(2, 3));
console.log("\nMATH MODULE SUBTRACT: ", subtract(2, 3));
console.log("\nMATH MODULE MULTIPLY: ", multiply(2, 3));
console.log("\nMATH MODULE DIVIDE: ", divide(2, 3));
console.log("\nMATH MODULE SQUARE: ", square(2));
console.log("\nMATH MODULE CUBE: ", cube(2));
