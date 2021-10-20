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
    // connection: {
    //   database: process.env.PROD_DB_NAME,
    //   user:     process.env.PROD_DB_USER,
    //   password: process.env.PROD_DB_PASS
    // },
    connection: process.env.DATABASE_URL,
    ssl: true,
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
