var request = require('request')


request({
	method: 'POST',
	url:'http://localhost:8000/round',
	multipart: [
			{
				body :	{ "name": "Pete", "rating": 50, "img":"placeholder.url"},
				"content-type" : "application/json" 
			}
		]
	},
	function (err, response, body) {
		console.log('err', error)
		console.log('res', response)
		console.log('body', body)
	}
)
