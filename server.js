// =================================
// Import & Require ================
// =================================
const express = require('express') // Allow HTTP Calls.
const pg = require('pg');

// =====================================
// Initialize ==========================
// =====================================
const env = process.env.NODE_ENV || 'development'; // Defaults env to development.
  // In production force PG to use SSL connections, allowing data transfer over hosts.
  env === 'production' ? pg.defaults.ssl = true : pg.defaults.ssl = false ; 
const configuration = require('./knexfile')[env]; // Require environment's settings from knexfile.
const db = require('knex')(configuration); // Connect to DB via knex using env's settings.

const app = express() // Start the 'app'.
const port = 3000 // Defined port for the app (I.E. localhost:3000/)

// =================================
// Routing =========================
// =================================
app.get('/users', (async (req, res, next) => {
  const users = await db.select('*').table('users')
  console.log(users)
  res.send(users)
}));

// =====================================
// Final Steps =========================
// =====================================
// Display to show the Node Enviornment and inform the developer what port the API is listening on.
console.log('===============================')
console.log('API successfully loaded.')
console.log(`NODE_ENV: ${env || "Undefined"}`)
console.log(`Listening on port: ${port}`)
console.log('===============================')

// Sets the API to listen for calls.
app.listen(port);