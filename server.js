'use strict'
const fs = require('fs')
const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({ port: 8000 })

server.start((err) => {
	if (err) {
		throw err
	}
	console.log('server running at ', server.info.uri)
})

server.route({
	method: 'GET',
	path: '/',
	handler: (res, reply) => {
		reply('hellllllllo')
	}
})

exports = module.exports = server