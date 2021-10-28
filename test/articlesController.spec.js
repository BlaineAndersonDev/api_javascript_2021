// https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
const chai = require('chai'); // Assertion Library.
const chaiHttp = require('chai-http'); // HTTP integration testing with Chai assertions.
const app = require('../server.js'); // Run our API for testing.
const db = require('../db/database.js'); // Access to the local testing database (api_javascript_test).

chai.use(chaiHttp).should();

describe('Articles', function() {

  beforeEach( async () => await db.migrate.rollback()
    .then( async () => await db.migrate.latest())
    .then( async () => await db.seed.run())
  );
  afterEach( async () => await db.migrate.rollback());

  describe('GET *', function() {
    it('should list ALL articles on GET /articles', function(done) {
      chai.request(app).get('/api/1.0/articles').end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.SUCCESS.should.be.a('array');
        res.body.SUCCESS[0].should.have.property('id');
        res.body.SUCCESS[0].id.should.equal(1);
        res.body.SUCCESS[0].should.have.property('title');
        res.body.SUCCESS[0].title.should.equal('Basil');
        res.body.SUCCESS[0].should.have.property('text');
        res.body.SUCCESS[0].text.should.equal('Basil, also called great basil, is a culinary herb of the family Lamiaceae. Basil is native to tropical regions from central Africa to Southeast Asia. It is a tender plant, and is used in cuisines worldwide. There are many varieties of basil, as well as several related species or hybrids also called basil.');
        res.body.SUCCESS[0].should.have.property('created_at');
        res.body.SUCCESS[0].should.have.property('updated_at');
        done();
      });
    });
  });

  describe('GET', function() {
    it('should list a SINGLE article on GET /articles/:id', function(done) {
      chai.request(app).get('/api/1.0/articles/1').end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.SUCCESS.should.have.property('id');
        res.body.SUCCESS.id.should.equal(1);
        res.body.SUCCESS.should.have.property('title');
        res.body.SUCCESS.title.should.equal('Basil');
        res.body.SUCCESS.should.have.property('text');
        res.body.SUCCESS.text.should.equal('Basil, also called great basil, is a culinary herb of the family Lamiaceae. Basil is native to tropical regions from central Africa to Southeast Asia. It is a tender plant, and is used in cuisines worldwide. There are many varieties of basil, as well as several related species or hybrids also called basil.');
        res.body.SUCCESS.should.have.property('created_at');
        res.body.SUCCESS.should.have.property('updated_at');
        done();
      });
    });
  });

  describe('POST', function() {
    it('should add a SINGLE article on POST /articles', function(done) {
      chai.request(app).post('/api/1.0/articles')
        .send({
          'user_id': 1, 
          'title': 'Mint',
          'text': 'Mint was originally used as a medicinal herb to treat stomach ache and chest pains. There are several uses in traditional medicine and preliminary research for possible use in treating irritable bowel syndrome. Menthol from mint essential oil (40-90%) is an ingredient of many cosmetics and some perfumes.'
        }).end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.SUCCESS.should.have.property('id');
          res.body.SUCCESS.id.should.equal(5);
          res.body.SUCCESS.should.have.property('user_id');
          res.body.SUCCESS.user_id.should.equal(1);
          res.body.SUCCESS.should.have.property('title');
          res.body.SUCCESS.title.should.equal('Mint');
          res.body.SUCCESS.should.have.property('text');
          res.body.SUCCESS.text.should.equal('Mint was originally used as a medicinal herb to treat stomach ache and chest pains. There are several uses in traditional medicine and preliminary research for possible use in treating irritable bowel syndrome. Menthol from mint essential oil (40-90%) is an ingredient of many cosmetics and some perfumes.');
          done();
        });
    });
  });

  describe('PUT', function() {
    it('should update a SINGLE article on /articles/:id PUT', function(done) {
      chai.request(app).put('/api/1.0/articles/1')
        .send({
          'title': 'Oregano',
          'text': 'Oregano is a species of flowering plant in the mint family Lamiaceae. It was native to the Mediterranean region, but widely naturalised elsewhere in the temperate Northern Hemisphere.'
        }).end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('UPDATED');
          res.body.UPDATED.should.be.a('object');
          res.body.UPDATED.should.have.property('id');
          res.body.UPDATED.id.should.equal(1);
          res.body.UPDATED.should.have.property('user_id');
          res.body.UPDATED.user_id.should.equal(1);
          res.body.UPDATED.should.have.property('title');
          res.body.UPDATED.title.should.equal('Oregano');
          res.body.UPDATED.should.have.property('text');
          res.body.UPDATED.text.should.equal('Oregano is a species of flowering plant in the mint family Lamiaceae. It was native to the Mediterranean region, but widely naturalised elsewhere in the temperate Northern Hemisphere.');
          done();
      });
    });
  });

  describe('DELETE', function() {
    it('should delete a SINGLE article on /articles/:id DELETE', function(done) {
      chai.request(app).delete('/api/1.0/articles/1').end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  });

});
