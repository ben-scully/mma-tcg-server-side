const fs = require('fs')

module.exports = function () {
	fs.readFile('../data/defaultcomputerdeck.json', (err, data) => {
		if (err) {
			throw err
		}
		fs.writeFile('../data/computerdeck.json', data, (err) => {
			if(err) {
				throw err
			}
			console.log('replaced computer deck with default values')
		})
	})
}
