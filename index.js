var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
var express = require('express');
var app = express();
var axios = require('axios');

var st = require('stocktwits');

var params = {
	screen_name: 'Stocktwits',
	count: 30,
	lang: 'en'
};

var stocktwitsAPI = 'http://api.stocktwits.com/api/2/streams/symbol/';

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

app.get('/stocktwits', (req, res) => {
	axios
		.get(stocktwitsAPI)
		.then(function(response) {
			res.send(response.data.messages);
			console.log(response.data.messages);
		})
		.catch(function(error) {
			console.log(error);
		});

	// st.get('streams/user/StockTwits', function(err, response) {
	// 	console.log(response.body);
	// 	if (!err) {
	// 		res.json(response.body);
	// 	} else {
	// 		console.log(err);
	// 	}
	// });
});

app.listen(process.env.PORT || 8080);
console.log('Server started on PORT: 8080');
