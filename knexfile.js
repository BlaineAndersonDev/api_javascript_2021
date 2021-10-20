require('dotenv').config()

module.exports = {

  tests: {
    client: 'pg',
    connection: 'api_javascript',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'api_javascript',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds',
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    // debug: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds',
    }
  }

};
