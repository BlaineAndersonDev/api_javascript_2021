var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

router.get('/', (async (req, res, next) => {
  const comments = await db.select('*').table('comments')
  console.log(comments)
  res.send(comments)
}));

module.exports = router