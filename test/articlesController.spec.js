process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server.js');
const knex = require('../db/database.js');

require('dotenv').config()
chai.use(chaiHttp);

describe('usersController.js', function() {

  beforeEach( async () => await knex.migrate.rollback()
    .then( async () => await knex.migrate.latest())
    .then( async () => await knex.seed.run())
  );

  afterEach( async () => await knex.migrate.rollback() );

// ===============================================================================
  describe("GET a specific User.", function() {
  // Variables for tests.
    const route = "/api/users/ABC123";
    const headers = {authorization: 'Bearer ' + process.env.MOCHA_AUTH};
    const badParamsRoute = "/api/users/5";
    const malformedParamsRoute = "/api/users/a_b*@!!!12";

  // ---------------------------------
  // ---=== Successful Requests ===---
    it('Returns a HTTP Status of 200', function(done) {
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
    it('Returns a JSON Object containing message: API returned User with user_id of ABC123', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.message.should.equal('API returned User with user_id of ABC123.');
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
    it('Results contain gender', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('gender');
        done();
      });
    });//
    it('Results contain gender: male', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.gender.should.equal('male');
        done();
      });
    });//
    it('Results contain birthdate', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('birthdate');
        done();
      });
    });//
    it('Results contain birthdate: 1989-08-08T06:00:00.020Z', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.birthdate.should.equal('1989-08-08T06:00:00.020Z');
        done();
      });
    });//
    it('Results contain name', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('name');
        done();
      });
    });//
    it('Results contain name: Blaine Anderson', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.name.should.equal('Blaine Anderson');
        done();
      });
    });//
    it('Results contain premium', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('premium');
        done();
      });
    });//
    it('Results contain premium: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.premium.should.equal(false);
        done();
      });
    });//
    it('Results contain agreed_to_terms', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('agreed_to_terms');
        done();
      });
    });//
    it('Results contain agreed_to_terms: true', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.agreed_to_terms.should.equal(true);
        done();
      });
    });//
    it('Results contain opt_in_to_marketing', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('opt_in_to_marketing');
        done();
      });
    });//
    it('Results contain opt_in_to_marketing: true', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.opt_in_to_marketing.should.equal(true);
        done();
      });
    });//
    it('Results contain profile_answer_1', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_1');
        done();
      });
    });//
    it('Results contain profile_answer_1: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_1.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_2', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_2');
        done();
      });
    });//
    it('Results contain profile_answer_2: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_2.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_3', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_3');
        done();
      });
    });//
    it('Results contain profile_answer_3: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_3.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_4', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_4');
        done();
      });
    });//
    it('Results contain profile_answer_4: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_4.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_5', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_5');
        done();
      });
    });//
    it('Results contain profile_answer_5: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_5.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_6', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_6');
        done();
      });
    });//
    it('Results contain profile_answer_6: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_6.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_7', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_7');
        done();
      });
    });//
    it('Results contain profile_answer_7: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_7.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_8', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_8');
        done();
      });
    });//
    it('Results contain profile_answer_8: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_8.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_9', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_9');
        done();
      });
    });//
    it('Results contain profile_answer_9: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_9.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_10', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_10');
        done();
      });
    });//
    it('Results contain profile_answer_10: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_10.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_11', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_11');
        done();
      });
    });//
    it('Results contain profile_answer_11: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_11.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_12', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_12');
        done();
      });
    });//
    it('Results contain profile_answer_12: false', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.profile_answer_12.should.equal(false);
        done();
      });
    });//
    it('Results contain created_at', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('created_at');
        done();
      });
    });//
    it('Results contain created_at: 2019-06-19T21:13:40.826Z', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.created_at.should.equal('2019-06-19T21:13:40.826Z');
        done();
      });
    });//
    it('Results contain updated_at', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.should.have.property('updated_at');
        done();
      });
    });//
    it('Results contain updated_at: 2019-06-19T21:13:40.826Z', function(done) {
      chai.request(server).get(route).set(headers).end(function(err, res) {
        res.body.results.updated_at.should.equal('2019-06-19T21:13:40.826Z');
        done();
      });
    });//

  // -----------------------------------
  // ---=== Client Error Requests ===---
    it('Client Error: If user_id does not exist, Returns HTTP Status of 500', function(done) {
      chai.request(server).get(badParamsRoute).set(headers).end(function(err, res) {
        res.should.have.status(500);
        done();
      });
    });//
    it('Client Error: If user_id does not exist, Returns message: User with provided user_id: 5 does not exist.', function(done) {
      chai.request(server).get(badParamsRoute).set(headers).end(function(err, res) {
        res.body.message.should.equal('User with provided user_id: 5 does not exist.');
        done();
      });
    });//

  }); // End of Route Describe block.
