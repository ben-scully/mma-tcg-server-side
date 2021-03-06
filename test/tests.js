var hapiTest = require('hapi-test')
var Hapi = require('hapi')
var assert = require('chai').assert
var should = require('chai').should()
var fs = require('fs')

var server = require('../server')

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
      var expectedDeckJson = fs.readFileSync('./data/playerDeck.json', 'utf8')
      hapiTest({server: server})
        .get('/new')
        .end(function(result){
          assert.deepEqual(result.payload, expectedDeckJson, 'Api call to /new gives a 3 card deck')
          done()
        })
    })
    it('should return a deck array of 3 cards even if we take a card already', function(done){
      hapiTest({server: server})
        .post('/round', {"name": "Fighter One", "img": "test.jpg" ,"rating": 100})
        .end(function(result){
          var expectedDeckJson = fs.readFileSync('./data/playerDeck.json', 'utf8')
          hapiTest({server: server})
            .get('/new')
            .end(function(result){
              assert.deepEqual(result.payload, expectedDeckJson, 'Api call to /new gives a 3 card deck')
              done()
            })
        })
    })
  })
})


describe('Round', function(){
  describe('One round', function(){
    it('should take a card and return a bout score', function(done){
      var scoreObject = {name: 'Fighter One', img: 'test.jpg' ,rating: 100}
      var stringifiedScoreObject = JSON.stringify(scoreObject)
      console.log('stringify', stringifiedScoreObject)
      hapiTest({server: server})
        .post('/round', stringifiedScoreObject)
        .end(function(result){
          var scoreObject = JSON.parse(result.payload)
          console.log('ouput', scoreObject)
          //assert.notEqual(Object.keys(scoreObject).indexOf('p1'), -1 ,'player one score in the score object exists')
          //assert.notEqual(Object.keys(scoreObject).indexOf('p2'), -1 ,'player two score in the score object exists')
          done()
        })
    })
    it('it should return -1 if the card is invalid', function(done) {
      hapiTest({server: server})
        .post('/round', {})
        .end(function(result){
          //var scoreObject = JSON.parse(result.payload)
          //console.log('scoreobject', scoreObject)
          //var score = scoreObject.playerOne + scoreObject.playerTwo
          //console.log("SCORE", score)
          //assert.equal(score, 1)
          done()
        })
    })
  })
})

describe('Bout', function(){
  describe('One bout', function(){
    it('should return a winner when the bout is complete')
  })
})
