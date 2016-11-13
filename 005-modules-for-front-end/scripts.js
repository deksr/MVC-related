// different ways to import a module:
// import everything as methods or properties of an object
// import * as h from './multiple-function-module.js';
// // and then use them
// const displayaFunction = h.something(5000);


// Or import everything into the module scope:
// import * from './helpers';
// const displayTotal = addTax(1000);
// I'd recommend against this style because it's less explicit
// and could lead to code that's harder to maintain


// or cherry pick only the things you need:
import { something, somethingnew } from './multiple-function-module.js';
const anotherWay = something(500, 0.33);
