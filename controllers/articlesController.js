var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

router.get('/', (async (req, res, next) => {
  const articles = await db.select('*').table('articles')
  console.log(articles)
  res.send(articles)
}));


module.exports = router