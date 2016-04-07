var request = require('request')


request.post({url:'http://localhost:8000/round', formData: { "name": "Pete", "rating": 50, "img":"placeholder.url"}})