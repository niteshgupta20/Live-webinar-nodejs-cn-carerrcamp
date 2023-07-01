const { add, minus } = require('./math');

// console.log("Addition", add(2, 3));
// console.log("subtraction", minus(2, 3));

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

// process.argv is the array of strings
// console.log(process.argv);

console.log(add(a, b));