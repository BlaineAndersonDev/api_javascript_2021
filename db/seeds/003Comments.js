
exports.seed = function(knex) {
  return knex('comments').then(function () {
    return knex('comments').insert([
        {user_id: 1, article_id: 1, text: "COMMENT 1", created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {user_id: 1, article_id: 2, text: "COMMENT 2", created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {user_id: 1, article_id: 3, text: "COMMENT 3", created_at: knex.fn.now(), updated_at: knex.fn.now()}
    ]);
  });
};