// ===============================================================================
// =~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~=
// ===============================================================================

  describe("POST a new User.", function() {
  // Variables for tests.
    const route = "/api/users/";
    const headers = {
      authorization: 'Bearer ' + process.env.MOCHA_AUTH,
      'content-type': 'application/json'
    };
    const userAlreadyExistsRoute = "/api/users/";

    // User object to send in each Chai request.
    const newUser = {
      user_id: 'JKL101112',
      gender: 'male',
      birthdate: '1988-08-08T06:00:00.020Z',
      name: 'Chris Potter',
      premium: 'false',
      agreed_to_terms: 'true',
      opt_in_to_marketing: 'true',
      profile_answer_1: 'false',
      profile_answer_2: 'false',
      profile_answer_3: 'false',
      profile_answer_4: 'false',
      profile_answer_5: 'false',
      profile_answer_6: 'false',
      profile_answer_7: 'false',
      profile_answer_8: 'false',
      profile_answer_9: 'false',
      profile_answer_10: 'false',
      profile_answer_11: 'false',
      profile_answer_12: 'false',
      created_at: '2019-06-19T21:13:40.826Z',
      updated_at: '2019-06-19T21:13:40.826Z'
    };

  // ---------------------------------
  // ---=== Successful Requests ===---
    it('Returns a HTTP Status of 200', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });//
    it('Returns JSON', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.should.be.json;
        done();
      });
    });//
    it('Returns a JSON Object', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.be.a('object');
        done();
      });
    });//
    it('Returns a JSON Object containing message', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.should.have.property('message');
        done();
      });
    });//
    it('Returns a JSON Object containing message: API returned newly created User with user_id of JKL101112', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.message.should.equal('API returned newly created User with user_id of JKL101112.');
        done();
      });
    });//
    it('Returns a JSON Object containing results', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.should.have.property('results');
        done();
      });
    });//
    it('Results contain user_id', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('user_id');
        done();
      });
    });//
    it('Results contain user_id: JKL101112', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.user_id.should.equal('JKL101112');
        done();
      });
    });//
    it('Results contain gender', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('gender');
        done();
      });
    });//
    it('Results contain gender: male', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.gender.should.equal('male');
        done();
      });
    });//
    it('Results contain birthdate', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('birthdate');
        done();
      });
    });//
    it('Results contain birthdate: 1988-08-08T06:00:00.020Z', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.birthdate.should.equal('1988-08-08T06:00:00.020Z');
        done();
      });
    });//
    it('Results contain name', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('name');
        done();
      });
    });//
    it('Results contain name: Chris Potter', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.name.should.equal('Chris Potter');
        done();
      });
    });//
    it('Results contain premium', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('premium');
        done();
      });
    });//
    it('Results contain premium: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.premium.should.equal(false);
        done();
      });
    });//
    it('Results contain agreed_to_terms', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('agreed_to_terms');
        done();
      });
    });//
    it('Results contain agreed_to_terms: true', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.agreed_to_terms.should.equal(true);
        done();
      });
    });//
    it('Results contain opt_in_to_marketing', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('opt_in_to_marketing');
        done();
      });
    });//
    it('Results contain opt_in_to_marketing: true', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.opt_in_to_marketing.should.equal(true);
        done();
      });
    });//
    it('Results contain profile_answer_1', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_1');
        done();
      });
    });//
    it('Results contain profile_answer_1: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_1.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_2', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_2');
        done();
      });
    });//
    it('Results contain profile_answer_2: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_2.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_3', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_3');
        done();
      });
    });//
    it('Results contain profile_answer_3: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_3.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_4', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_4');
        done();
      });
    });//
    it('Results contain profile_answer_4: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_4.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_5', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_5');
        done();
      });
    });//
    it('Results contain profile_answer_5: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_5.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_6', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_6');
        done();
      });
    });//
    it('Results contain profile_answer_6: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_6.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_7', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_7');
        done();
      });
    });//
    it('Results contain profile_answer_7: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_7.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_8', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_8');
        done();
      });
    });//
    it('Results contain profile_answer_8: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_8.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_9', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_9');
        done();
      });
    });//
    it('Results contain profile_answer_9: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_9.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_10', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_10');
        done();
      });
    });//
    it('Results contain profile_answer_10: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_10.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_11', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_11');
        done();
      });
    });//
    it('Results contain profile_answer_11: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_11.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_12', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_12');
        done();
      });
    });//
    it('Results contain profile_answer_12: false', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.profile_answer_12.should.equal(false);
        done();
      });
    });//
    it('Results contain created_at', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('created_at');
        done();
      });
    });//
    it('Results contain updated_at', function(done) {
      chai.request(server).post(route).set(headers).send(newUser).end(function(err, res) {
        res.body.results.should.have.property('updated_at');
        done();
      });
    });//

  // -----------------------------------
  // ---=== Client Error Requests ===---
    // Maintained variables for deleting and re-adding to object.
    const post_user_id = 'ABC123';
    const post_gender = 'male';
    const post_birthdate = '1988-08-08T06:00:00.020Z';
    const post_name = 'Chris Potter';
    const post_premium = 'false';
    const post_agreed_to_terms = 'true';
    const post_opt_in_to_marketing = 'true';
    const post_profile_answer_1 = 'false';
    const post_profile_answer_2 = 'false';
    const post_profile_answer_3 = 'false';
    const post_profile_answer_4 = 'false';
    const post_profile_answer_5 = 'false';
    const post_profile_answer_6 = 'false';
    const post_profile_answer_7 = 'false';
    const post_profile_answer_8 = 'false';
    const post_profile_answer_9 = 'false';
    const post_profile_answer_10 = 'false';
    const post_profile_answer_11 = 'false';
    const post_profile_answer_12 = 'false';
    const post_created_at = '2019-06-19T21:13:40.826Z';
    const post_updated_at = '2019-06-19T21:13:40.826Z';

    // Initial object to manipulate for following Client Error tests.
    let seededUser = {
      user_id: post_user_id,
      gender: post_gender,
      birthdate: post_birthdate,
      name: post_name,
      premium: post_premium,
      agreed_to_terms: post_agreed_to_terms,
      opt_in_to_marketing: post_opt_in_to_marketing,
      profile_answer_1: post_profile_answer_1,
      profile_answer_2: post_profile_answer_2,
      profile_answer_3: post_profile_answer_3,
      profile_answer_4: post_profile_answer_4,
      profile_answer_5: post_profile_answer_5,
      profile_answer_6: post_profile_answer_6,
      profile_answer_7: post_profile_answer_7,
      profile_answer_8: post_profile_answer_8,
      profile_answer_9: post_profile_answer_9,
      profile_answer_10: post_profile_answer_10,
      profile_answer_11: post_profile_answer_11,
      profile_answer_12: post_profile_answer_12,
      created_at: post_created_at,
      updated_at: post_updated_at
    };

    it('Client Error: If user_id not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['user_id']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['user_id'] = post_user_id; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If user_id not included in body, Return message: Body must contain user_id.', function(done) {
      delete seededUser['user_id']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain user_id.');
        done();
      });
      seededUser['user_id'] = post_user_id; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If gender not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['gender']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['gender'] = post_gender; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If gender not included in body, Return message: Body must contain gender.', function(done) {
      delete seededUser['gender']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain gender.');
        done();
      });
      seededUser['gender'] = post_gender; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If birthdate not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['birthdate']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['birthdate'] = post_birthdate; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If birthdate not included in body, Return message: Body must contain birthdate.', function(done) {
      delete seededUser['birthdate']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain birthdate.');
        done();
      });
      seededUser['birthdate'] = post_birthdate; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If name not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['name']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['name'] = post_name; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If name not included in body, Return message: Body must contain name.', function(done) {
      delete seededUser['name']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain name.');
        done();
      });
      seededUser['name'] = post_name; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If premium not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['premium']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['premium'] = post_premium; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If premium not included in body, Return message: Body must contain premium.', function(done) {
      delete seededUser['premium']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain premium.');
        done();
      });
      seededUser['premium'] = post_premium; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If agreed_to_terms not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['agreed_to_terms']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['agreed_to_terms'] = post_agreed_to_terms; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If agreed_to_terms not included in body, Return message: Body must contain agreed_to_terms.', function(done) {
      delete seededUser['agreed_to_terms']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain agreed_to_terms.');
        done();
      });
      seededUser['agreed_to_terms'] = post_agreed_to_terms; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If opt_in_to_marketing not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['opt_in_to_marketing']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['opt_in_to_marketing'] = post_opt_in_to_marketing; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If opt_in_to_marketing not included in body, Return message: Body must contain opt_in_to_marketing.', function(done) {
      delete seededUser['opt_in_to_marketing']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain opt_in_to_marketing.');
        done();
      });
      seededUser['opt_in_to_marketing'] = post_opt_in_to_marketing; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_1 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_1']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_1'] = post_profile_answer_1; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_1 not included in body, Return message: Body must contain profile_answer_1.', function(done) {
      delete seededUser['profile_answer_1']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_1.');
        done();
      });
      seededUser['profile_answer_1'] = post_profile_answer_1; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_2 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_2']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_2'] = post_profile_answer_2; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_2 not included in body, Return message: Body must contain profile_answer_2.', function(done) {
      delete seededUser['profile_answer_2']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_2.');
        done();
      });
      seededUser['profile_answer_2'] = post_profile_answer_2; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_3 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_3']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_3'] = post_profile_answer_3; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_3 not included in body, Return message: Body must contain profile_answer_3.', function(done) {
      delete seededUser['profile_answer_3']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_3.');
        done();
      });
      seededUser['profile_answer_3'] = post_profile_answer_3; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_4 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_4']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_4'] = post_profile_answer_4; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_4 not included in body, Return message: Body must contain profile_answer_4.', function(done) {
      delete seededUser['profile_answer_4']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_4.');
        done();
      });
      seededUser['profile_answer_4'] = post_profile_answer_4; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_5 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_5']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_5'] = post_profile_answer_5; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_5 not included in body, Return message: Body must contain profile_answer_5.', function(done) {
      delete seededUser['profile_answer_5']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_5.');
        done();
      });
      seededUser['profile_answer_5'] = post_profile_answer_5; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_6 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_6']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_6'] = post_profile_answer_6; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_6 not included in body, Return message: Body must contain profile_answer_6.', function(done) {
      delete seededUser['profile_answer_6']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_6.');
        done();
      });
      seededUser['profile_answer_6'] = post_profile_answer_6; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_7 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_7']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_7'] = post_profile_answer_7; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_7 not included in body, Return message: Body must contain profile_answer_7.', function(done) {
      delete seededUser['profile_answer_7']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_7.');
        done();
      });
      seededUser['profile_answer_7'] = post_profile_answer_7; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_8 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_8']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_8'] = post_profile_answer_8; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_8 not included in body, Return message: Body must contain profile_answer_8.', function(done) {
      delete seededUser['profile_answer_8']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_8.');
        done();
      });
      seededUser['profile_answer_8'] = post_profile_answer_8; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_9 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_9']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_9'] = post_profile_answer_9; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_9 not included in body, Return message: Body must contain profile_answer_9.', function(done) {
      delete seededUser['profile_answer_9']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_9.');
        done();
      });
      seededUser['profile_answer_9'] = post_profile_answer_9; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_10 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_10']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_10'] = post_profile_answer_10; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_10 not included in body, Return message: Body must contain profile_answer_10.', function(done) {
      delete seededUser['profile_answer_10']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_10.');
        done();
      });
      seededUser['profile_answer_10'] = post_profile_answer_10; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_11 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_11']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_11'] = post_profile_answer_11; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_11 not included in body, Return message: Body must contain profile_answer_11.', function(done) {
      delete seededUser['profile_answer_11']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_11.');
        done();
      });
      seededUser['profile_answer_11'] = post_profile_answer_11; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_12 not included in body, Return HTTP Status of 400', function(done) {
      delete seededUser['profile_answer_12']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      seededUser['profile_answer_12'] = post_profile_answer_12; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_12 not included in body, Return message: Body must contain profile_answer_12.', function(done) {
      delete seededUser['profile_answer_12']; // Delete item from object prior to testing against API.
      chai.request(server).post(route).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_12.');
        done();
      });
      seededUser['profile_answer_12'] = post_profile_answer_12; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If user_id already exists, Return HTTP Status of 500', function(done) {
      chai.request(server).post(userAlreadyExistsRoute).set(headers).send(seededUser).end(function(err, res) {
        res.should.have.status(500);
        done();
      });
    });//
    it('Client Error: If user_id already exists, Return message: User with provided user_id ABC123 already exists.', function(done) {
      chai.request(server).post(userAlreadyExistsRoute).set(headers).send(seededUser).end(function(err, res) {
        res.body.message.should.equal('User with provided user_id ABC123 already exists.');
        done();
      });
    });//

  }); // End of Route Describe block.
