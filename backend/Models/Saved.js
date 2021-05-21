// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: '127.0.0.1',
//     user: 'group7',
//     password: '123456',
//     database: 'it5005',
//     acquireConnectionTimeout: 10000,
//     timezone: "+00:00"
//   },
// });
const configDB = require("./knexfile.js");
const knex = require("knex")(configDB);

// Luu phong tro
exports.saveRoom = function (userId, roomID) {
  let user = Number(userId);
  const newRecord = { roomId: roomID, userId: user };
  knex("saved")
    .insert(newRecord)
    .then(() => console.log(`row ${roomID} ${user} inserted to saved table`))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
};

// bo luu phong tro
exports.unsaveRoom = function (userId, roomId) {
  knex("saved")
    .where("userId", this.userId)
    .where("roomId", roomId)
    .del()
    .then(() =>
      console.log(`${roomId}  deleted from saved table of ${this.userId}`)
    )
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
};

// Lay danh sach phong tro da luu
exports.getListSaved = function (userId) {
  knex({ a: "saved", b: "room" })
    .select("b.roomId", "b.name", "b.userId")
    .where("a.userId", userId)
    .where("b.roomId", knex.raw("??", ["a.roomId"]))
    .then((rows) => {
      console.log(userId + " saved:");
      for (let row of rows) {
        console.log(row);
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
};

exports.saveRoom(2, 5);
// exports.saveRoom(4);
// exports.unsaveRoom(3);
// exports.getListSaved();
