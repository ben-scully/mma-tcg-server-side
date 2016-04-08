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

//set up for a new game
server.route({
	method: 'GET',
	path: '/new',
	handler: (request, reply) => {
		fs.readFile('./data/playerDeck.json', (err, data) => {
			if (err) {
				throw err
			}
			resetScoresToZero()
			replaceComputerDefault()
			reply(data)
		})
	}
})

function resetScoresToZero() {
	fs.readFile('./data/defaultscore.json', (err, data) => {
		if (err) {
			throw err
		}
		fs.writeFile('./data/score.json', data, (err) => {
			if(err) {
				throw err
			}
			console.log('reset scores to zero')
		})
	})
}

server.route({
	method: 'POST',
	path: '/round',
	handler: (request, reply) => {
		//read the computers deck
		fs.readFile('./data/computerdeck.json', (err, data) => {
			var computerDeck = JSON.parse(data)

			//early return for if array is empty
			if (computerDeck.length < 1) {
				reply('Error: No cards left').code(400)
			} else {

				//read the current score
				fs.readFile('./data/score.json', (err, data) => {
					var currentScore = JSON.parse(data)
					//pops off the card the computer will play and compares it to the players submitted card
					var computerCard = computerDeck.pop()
					//TEST check whether needs parsing
					try {
						var playerCard = JSON.parse(request.payload)
					} catch (err) {
						var playerCard = request.payload
					}

					if(!playerCard.rating) {
						reply('Err: Not a valid card').code(400)
					}				

					if (parseInt(computerCard.rating) > parseInt(playerCard.rating)) {
						currentScore.p2 += 1
					}
					else {
						currentScore.p1 += 1
					}
					//TEST add callbacks for savescore and savecomputerdeck and nest reply inside there
					//TODO replace pyramid of doom with named callback functions
					fs.writeFile('./data/score.json',JSON.stringify(currentScore), (err) => {
						if (err) {
							throw err
						}
						fs.writeFile('./data/computerdeck.json', JSON.stringify(computerDeck), (err) => {
							if (err) {
								throw err
							}
							console.log('saved new computerdeck data')
							reply(currentScore)
						})
					})
				})
			}
		})		
	}
})

server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		reply('MMA:TCG version: 0.0.1')
	}
})

function replaceComputerDefault () {
	fs.readFile('./data/defaultcomputerdeck.json', (err, data) => {
		if (err) {
			throw err
		}
		fs.writeFile('./data/computerdeck.json', data, (err) => {
			if(err) {
				throw err
			}
			console.log('replaced computer deck with default values')
		})
	})
}

exports = module.exports = server