// ===============================================================================
// =~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~=
// ===============================================================================

  describe("PUT (Update) an existing User.", function() {
  // Variables for tests.
    const route = "/api/users/ABC123";
    const malformedPutRoute = "/api/users/";
    const headers = {
      authorization: 'Bearer ' + process.env.MOCHA_AUTH,
      'content-type': 'application/json'
    };

    // User object to send in each Chai request.
    const updatedUser = {
      user_id: 'ABC123',
      gender: 'undisclosed',
      birthdate: '1966-08-08T06:00:00.020Z',
      name: 'Corban Ben Thannon',
      premium: 'false',
      agreed_to_terms: 'true',
      opt_in_to_marketing: 'true',
      profile_answer_1: 'false',
      profile_answer_2: 'false',
      profile_answer_3: 'false',
      profile_answer_4: 'false',
      profile_answer_5: 'false',
      profile_answer_6: 'false',
      profile_answer_7: 'false',
      profile_answer_8: 'false',
      profile_answer_9: 'false',
      profile_answer_10: 'false',
      profile_answer_11: 'false',
      profile_answer_12: 'false',
      created_at: '2019-06-19T21:13:40.826Z',
      updated_at: '2019-06-19T21:13:40.826Z'
    };

  // ---------------------------------
  // ---=== Successful Requests ===---
    it('Returns a HTTP Status of 200', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });//
    it('Returns JSON', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.should.be.json;
        done();
      });
    });//
    it('Returns a JSON Object', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.be.a('object');
        done();
      });
    });//
    it('Returns a JSON Object containing message', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.should.have.property('message');
        done();
      });
    });//
    it('Returns a JSON Object containing message: API returned Updated User with user_id of ABC123', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.message.should.equal('API returned Updated User with user_id of ABC123.');
        done();
      });
    });//
    it('Returns a JSON Object containing results', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.should.have.property('results');
        done();
      });
    });//
    it('Results contain user_id', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('user_id');
        done();
      });
    });//
    it('Results contain user_id: ABC123', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.user_id.should.equal('ABC123');
        done();
      });
    });//
    it('Results contain gender', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('gender');
        done();
      });
    });//
    it('Results contain gender: undisclosed', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.gender.should.equal('undisclosed');
        done();
      });
    });//
    it('Results contain birthdate', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('birthdate');
        done();
      });
    });//
    it('Results contain birthdate: 1966-08-08T06:00:00.020Z', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.birthdate.should.equal('1966-08-08T06:00:00.020Z');
        done();
      });
    });//
    it('Results contain name', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('name');
        done();
      });
    });//
    it('Results contain name: Corban Ben Thannon', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.name.should.equal('Corban Ben Thannon');
        done();
      });
    });//
    it('Results contain premium', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('premium');
        done();
      });
    });//
    it('Results contain premium: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.premium.should.equal(false);
        done();
      });
    });//
    it('Results contain agreed_to_terms', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('agreed_to_terms');
        done();
      });
    });//
    it('Results contain agreed_to_terms: true', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.agreed_to_terms.should.equal(true);
        done();
      });
    });//
    it('Results contain opt_in_to_marketing', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('opt_in_to_marketing');
        done();
      });
    });//
    it('Results contain opt_in_to_marketing: true', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.opt_in_to_marketing.should.equal(true);
        done();
      });
    });//
    it('Results contain profile_answer_1', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_1');
        done();
      });
    });//
    it('Results contain profile_answer_1: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_1.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_2', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_2');
        done();
      });
    });//
    it('Results contain profile_answer_2: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_2.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_3', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_3');
        done();
      });
    });//
    it('Results contain profile_answer_3: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_3.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_4', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_4');
        done();
      });
    });//
    it('Results contain profile_answer_4: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_4.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_5', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_5');
        done();
      });
    });//
    it('Results contain profile_answer_5: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_5.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_6', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_6');
        done();
      });
    });//
    it('Results contain profile_answer_6: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_6.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_7', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_7');
        done();
      });
    });//
    it('Results contain profile_answer_7: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_7.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_8', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_8');
        done();
      });
    });//
    it('Results contain profile_answer_8: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_8.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_9', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_9');
        done();
      });
    });//
    it('Results contain profile_answer_9: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_9.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_10', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_10');
        done();
      });
    });//
    it('Results contain profile_answer_10: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_10.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_11', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_11');
        done();
      });
    });//
    it('Results contain profile_answer_11: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_11.should.equal(false);
        done();
      });
    });//
    it('Results contain profile_answer_12', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('profile_answer_12');
        done();
      });
    });//
    it('Results contain profile_answer_12: false', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.profile_answer_12.should.equal(false);
        done();
      });
    });//
    it('Results contain created_at', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('created_at');
        done();
      });
    });//
    it('Results contain updated_at', function(done) {
      chai.request(server).put(route).set(headers).send(updatedUser).end(function(err, res) {
        res.body.results.should.have.property('updated_at');
        done();
      });
    });//

  // -----------------------------------
  // ---=== Client Error Requests ===---
    // Maintained variables for deleting and re-adding to object.
    const put_gender = 'female';
    const put_birthdate = '1988-08-08T06:00:00.020Z';
    const put_name = 'Cywen Ben Thannon';
    const put_premium = 'false';
    const put_agreed_to_terms = 'true';
    const put_opt_in_to_marketing = 'true';
    const put_profile_answer_1 = 'false';
    const put_profile_answer_2 = 'false';
    const put_profile_answer_3 = 'false';
    const put_profile_answer_4 = 'false';
    const put_profile_answer_5 = 'false';
    const put_profile_answer_6 = 'false';
    const put_profile_answer_7 = 'false';
    const put_profile_answer_8 = 'false';
    const put_profile_answer_9 = 'false';
    const put_profile_answer_10 = 'false';
    const put_profile_answer_11 = 'false';
    const put_profile_answer_12 = 'false';

    // Initial object to manipulate for following Client Error tests.
    let mallablePutUser = {
      gender: put_gender,
      birthdate: put_birthdate,
      name: put_name,
      premium: put_premium,
      agreed_to_terms: put_agreed_to_terms,
      opt_in_to_marketing: put_opt_in_to_marketing,
      profile_answer_1: put_profile_answer_1,
      profile_answer_2: put_profile_answer_2,
      profile_answer_3: put_profile_answer_3,
      profile_answer_4: put_profile_answer_4,
      profile_answer_5: put_profile_answer_5,
      profile_answer_6: put_profile_answer_6,
      profile_answer_7: put_profile_answer_7,
      profile_answer_8: put_profile_answer_8,
      profile_answer_9: put_profile_answer_9,
      profile_answer_10: put_profile_answer_10,
      profile_answer_11: put_profile_answer_11,
      profile_answer_12: put_profile_answer_12
    };

    it('Client Error: If gender not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['gender']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['gender'] = put_gender; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If gender not included in body, Return message: Body must contain gender.', function(done) {
      delete mallablePutUser['gender']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain gender.');
        done();
      });
      mallablePutUser['gender'] = put_gender; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If birthdate not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['birthdate']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['birthdate'] = put_birthdate; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If birthdate not included in body, Return message: Body must contain birthdate.', function(done) {
      delete mallablePutUser['birthdate']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain birthdate.');
        done();
      });
      mallablePutUser['birthdate'] = put_birthdate; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If name not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['name']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['name'] = put_name; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If name not included in body, Return message: Body must contain name.', function(done) {
      delete mallablePutUser['name']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain name.');
        done();
      });
      mallablePutUser['name'] = put_name; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If premium not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['premium']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['premium'] = put_premium; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If premium not included in body, Return message: Body must contain premium.', function(done) {
      delete mallablePutUser['premium']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain premium.');
        done();
      });
      mallablePutUser['premium'] = put_premium; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If agreed_to_terms not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['agreed_to_terms']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['agreed_to_terms'] = put_agreed_to_terms; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If agreed_to_terms not included in body, Return message: Body must contain agreed_to_terms.', function(done) {
      delete mallablePutUser['agreed_to_terms']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain agreed_to_terms.');
        done();
      });
      mallablePutUser['agreed_to_terms'] = put_agreed_to_terms; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If opt_in_to_marketing not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['opt_in_to_marketing']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['opt_in_to_marketing'] = put_opt_in_to_marketing; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If opt_in_to_marketing not included in body, Return message: Body must contain opt_in_to_marketing.', function(done) {
      delete mallablePutUser['opt_in_to_marketing']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain opt_in_to_marketing.');
        done();
      });
      mallablePutUser['opt_in_to_marketing'] = put_opt_in_to_marketing; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_1 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_1']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_1'] = put_profile_answer_1; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_1 not included in body, Return message: Body must contain profile_answer_1.', function(done) {
      delete mallablePutUser['profile_answer_1']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_1.');
        done();
      });
      mallablePutUser['profile_answer_1'] = put_profile_answer_1; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_2 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_2']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_2'] = put_profile_answer_2; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_2 not included in body, Return message: Body must contain profile_answer_2.', function(done) {
      delete mallablePutUser['profile_answer_2']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_2.');
        done();
      });
      mallablePutUser['profile_answer_2'] = put_profile_answer_2; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_3 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_3']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_3'] = put_profile_answer_3; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_3 not included in body, Return message: Body must contain profile_answer_3.', function(done) {
      delete mallablePutUser['profile_answer_3']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_3.');
        done();
      });
      mallablePutUser['profile_answer_3'] = put_profile_answer_3; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_4 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_4']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_4'] = put_profile_answer_4; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_4 not included in body, Return message: Body must contain profile_answer_4.', function(done) {
      delete mallablePutUser['profile_answer_4']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_4.');
        done();
      });
      mallablePutUser['profile_answer_4'] = put_profile_answer_4; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_5 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_5']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_5'] = put_profile_answer_5; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_5 not included in body, Return message: Body must contain profile_answer_5.', function(done) {
      delete mallablePutUser['profile_answer_5']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_5.');
        done();
      });
      mallablePutUser['profile_answer_5'] = put_profile_answer_5; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_6 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_6']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_6'] = put_profile_answer_6; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_6 not included in body, Return message: Body must contain profile_answer_6.', function(done) {
      delete mallablePutUser['profile_answer_6']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_6.');
        done();
      });
      mallablePutUser['profile_answer_6'] = put_profile_answer_6; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_7 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_7']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_7'] = put_profile_answer_7; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_7 not included in body, Return message: Body must contain profile_answer_7.', function(done) {
      delete mallablePutUser['profile_answer_7']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_7.');
        done();
      });
      mallablePutUser['profile_answer_7'] = put_profile_answer_7; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_8 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_8']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_8'] = put_profile_answer_8; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_8 not included in body, Return message: Body must contain profile_answer_8.', function(done) {
      delete mallablePutUser['profile_answer_8']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_8.');
        done();
      });
      mallablePutUser['profile_answer_8'] = put_profile_answer_8; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_9 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_9']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_9'] = put_profile_answer_9; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_9 not included in body, Return message: Body must contain profile_answer_9.', function(done) {
      delete mallablePutUser['profile_answer_9']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_9.');
        done();
      });
      mallablePutUser['profile_answer_9'] = put_profile_answer_9; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_10 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_10']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_10'] = put_profile_answer_10; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_10 not included in body, Return message: Body must contain profile_answer_10.', function(done) {
      delete mallablePutUser['profile_answer_10']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_10.');
        done();
      });
      mallablePutUser['profile_answer_10'] = put_profile_answer_10; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_11 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_11']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_11'] = put_profile_answer_11; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_11 not included in body, Return message: Body must contain profile_answer_11.', function(done) {
      delete mallablePutUser['profile_answer_11']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_11.');
        done();
      });
      mallablePutUser['profile_answer_11'] = put_profile_answer_11; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_12 not included in body, Return HTTP Status of 400', function(done) {
      delete mallablePutUser['profile_answer_12']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.should.have.status(400);
        done();
      });
      mallablePutUser['profile_answer_12'] = put_profile_answer_12; // Re-add the item to the object after test is complete.
    });//
    it('Client Error: If profile_answer_12 not included in body, Return message: Body must contain profile_answer_12.', function(done) {
      delete mallablePutUser['profile_answer_12']; // Delete item from object prior to testing against API.
      chai.request(server).put(route).set(headers).send(mallablePutUser).end(function(err, res) {
        res.body.message.should.equal('Body must contain profile_answer_12.');
        done();
      });
      mallablePutUser['profile_answer_12'] = put_profile_answer_12; // Re-add the item to the object after test is complete.
    });//

  }); // End of Route Describe block.
