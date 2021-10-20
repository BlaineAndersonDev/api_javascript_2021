
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstName: "Blaine", gender: 'male', favoriteColor: "Yellow"},
        {firstName: "Kelli", gender: 'female', favoriteColor: "Green"},
        {firstName: "Piper", gender: 'Queer'}
      ]);
    });
};

