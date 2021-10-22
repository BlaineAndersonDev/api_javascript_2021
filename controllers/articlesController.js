var express = require('express');
var router = express.Router();
const db = require('../db/database.js');
var moment = require('moment');


// -------------------------------------
// Article Routes ----------------------
// -------------------------------------

// GET `api/1.0/articles`
router.get('/', (async (req, res, next) => {
  const articles = await db.select('*').table('articles')
  console.log(articles)
  res.send(articles)
}));

// GET `api/1.0/articles/:id`
router.get('/:id', (async (req, res, next) => {
  const article = await db.select('*').from('articles').where('id', req.params.id)
  console.log(article)
  res.send(article)
}));

// POST `api/1.0/articles`
// curl -d '{"userId":"1","title":"Curl Title","text":"Curl Paragraph"}' -H "Content-Type: application/json" localhost:3000/api/1.0/articles
router.post('/', (async (req, res, next) => {
  const article = await db('articles').insert({
    user_id: req.body.userId, 
    title: req.body.title,
    text: req.body.text
  })
  res.send(article)
}));



// -------------------------------------
// Export ------------------------------
// -------------------------------------
module.exports = router