# Javascript API - Developer Notes:

### Initialize **Development** API.
  * Drop DB: `dropdb api_javascript`
  * Create DB: `createdb api_javascript`
  * Start API: `yarn dev`

### Initialize **Heroku** API.
  * `heroku create <AppName>`
  * `git push heroku master`
  * `heroku config:set PGSSLMODE=no-verify`
    * This specifically bypasses the SSL requirement for heroku when using the free tier.
  * `touch Procfile`
    * Open and paste in: `web: npm run heroku`
  * Add a `heroku` script into `package.json`
    * `"heroku": "NODE_ENV=production npx knex migrate:down && npx knex migrate:latest && npx knex seed:run && node server.js",`
  * *NOTE*: Heroku must have a PG add-on and must have the connection string in `Config Vars` with the specific variable name `DATABASE_URL`. This should be done automatically.

### Using PostgreSQL & Knex in Terminal:
  * Drop PostgreSQL database:
    * `dropdb <db_name>`
  * Create PostgreSQL database:
    * `createdb <db_name>`
  * Create a migration / table:
    * `knex migrate:make <table_name>`
  * Run all migrations (Optional '--env <env>'):
    * `knex migrate:latest`
    * `knex migrate:latest --env development`
  * Rollback to the last set of migrations (Optional '--env <env>'):
    * `knex migrate:rollback`
    * `knex migrate:rollback --env development`
  * Create a named seedfile:
    * `knex seed:make <seed_name>`
  * Run all seed files (Optional '--env <env>'):
    * `knex seed:run`
    * `knex seed:run --env development`
  * ACTION
    * `knex ____:_____ <______>`