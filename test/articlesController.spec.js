// https://dev.to/bushraalam/introduction-to-testing-with-mocha-and-chai-57po

process.env.NODE_ENV = 'test';
const server = require('../server.js');
const db = require('../db/database.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
chai.use(chaiHttp);

beforeEach( async () => await knex.migrate.rollback()
  .then( async () => await knex.migrate.latest())
  .then( async () => await knex.seed.run())
);

afterEach( async () => await knex.migrate.rollback() );

describe('articlesController.js', function() {

  describe("GET a specific Article.", function() {
    it.only('Returns a HTTP Status of 200', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });//
    it('Returns JSON', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.should.be.json;
        done();
      });
    });//
    it('Returns a JSON Object', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.be.a('object');
        done();
      });
    });//
    it('Returns a JSON Object containing message', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.should.have.property('message');
        done();
      });
    });//
    it('Returns a JSON Object containing message: API returned Article with user_id of ABC123', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.message.should.equal('API returned Article with user_id of ABC123.');
        done();
      });
    });//
    it('Returns a JSON Object containing results', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.should.have.property('results');
        done();
      });
    });//
    it('Results contain user_id', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('user_id');
        done();
      });
    });//
    it('Results contain user_id: ABC123', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.user_id.should.equal('ABC123');
        done();
      });
    });//
  });

}); // End of Route Describe block.


