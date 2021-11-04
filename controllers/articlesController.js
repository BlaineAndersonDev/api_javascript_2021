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
      res.status(200).send({
        SUCCESS: results, 
        MESSAGE: 'Route successfully returned * Articles.'
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        ERROR: err, 
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
        res.status(400).send({
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
        ERROR: err, 
        MESSAGE: 'Route failed.'
      })
    });
}));

// POST
router.post('/', (async (req, res, next) => {
   if (!errorCatcher.requiredInfo(req.body.user_id)) { return res.status(400).json({ MESSAGE: "Body must contain user_id." }); };
   if (!errorCatcher.requiredInfo(req.body.title)) { return res.status(400).json({ MESSAGE: "Body must contain title." }); };
   if (!errorCatcher.requiredInfo(req.body.text)) { return res.status(400).json({ MESSAGE: "Body must contain text." }); };

  await db('articles')
    .insert({
      user_id: req.body.user_id, 
      title: req.body.title,
      text: req.body.text
    })
    .returning('*')
    .then((results) => {
      res.status(200).send({
        SUCCESS: results[0], 
        MESSAGE: 'Route successfully created Article.'
      });
    })
    .catch((err) => {
      res.status(500).send({
        ERROR: err, 
        MESSAGE: 'Route failed.'
      })
    });
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
  if (!errorCatcher.requiredInfo(req.params.id)) { return res.status(400).json({ MESSAGE: "Params must contain id." }); };



  await db('articles')
    .where('id', '=', req.params.id)
    .del()
    .returning('*')
    .then((results) => {
      res.status(200).send({
        SUCCESS: results, 
        MESSAGE: 'Route successfully deleted Article.'
      });
    })
    .catch((err) => {
      res.status(500).send({
        ERROR: err, 
        MESSAGE: 'Route failed.'
      })
    });
}));

// -----------------
// Export ----------
// -----------------
module.exports = router