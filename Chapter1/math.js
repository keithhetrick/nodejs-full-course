// METHOD 1: EXPORTING AN OBJECT

// const add = (a, b) => a + b;
// const subtract = (a, b) => a - b;
// const multiply = (a, b) => a * b;
// const divide = (a, b) => a / b;

// module.exports = {
//   add,
//   subtract,
//   multiply,
//   divide,
// };

// METHOD 2: EXPORTING FUNCTIONS
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
exports.square = (a) => a * a;
exports.cube = (a) => a * a * a;
