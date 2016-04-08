const fs = require('fs')

module.exports = function () {
	fs.readFile('../data/defaultscore.json', (err, data) => {
		if (err) {
			throw err
		}
		fs.writeFile('../data/score.json', data, (err) => {
			if(err) {
				throw err
			}
			console.log('reset scores to zero')
		})
	})
}