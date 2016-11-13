let something = function(x){
console.log( "this is helper .js " + x);
}

let somethingelse = function(y){
	console.log("this is second fucntion" + y);
}

// export something;
// export somethingelse;

// This can all be clubbed into one export like BELOW. tHIS TYPE OF EXPORT IS USEFUL WHEN WE HAVE MULTIPLE Exports to be done in one module
export {something, somethingelse }