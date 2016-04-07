var hapiTest = require('hapi-test')
var Hapi = require('Hapi')
var assert = require('chai').assert
var should = require('chai').should()

var server = require('../server')

describe("Server Initiation", function(){
  it('Root server can be accessed', function (done) {
      hapiTest({server: server})
          .get('/')
          .assert(200, done)
  })
  it('Root should return the api', function(done) {
    hapiTest({server: server})
      .get('/')
      .end(function(result){

        done()
    })
  })
})

describe('New Game', function(){
  describe('Get initial deck', function(){
    it('should return a deck array with 3 cards')
  })
})


describe('Round', function(){
  describe('One round', function(){
    it('should take a card and return a bout score')
    it('it should return -1 if the card is invalid')
  })
})

describe('Bout', function(){
  describe('One bout', function(){
    it('should return a winner when the bout is complete')
  })
})
