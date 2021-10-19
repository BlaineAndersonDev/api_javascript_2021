
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 001, gender: 'male'},
        {user_id: 002, gender: 'female'},
        {user_id: 003, gender: 'binary'}
      ]);
    });
};

