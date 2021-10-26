var express = require('express');
var router = express.Router();
const db = require('../db/database.js');
var moment = require('moment');

// -----------------
// Article Routes --
// -----------------

// GET *
router.get('/', (async (req, res, next) => {
  const articles = await db.select('*').table('articles')
  res.send({'SUCCESS': articles})
}));

// GET
router.get('/:id', (async (req, res, next) => {
  const article = await db.select('*').from('articles').where('id', req.params.id)
  res.send({'SUCCESS': article[0]})
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