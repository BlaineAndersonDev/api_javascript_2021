
exports.seed = function(knex) {
  return knex('users').then(function () {
    return knex('users').insert([
        {name: "Blaine", gender: 'male', favorite_color: "Yellow", created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: "Kelli", gender: 'female', favorite_color: "Green", created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: "Piper", gender: 'Queer', created_at: knex.fn.now(), updated_at: knex.fn.now()}
      ]);
    });
};

