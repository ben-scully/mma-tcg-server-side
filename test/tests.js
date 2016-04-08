var hapiTest = require('hapi-test')
var Hapi = require('hapi')
var assert = require('chai').assert
var should = require('chai').should()
var fs = require('fs')
var server = require('../server')

var expectedDeckJson = fs.readFileSync('./data/playerDeck.json', 'utf8')

describe("Server Initiation", function(){
  it('Root server can be accessed', function (done) {
      hapiTest({server: server})
          .get('/')
          .assert(200, done)
  })
  it('Root should return the api version number', function(done) {
    hapiTest({server: server})
      .get('/')
      .end(function(result){
        assert.equal(result.payload, "MMA:TCG version: 0.0.1", "call to root returns correct version number")
        done()
    })
  })
})

describe('New Game', function(){
  describe('Get initial deck', function(){
    it('should return a deck array with 3 cards', function(done){
        getNewDeck(function(result){
          assert.deepEqual(result.payload, expectedDeckJson, 'Api call to /new gives a 3 card deck')
          done()
        })
    })
    it('should return a deck array of 3 cards even if we take a card already', function(done){
      postCard(function(scoreObject){
        getNewDeck(function(deckObject){
          assert.deepEqual(deckObject.payload, expectedDeckJson, 'Api call to /new gives a 3 card deck')
          done()
        })
      })
    })
  })
})

describe('Round', function(){
  describe('One round', function(){
    it('should take a card and return a bout score', function(done){
      var scoreObject = JSON.stringify({name: 'Fighter One', img: 'test.jpg' ,rating: '100'})
      hapiTest({server: server})
        .post('/round', scoreObject)
        .end(function(result){
          var scoreObject = JSON.parse(result.payload)
          assert.notEqual(Object.keys(scoreObject).indexOf('p1'), -1 ,'player one score in the score object exists')
          assert.notEqual(Object.keys(scoreObject).indexOf('p2'), -1 ,'player two score in the score object exists')
          done()
        })
    })
    it('it should return error if the card sent is an empty object', function(done) {
      hapiTest({server: server})
        .post('/round', {})
        .end(function(result){
          assert.equal(result.payload, "Err: Not a valid card", 'sending an empty object returns an error')
          done()
        })
    })
  })
})

function getNewDeck(callback){
  hapiTest({server: server})
    .get('/new')
    .end(function(result){
      callback(result)
    })
}

function postCard(callback){
  var scoreObject = JSON.stringify({name: 'Fighter One', img: 'test.jpg' ,rating: '100'})
  //console.log('stringify', scoreObject)
  hapiTest({server: server})
    .post('/round', scoreObject)
    .end(function(result){
      callback(result)
    })
}
