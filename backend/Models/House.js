var knexPaginate = require("../Helpers/knex-paginate");
const configDB = require("./knexfile.js");
const knex = require("knex")(configDB);
// const knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     user : 'root',
//     password : '',
//     database : 'it5005',
//     acquireConnectionTimeout: 10000,
//     timezone : "+00:00"
//   }
// });
const pagesize = 8;

//Lấy danh sách nhà trọ của chủ nhà trọ
exports.getListHouse = function (data) {
  let result = knexPaginate.paginateQueries(
    () => knex("house").where("userId", data.userId).whereNot('status', 'đã xoá'),
    pagesize,
    data.page
  );

  return result;
};

exports.checkExistHouse = function (userId, houseId){
  return knex('house').where('houseId', houseId).where('userId', userId).select('houseId').first()
}

exports.createHouse = function (data) {
  return knex("house")
    .insert({
      "name": data.name,
      "userId": data.userId,
      "province": data.province,
      "district": data.district,
      "ward": data.ward,
      "address": data.address,
      "status": "Đang hoạt động",
      "description": data.description,
      "image": data.image,
    })
    .then((res) => {
      return { "ok": 1 };
    });
};

exports.updateHouse = function (data) {
  let userId = data.userId;
  let houseId = data.houseId;
  delete data.userId;
  delete data.houseId;
  return knex("house")
    .where("houseId", houseId)
    .where("userId", userId)
    .update(data)
    .then((res) => {
      return { "ok": 1 };
    });
};
exports.getDetailHouse = function (data) {
  d = knex("house")
    .where("houseId", data.houseId)
    .where("userId", data.userId)
    .first();
  return d;
};
exports.deleteHouse = function (data) {
  return knex("house")
    .where("houseId", data.houseId)
    .where("userId", data.userId)
    .update({ "status": "Đã xoá" });
};

function testInsert() {
  var res = exports.createHouse({
    "name": "nhatro1",
    "userId": 1,
    "province": "hanoi",
    "district": "HBT",
    "ward": "MK",
    "address": "số 1 Đại Cồ Việt",
    "status": "1",
    "description": "oke",
    "image": "/image",
  });
  res.then((res) => {
    console.log("Insert ok: " + res.ok);
  });
}
function testGetAccount() {
  var res = exports.getHouse({ userId: 1 });
  res.then((res) => {
    console.log(res);
  });
}
//testInsert()
// testGetAccount()
