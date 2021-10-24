exports.seed = function(knex) {
  return knex('articles').then(function () {
    return knex('articles').insert([
      {
        user_id: 1, 
        title: "Blood Moon Woods", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget dictum nibh. Sed at dictum lorem. Praesent a interdum risus. Nullam maximus risus in felis accumsan, dignissim egestas dui consequat. Mauris elit urna, euismod non velit non, tincidunt tempus urna. Fusce pretium sed purus aliquam egestas. Morbi vitae mauris ac velit molestie efficitur. Curabitur sit amet sem id metus semper consectetur et eu diam. Suspendisse ex erat, maximus et luctus nec, ornare ut orci. Sed sit amet arcu purus. Vivamus porttitor nunc quis nisl tempus eleifend. Nulla lacinia commodo ex, at consectetur nisl tincidunt quis. Pellentesque posuere aliquam lectus a sagittis. Cras bibendum pretium tellus, nec mattis metus elementum nec. Quisque dignissim odio ac purus imperdiet, quis dapibus turpis ornare.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },      
      {
        user_id: 2, 
        title: "Altar of the Gods", 
        text: "Phasellus eleifend metus nisi, et sagittis nibh varius et. Mauris aliquam bibendum purus, eu cursus tortor facilisis a. Nullam mi enim, vulputate at sem id, maximus euismod velit. Sed et ante rutrum, finibus dui facilisis, maximus lectus. Vivamus venenatis semper elit, eu elementum risus suscipit a. Cras viverra volutpat nunc, ac rutrum lorem auctor vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi ut dignissim dolor. Mauris pretium facilisis eleifend. Sed vestibulum urna at pulvinar efficitur. Nulla dictum felis ac eros faucibus efficitur. Donec vel imperdiet turpis. Donec sodales orci justo, eget finibus erat tincidunt et.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },      
      {
        user_id: 3, 
        title: "Haunted Orphanage", 
        text: "Nullam euismod porttitor lorem lacinia tincidunt. Donec purus tortor, dignissim non mauris vitae, fringilla imperdiet justo. Pellentesque sit amet pellentesque velit. Etiam lobortis sem consequat, luctus enim sit amet, vehicula eros. Vestibulum eleifend dignissim felis et rutrum. Donec venenatis commodo erat, a faucibus justo vestibulum quis. Fusce ac justo a ante dictum eleifend lacinia in sem. Duis lacinia posuere condimentum. Nunc vestibulum posuere ex, at maximus orci vulputate ac.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      },      
      {
        user_id: 1, 
        title: "Goblin Fight Pits", 
        text: "Sed eleifend justo in egestas euismod. Nulla interdum mi leo, eu mattis nunc tincidunt a. Sed viverra dictum justo, ut rhoncus urna bibendum ac. Integer pharetra est ut enim lacinia tempor. Vestibulum mattis facilisis tortor quis viverra. Donec dapibus vehicula condimentum. Sed facilisis varius leo, sed maximus eros pulvinar nec. Donec sit amet eros luctus, convallis tortor vel, pellentesque erat. Integer sit amet consectetur quam, eu molestie lectus. Nullam ac iaculis dui, sed ornare ligula. Nullam nibh leo, pulvinar eu tortor eget, dignissim sollicitudin risus. Vestibulum velit eros, fermentum in tincidunt sit amet, feugiat at metus. Donec feugiat feugiat libero non consectetur. Nulla a dui tempus, egestas augue vitae, hendrerit ligula.",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      }
    ]);
  });
};

