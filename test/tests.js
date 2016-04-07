var hapiTest = require('hapi-test')
var Hapi = require('Hapi')
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
      var expectedDeckJson = fs.readFileSync('../data/deck.json', 'utf8')
        hapiTest({server: server})
          .get('/new')
          .end(function(result){
            assert.deepEqual(result.payload, expectedDeckJson, 'Api call to /new gives a 3 card deck')
            done()
          })
    })
  })
})


describe('Round', function(){
  describe('One round', function(){
    it('should take a card and return a bout score', function(done){
      hapiTest({server: server})
        .post('/round', {"name": "Fighter One", "img": "test.jpg" ,"rating": 100})
        .end(function(result){
          console.log(result)
          //var scoreObject = result.payload
          //var score = scoreObject.playerOne + scoreObject.playerTwo
          //assert.equal(score, 1)
          done()
        })
    })
    it('it should return -1 if the card is invalid')
  })
})

describe('Bout', function(){
  describe('One bout', function(){
    it('should return a winner when the bout is complete')
  })
})
