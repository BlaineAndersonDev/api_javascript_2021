# Javascript API - Developer Notes:

##### Initialize **Development** API.
  * Drop DB: `dropdb api_javascript`
  * Create DB: `createdb api_javascript`
  * Start API: `yarn dev`

##### Initialize **Heroku** API.
  * `heroku create <AppName>`
  * `git push heroku master`
  * `heroku config:set PGSSLMODE=no-verify`
    * This specifically bypasses the SSL requirement for heroku when using the free tier.
  * `touch Procfile`
    * Open and paste in: `web: npm run heroku`
  * Add a `heroku` script into `package.json`
    * `"heroku": "NODE_ENV=production npx knex migrate:down && npx knex migrate:latest && npx knex seed:run && node server.js",`
  * *NOTE*: Heroku must have a PG add-on and must have the connection string in `Config Vars` with the specific variable name `DATABASE_URL`. This should be done automatically.
