// =====================================
// Initialize ==========================
// =====================================
const express = require('express') // Allow HTTP Calls.
const app = express() // Start the 'app'.
const port = process.env.PORT || 3000; // Defined port for the app (I.E. localhost:3000/)

// =================================
// Routing =========================
// =================================
app.use('/users', require('./controllers/usersController.js')); // Route to the 'usersController' for ../users/.

app.get('/articles', (async (req, res, next) => {
  const users = await db.select('*').table('articles')
  console.log(users)
  res.send(users)
}));

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