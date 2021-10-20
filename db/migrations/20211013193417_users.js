exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('name');
    table.string('gender');
    table.string('favorite_color').defaultTo('None');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
