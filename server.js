'use strict'
const fs = require('fs')
const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection(
	{ 
		port: 8000,
		routes: { cors: true }
	}
)

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('server running at ', server.info.uri)
})

server.route({
	method: 'GET',
	path: '/new',
	handler: (request, reply) => {
		fs.readFile('./deck.json', (err, data) => {
			if (err) {
				throw err
			}
			reply(data)
		})
		
	}
})

server.route({
	method: 'POST',
	path: '/round',
	handler: (request, reply) => {
		fs.readFile('./deck.json', (err, data) => {
			var roundObj = {
				"playerOne": 0,
				"playerTwo": 0,
				"win": false
			}
			console.log(request.payload)
			//var playerCard = payload something
			var computerDeck = data.array
			var computerCard = computerDeck.pop()
			if (computerCard.rating > playerCard.rating) {
				roundObj.playerOne += 1
			}
			else {
				roundObj.playerTwo += 1
			}
			reply(roundObj)
		})		
	}
})

server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		reply('hellllllllo')
	}
})

exports = module.exports = server