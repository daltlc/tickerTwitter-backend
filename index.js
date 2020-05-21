var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
var express = require('express');
var app = express();

var params = {
	screen_name: 'Stocktwits',
	count: 30,
	lang: 'en'
};

var stocktwitsAPI = 'https://api.stocktwits.com/api/2/streams/amzn.json?';

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/twitter', (req, res) => {
	T.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			res.json(tweets);
		} else {
			console.log(error);
		}
	});
});

app.get('/stocktwits'),
	(req, res) => {
		axios.get(stocktwitsAPI).then(function(response) {
			console.log(response);
		});
	};

app.listen(process.env.PORT || 8080);
console.log('Server started on PORT: 8080');
