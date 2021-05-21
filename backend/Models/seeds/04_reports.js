exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("report")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("report").insert([
        {
          "reportId": 1,
          "roomId": 1,
          "userId": 7,
          "category": "Sai thong tin",
          "date": "2021-04-30",
          "description": "Dang tin sai su that, lua dao",
          "isHandled": false,
          "answer": "",
        },
        {
          "reportId": 2,
          "roomId": 2,
          "userId": 7,
          "category": "Sai thong tin",
          "date": "2021-04-30",
          "description": "Dang tin sai su that, lua dao",
          "isHandled": false,
          "answer": "",
        },
        {
          "reportId": 3,
          "roomId": 2,
          "userId": 7,
          "category": "Sai thong tin",
          "date": "2021-04-30",
          "description": "Dang tin sai su that, lua dao",
          "isHandled": false,
          "answer": "",
        },
        {
          "reportId": 4,
          "roomId": 2,
          "userId": 7,
          "category": "Sai thong tin",
          "date": "2021-04-30",
          "description": "Dang tin sai su that, lua dao",
          "isHandled": false,
          "answer": "",
        },
        {
          "reportId": 5,
          "roomId": 2,
          "userId": 7,
          "category": "Sai thong tin",
          "date": "2021-05-30",
          "description": "Dang tin sai su that, lua dao",
          "isHandled": false,
          "answer": "",
        },
        {
          "reportId": 6,
          "roomId": 3,
          "userId": 7,
          "category": "Sai thong tin",
          "date": "2021-03-30",
          "description": "Dang tin sai su that, lua dao",
          "isHandled": false,
          "answer": "",
        },
      ]);
    });
};
