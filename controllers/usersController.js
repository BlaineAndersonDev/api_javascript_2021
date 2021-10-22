var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/live', (async (req, res, next) => {
  await res.send("App is confirmed live.")
}));

router.get('/', (async (req, res, next) => {
  const users = await db.select('*').table('users')
  console.log(users)
  res.send(users)
}));

router.get('/:userId', (async (req, res, next) => {
  const user = await db.select('*').from('users').where('id', req.params.userId)
  res.send(user)
}));

router.get('/insert', (async (req, res, next) => {
  const users = await db('users').insert({firstName: "Bob", gender: "female"})
  console.log(users)
  res.send(users)
}));

module.exports = router