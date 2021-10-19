// https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.string('user_id').primary();
    table.string('gender').notNull();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
