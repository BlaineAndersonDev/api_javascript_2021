exports.up = function(knex) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').notNull();
    table.integer('article_id').references('id').inTable('articles').notNull();
    table.text('text');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