// ===============================================================================
// =~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~=
// ===============================================================================

  describe("DELETE a specific User.", function() {
  // Variables for tests.
    const route = "/api/users/ABC123";
    const nonExistantUserRoute = "/api/users/JKL101112";
    const headers = {
      authorization: 'Bearer ' + process.env.MOCHA_AUTH,
      'content-type': 'application/json'
    };

  // ---------------------------------
  // ---=== Successful Requests ===---
    it('Returns a HTTP Status of 200', function(done) {
      chai.request(server).delete(route).set(headers).end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });//
    it('Returns JSON', function(done) {
      chai.request(server).delete(route).set(headers).end(function(err, res) {
        res.should.be.json;
        done();
      });
    });//
    it('Returns a JSON Object', function(done) {
      chai.request(server).delete(route).set(headers).end(function(err, res) {
        res.body.should.be.a('object');
        done();
      });
    });//
    it('Returns a JSON Object containing message', function(done) {
      chai.request(server).delete(route).set(headers).end(function(err, res) {
        res.body.should.have.property('message');
        done();
      });
    });//
    it('Returns a JSON Object containing message: API Deleted User with user_id of ABC123', function(done) {
      chai.request(server).delete(route).set(headers).end(function(err, res) {
        res.body.message.should.equal('API Deleted User with user_id of ABC123.');
        done();
      });
    });//

  // -----------------------------------
  // ---=== Client Error Requests ===---
    it.skip('Client Error: If user does not exist, Return HTTP Status of 400', function(done) {
      chai.request(server).delete(nonExistantUserRoute).set(headers).end(function(err, res) {
        res.body.message.should.equal('API Deleted User with user_id of ABC123.');
        done();
      });
    });//
    it.skip('Client Error: If user does not exist, Return message: API Deleted User with user_id of JKL101112 has failed.', function(done) {
      chai.request(server).delete(nonExistantUserRoute).set(headers).end(function(err, res) {
        res.body.message.should.equal('API Deleted User with user_id of JKL101112 has failed.');
        done();
      });
    });//

  }); // End of Route Describe block.
// ===============================================================================
// =~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~=
// ===============================================================================

}); // End of usersController.spec.js Describe block.
