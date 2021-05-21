exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("saved")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("saved").insert([
        { "userId": 6, "roomId": 1 },
        { "userId": 6, "roomId": 2 },
        { "userId": 6, "roomId": 3 },
        { "userId": 7, "roomId": 4 },
        { "userId": 7, "roomId": 5 },
        { "userId": 7, "roomId": 3 },
        { "userId": 8, "roomId": 10 },
        { "userId": 8, "roomId": 7 },
        { "userId": 8, "roomId": 6 },
        { "userId": 9, "roomId": 9 },
        { "userId": 9, "roomId": 8 },
        { "userId": 10, "roomId": 10 },
      ]);
    });
};
