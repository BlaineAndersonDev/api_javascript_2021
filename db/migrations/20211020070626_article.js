exports.up = function(knex) {
  return knex.schema.createTable('articles', function(table) {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').notNull();
    table.string('title');
    table.text('text');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
