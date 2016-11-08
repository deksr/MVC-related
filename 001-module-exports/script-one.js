module.exports.myNumber = 123;
// same as above
exports.myNumber = 123;



exports.sayHi= function(somename) {
	console.log(" Hi " + somename)
};


module.exports.weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


// helper.linkTo('Google', 'http://www.google.com') // '<a href="http://www.google.com">Google</a>'

exports.linkTo = function(sitename, address){
	console.log('<a href="'+ address +'">'+sitename+'</a>' )

}


