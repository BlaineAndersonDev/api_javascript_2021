exports.seed = function(knex) {
  return knex('articles').then(function () {
    return knex('articles').insert([
      {
        user_id: 1, 
        title: "Basil", 
        text: "Basil, also called great basil, is a culinary herb of the family Lamiaceae. Basil is native to tropical regions from central Africa to Southeast Asia. It is a tender plant, and is used in cuisines worldwide. There are many varieties of basil, as well as several related species or hybrids also called basil.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },      
      {
        user_id: 2, 
        title: "Rosemary", 
        text: "Salvia rosmarinus, commonly known as rosemary, is a shrub with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region. Until 2017, it was known by the scientific name Rosmarinus officinalis, now a synonym.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },      
      {
        user_id: 3, 
        title: "Thyme", 
        text: "Thyme is the herb of some members of the genus Thymus of aromatic perennial evergreen herbs in the mint family Lamiaceae. Thymes are relatives of the oregano genus Origanum. They have culinary, medicinal, and ornamental uses, and the species most commonly cultivated and used for culinary purposes is Thymus vulgaris.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },      
      {
        user_id: 1, 
        title: "Dill", 
        text: "Dill is an annual herb in the celery family Apiaceae. It is the only species in the genus Anethum. Dill is grown widely in Eurasia, where its leaves and seeds are used as an herb or spice for flavouring food.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      }
    ]);
  });
};

