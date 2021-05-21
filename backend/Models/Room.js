// var knex = require('./knexfile.js');//chèn model database vào đế kết nối db
const configDB = require("./knexfile.js");
const knex = require("knex")(configDB);
const { attachPaginate } = require('knex-paginate');
var knexPaginate = require("../Helpers/knex-paginate");
attachPaginate();

let pagesize = 8
exports.createRoom = function (data) {
  return knex("room")
    .insert({
      "houseId": data.houseId,
      "userId": data.userId,
      "name": data.name,
      "price": data.price,
      "size": data.size,
      "category": data.category,
      "description": data.description,
      "image1": data.image1,
      "image2": data.image2,
      "image3": data.image3,
      "image4": data.image4,
      "image5": data.image5,
      "status": data.status,
    })
    .then((res) => {
      return { "ok": 1 };
    });
};

exports.updateRoom = function (data) {
  let newValue = {
    "name": data.name,
    "price": data.price,
    "size": data.size,
    "category": data.category,
    "description": data.description,
    "status": data.status,
    "image1": data.image1,
    "image2": data.image2,
    "image3": data.image3,
    "image4": data.image4,
    "image5": data.image5,
  }
  if (!newValue.image1){
    delete newValue.image1
  }
  if (!newValue.image2){
    delete newValue.image2
  }
  if (!newValue.image3){
    delete newValue.image3
  }
  if (!newValue.image4){
    delete newValue.image4
  }
  if (!newValue.image5){
    delete newValue.image5
  }
  // console.log(newValue)
  // console.log('roomId: ', data.roomId)
  return knex("room")
    .where("roomId", data.roomId)
    .where('userId', data.userId)
    .where('houseId', data.houseId)
    .update(newValue)
    .then((res) => {
      return { "ok": 1 };
    })
};
exports.deleteRoom = function (roomId) {
  return knex("room")
    .where("roomId", roomId)
    .update({
      status: "deleted",
    })
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      return {
        "ok ": 0,
        "error": err,
      };
    });
};
exports.getRoomList = function (userId) {
  return knex("room")
    .select()
    .where("userId", userId)
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      return {
        "ok": 0,
        "error": err,
      };
    });
};
exports.getAllRoom = function (data) {
   return knex("room").select().paginate({
          perPage: 8,
          currentPage: data.page
        }).then((res)=> {return res})
};
exports.getRoomDetails = function (roomId) {
  return knex("room")
    .select()
    .where("roomId", roomId)
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      return {
        "ok": 0,
        "error": err,
      };
    });
};
exports.getRooms = function (roomdata) {
  let priceup = roomdata.priceup,
      pricedown = roomdata.pricedown,
      sizeup = roomdata.sizeup,
      sizedown = roomdata.sizedown,
      category = roomdata.category,
      ordertype = roomdata.ordertype,
      order = roomdata.order,
      province = roomdata.province,
      district = roomdata.district,
      ward =  roomdata.ward
      page = roomdata.page
  console.log(order)
  return knex.select(['room.*','room.name as roomname','room.status as roomstatus', 'house.name as housename','house.status as housestatus','house.address as address', 'house.province','house.district','house.ward' ])
  .from('room')
  .join('house','room.houseId','=','house.houseId')
  .where('price','>=',pricedown)
  .andWhere('price','<=',priceup)
  .andWhere('size','>=',sizedown)
  .andWhere('size','<=',sizeup)
  .andWhere('category','like',category)
  .andWhere('province','like',province)
  .andWhere('district','like',district)
  .andWhere('ward', 'like', ward)
  .orderBy(ordertype,order)
  .paginate({
    perPage: 8,
    currentPage: page
  }).then((res)=> {return res})
}

exports.getListHouseRoom = function (data) {
  let result = knexPaginate.paginateQueries(
    () => knex("room").where('houseId', data.houseId).where("userId", data.userId).whereNot('status', 'đã xoá'),
    pagesize,
    data.page
  );
  return result;
};

//Đếm số lượng phòng trọ
exports.getNumberRoom = function () {
  return knex("room").count("roomId")
  .then((res)=>{
    return { 
      "ok": 1 ,
      "numberroom": res
  };
  }
  ).catch((err)=>{
    return { 
        "ok": 0,
        "error": err 
            };
  });

};

//Thống kê số lượng phòng trọ

exports.getStatisticRoom = function () {
  return knex("room").select('date').count("roomId",{as:"numberroom"}).groupByRaw("month(date)").orderByRaw("month(date)")
  .then((res)=>{
     res.map(a => {
         a.date = a.date.getMonth() + 1
     }
      )

      
    return { 
      "ok": 1 ,
      "statisticroom": res
      
  };
  })
  .catch((err)=>{
    return { 
        "ok": 0,
        "error": err 
            };
  });

};
exports.deleteHouseRooms = function(data){
  return knex("room")
  .where("houseId", data.houseId)
  .where("userId", data.userId)
  .update({ "status": "Đã xoá" });
}
exports.deleteHouseRoom = function(data){
  return knex("room")
  .where("houseId", data.houseId)
  .where("userId", data.userId)
  .where("roomId", data.roomId)
  .update({ "status": "Đã xoá" });
}
exports.getRoom = function(roomId){
  return knex("room").whereNot('status', 'Đã xoá').where('roomId', roomId).first()
}