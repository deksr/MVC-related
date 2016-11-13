/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(1);
	(function webpackMissingModule() { throw new Error("Cannot find module \"/Users/DevathaK/dev/wdi/MVC-related/005-modules-for-front-end/bundle.js\""); }());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Person = __webpack_require__(2).default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _multipleFunctionModule = __webpack_require__(3);

	var anotherWay = (0, _multipleFunctionModule.something)(500, 0.33); // different ways to import a module:
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var something = function something(x) {
		console.log("this is helper .js " + x);
	};

	var somethingelse = function somethingelse(y) {
		console.log("this is second fucntion" + y);
	};

	// export something;
	// export somethingelse;

	// This can all be clubbed into one export like BELOW. tHIS TYPE OF EXPORT IS USEFUL WHEN WE HAVE MULTIPLE Exports to be done in one module
	exports.something = something;
	exports.somethingelse = somethingelse;

/***/ }
/******/ ]);