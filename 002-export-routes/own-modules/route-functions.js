var request = require('request');
const rootURL = 'https://api.github.com/';

module.exports = {
  userDetails: userDetails,
  search: search
};



function userDetails(req, res){
	res.render('index', { title: 'Express' });
}


function search(req, res){
	console.log(req.query.search)
	console.log('********')
	console.log(req.body.search)

	var options = {
    url: rootURL + 'search/users?q=' + req.body.search + ' in:fullname',
    headers: {
      'User-Agent': 'deksr',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };

  request(options, function(err, response, body) {
    var usersData = JSON.parse(body);
	  res.render('search-result', { title: 'Express', usersData: usersData });
  });

}

