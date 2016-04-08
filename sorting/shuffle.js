module.exports = function (arr) {
	return arr.sort( function() { return 0.5 - Math.random() })
}