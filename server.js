// =================================
// Import & Require ================
// =================================
const express = require('express') // Allow HTTP Calls.
const app = express() // Start the 'app'.
const port = 3000 // Defined port for the app (I.E. localhost:3000/)

// =====================================
// Database Setup ======================
// =====================================
// Activates our database detection and creation in db.js.
// const database = require('./db/databaseSetup.js');
// config = { connectionString: "postgresql://localhost/api_javascript" };

const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const configuration = require('./knexfile')[environment];    // require environment's settings from knexfile
const db = require('knex')(configuration);              // connect to DB via knex using env's settings

// =================================
// Set options =====================
// =================================
app.use(express.json({
  type: 'application/json',
}));

// =================================
// Routing =========================
// =================================

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.get('/users', (async (req, res, next) => {
  const users = await db.select('*').table('users')
  console.log(users)
  res.send(users)
}));

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

// let users = []
// users.push({id: 1, name: "Blaine", age: 32})
// users.push({id: 2, name: "Kelli", age: 31})
// console.log(users)

// // curl http://localhost:3000
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// // curl http://localhost:3000/users
// app.get('/users', function (req, res) {
//   res.send(users).to_json
// })

// // curl http://localhost:3000/users/###
// app.get('/users/:id', function (req, res) {
//   console.log("PARAMS: " + req.params.id)
//   for (user in users) {
//     console.log(user)
//     if (user.id = req.params.id) {
//       console.log('This is the correct User: ' + user.name)
//       res.send(user).to_json
//     }
//   }
// })

// // curl -XPOST -d '{"name": "Chris", "age": 34}' -H 'content-type: application/json' localhost:3000/user
// app.put('/user', function (req, res) {
//   console.log(req.body.name)
//   console.log(req.body.age)
//   users.push({name: req.body.name, age: req.body.age})
//   res.send('Got a PUT request at /user')
// })

// // curl -XPOST -d '{"name": "Chris", "age": 34}' -H 'content-type: application/json' localhost:3000/user
// app.post('/user', function (req, res) {
//   console.log(req.body.name)
//   console.log(req.body.age)
//   users.push({name: req.body.name, age: req.body.age})
//   res.send('Got a PUT request at /user')
// })

// =====================================
// Final Steps =========================
// =====================================
// Display to show the Node Enviornment and inform the developer what port the API is listening on.
console.log('===============================')
console.log('API successfully loaded.')
console.log(`NODE_ENV: ${process.env.NODE_ENV || "Undefined"}`)
console.log(`Listening on port: ${port}`)
console.log('===============================')

// Sets the API to listen for calls.
app.listen(port);