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
		fs.readFile('./data/deck.json', (err, data) => {
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
		//console.log('req', request)
		//read the computers deck
		fs.readFile('./data/computerdeck.json', (err, data) => {
			var computerDeck = JSON.parse(data)
		//read the current score
			fs.readFile('./data/score.json', (err, data) => {
				var currentScore = JSON.parse(data)
		//pops off the card the computer will play and compares it to the players submitted card
				var computerCard = computerDeck.pop()
				var playerCard = request.payload
				//console.log(request.payload)
				if (computerCard.rating > playerCard.rating) {
					currentScore.playerOne += 1
				}
				else {
					currentScore.playerTwo += 1
				}
				saveScore(JSON.stringify(currentScore))
				saveComputerDeck(JSON.stringify(computerDeck))
				//console.log('reply', currentScore)
				reply(currentScore)
			})
		})

	}
})

function saveScore (data) {
	fs.writeFile('./data/score.json', data, (err) => {
		if (err) {
			console.error(err)
		}
	})
}

function saveComputerDeck (data) {
	fs.writeFile('./data/computerdeck.json', data, (err) => {
		if (err) {
			console.error(err)
		}
	})
}

server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		reply('MMA:TCG version: 0.0.1')
	}
})

exports = module.exports = server
