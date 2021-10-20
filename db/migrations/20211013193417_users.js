// https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('firstName');
    table.string('gender');
    table.string('favoriteColor').defaultTo('None');
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
