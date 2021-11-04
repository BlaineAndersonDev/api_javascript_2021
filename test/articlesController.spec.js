// https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
const chai = require('chai'); // Assertion Library.
const chaiHttp = require('chai-http'); // HTTP integration testing with Chai assertions.
const app = require('../server.js'); // Run our API for testing.
const db = require('../db/database.js'); // Access to the local testing database (api_javascript_test).

chai.use(chaiHttp).should();

describe('Articles', () => {

  beforeEach( async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
  });
  afterEach( async () => { 
    await db.migrate.rollback()
  });

  describe('GET *', () => {
    it("should return 200 & all Articles", async () => {
      await chai.request(app).get('/api/1.0/articles')
        .then((res) => {
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
        });
    });
    it.skip('should return 500 and logs upon error.', async () => {});
  });

  describe('GET', () => {
    it("should return 200 & requested Article", async () => {
      await chai.request(app)
        .get('/api/1.0/articles/1')
        .then((res) => {
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
        });
    });
    it("should return 400 & MESSAGE if article_id does not exist", async () => {
      await chai.request(app)
        .get('/api/1.0/articles/846227894')
        .then((res) => {
          res.should.have.status(400);
          res.should.be.json;
        });
    });
    it.skip('should return 500 and logs upon error.', async () => {});
  });

  describe('POST', () => {
    it('should return 200 & created Article.', async () => {
      await chai.request(app)
        .post('/api/1.0/articles')
        .send({
          'user_id': 1, 
          'title': 'Mint',
          'text': 'Mint was originally used as a medicinal herb to treat stomach ache and chest pains. There are several uses in traditional medicine and preliminary research for possible use in treating irritable bowel syndrome. Menthol from mint essential oil (40-90%) is an ingredient of many cosmetics and some perfumes.'
        })
        .then((res) => {
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
        });
    });
    it('should return 400 and MESSAGE if missing user_id.', async () => {
      await chai.request(app)
        .post('/api/1.0/articles')
        .send({
          'title': 'Mint',
          'text': 'Mint was originally used as a medicinal herb to treat stomach ache and chest pains. There are several uses in traditional medicine and preliminary research for possible use in treating irritable bowel syndrome. Menthol from mint essential oil (40-90%) is an ingredient of many cosmetics and some perfumes.'
        })
        .then((res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('MESSAGE');
          res.body.MESSAGE.should.equal('Body must contain user_id.');
        });
    });
    it('should return 400 and MESSAGE if missing title.', async () => {
      await chai.request(app)
        .post('/api/1.0/articles')
        .send({
          'user_id': 1, 
          'text': 'Mint was originally used as a medicinal herb to treat stomach ache and chest pains. There are several uses in traditional medicine and preliminary research for possible use in treating irritable bowel syndrome. Menthol from mint essential oil (40-90%) is an ingredient of many cosmetics and some perfumes.'
        })
        .then((res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('MESSAGE');
          res.body.MESSAGE.should.equal('Body must contain title.');
        });
    });
    it('should return 400 and MESSAGE if missing text.', async () => {
      await chai.request(app)
        .post('/api/1.0/articles')
        .send({
          'user_id': 1, 
          'title': 'Mint'
        })
        .then((res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('MESSAGE');
          res.body.MESSAGE.should.equal('Body must contain text.');
        });
    });
    it.skip('should return 500 and logs upon error.', async () => {});
  });

  describe('PUT', () => {
    it('should return 200 & UPDATED Article.', async () => {
      await chai.request(app)
        .put('/api/1.0/articles/1')
        .send({
          'title': 'Oregano',
          'text': 'Oregano is a species of flowering plant in the mint family Lamiaceae. It was native to the Mediterranean region, but widely naturalised elsewhere in the temperate Northern Hemisphere.'
        })
        .then((res) => {
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
        });
    });
    it('should return 200 & UPDATED Article with title only', async () => {
      await chai.request(app)
        .put('/api/1.0/articles/1')
        .send({
          'title': 'Oregano'
        })
        .then((res) => {
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
          res.body.UPDATED.text.should.equal('Basil, also called great basil, is a culinary herb of the family Lamiaceae. Basil is native to tropical regions from central Africa to Southeast Asia. It is a tender plant, and is used in cuisines worldwide. There are many varieties of basil, as well as several related species or hybrids also called basil.');
        });
    });
    it('should return 200 & UPDATED Article with text only', async () => {
      await chai.request(app)
        .put('/api/1.0/articles/1')
        .send({
          'text': 'Oregano is a species of flowering plant in the mint family Lamiaceae. It was native to the Mediterranean region, but widely naturalised elsewhere in the temperate Northern Hemisphere.'
        })
        .then((res) => {
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
          res.body.UPDATED.title.should.equal('Basil');
          res.body.UPDATED.should.have.property('text');
          res.body.UPDATED.text.should.equal('Oregano is a species of flowering plant in the mint family Lamiaceae. It was native to the Mediterranean region, but widely naturalised elsewhere in the temperate Northern Hemisphere.');
        });
    });
    it.skip('should return 500 and logs upon error.', async () => {});
  });

  describe('DELETE', () => {
    it('should return 200', async () => {
      chai.request(app)
        .delete('/api/1.0/articles/1')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('SUCCESSs');
          res.body.SUCCESS.should.equal('');
          res.body.should.have.property('MESSAGE');
          res.body.MESSAGE.should.equal('Params must contain user_id.');
        });
    });
    it.skip('should return 400 and MESSAGE if missing article_id', async () => {
      await chai.request(app)
        .delete('/api/1.0/articles/a')
        .then((res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('MESSAGE');
          res.body.MESSAGE.should.equal('Params must contain user_id.');
        });
    });
    it.skip('should return 500 and logs upon error.', async () => {});
  });

});
