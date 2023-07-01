// const add = (a, b) => a + b;
// exports.add = (a, b) => a + b;:- we can not use add function in this file.

const add = (a, b) => a + b;

const minus = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

module.exports = { add, minus, multiply, divide } // now you can use add, minus etc functions in same file also.

// console.log(add(2, 3));