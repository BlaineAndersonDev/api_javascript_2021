const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const moment = require('moment');
const errorCatcher = require('./_errorCatcher.js');

// -----------------
// Article Routes --
// -----------------

// GET *
router.get('/', (async (req, res, next) => {
  await db.select('*')
    .table('articles')
    .then((results) => {
      if (!errorCatcher.objectExists(results)) {
        res.status(404).send({
          SUCCESS: results, 
          MESSAGE: 'Route returned no Articles.'
        });
      }
      res.status(200).send({
        SUCCESS: results, 
        MESSAGE: 'Route successfully returned * Articles.'
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        FAILURE: err, 
        MESSAGE: 'Route failed.'
      })
    });
}));

// GET
router.get('/:id', (async (req, res, next) => {
  await db.select('*')
    .from('articles')
    .where('id', req.params.id)
    .then((results) => {
      if (!errorCatcher.objectExists(results)) {
        res.status(404).send({
          SUCCESS: results, 
          MESSAGE: 'Route returned no Article.'
        });
      }

      res.status(200).send({
        SUCCESS: results[0], 
        MESSAGE: 'Route successfully returned * Articles.'
      });
    })
    .catch((err) => {
      res.status(500).send({
        FAILURE: err, 
        MESSAGE: 'Route failed.'
      })
    });
}));

// POST
router.post('/', (async (req, res, next) => {
  const article = await db('articles')
    .insert({
      user_id: req.body.user_id, 
      title: req.body.title,
      text: req.body.text
    })
    .returning('*')
  res.send({'SUCCESS': article[0]})
}));

// PUT
router.put('/:id', (async (req, res, next) => {
  const article = await db('articles')
    .where('id', '=', req.params.id)
    .update({
      title: req.body.title,
      text: req.body.text,
      updated_at: moment()
    })
    .returning('*')
  res.send({'UPDATED': article[0]})
}));

// DELETE
router.delete('/:id', (async (req, res, next) => {
  await db('articles')
    .where('id', '=', req.params.id)
    .del();
  res.sendStatus(200)
}));

// -----------------
// Export ----------
// -----------------
module.exports = router