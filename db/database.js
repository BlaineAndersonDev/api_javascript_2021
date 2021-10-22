const env = process.env.NODE_ENV || 'development'; // Defaults env to development.
const configuration = require('../knexfile')[env]; // Require environment's settings from knexfile.
const db = require('knex')(configuration); // Connect to DB via knex using env's settings.

module.exports = db; // Export the db to used in Controllers.
