const configDB = require("./knexfile.js");
const knex = require("knex")(configDB);
// ({
//   client: "mysql",
//   connection: {
//     host: "127.0.0.1",
//     user: "group7",
//     password: "123456",
//     database: "it5005",
//     acquireConnectionTimeout: 10000,
//     timezone: "+00:00",
//   },
// });

/* Thêm báo cáo
Input: report la một object chứa các trường roomId, userId, category, description */
exports.addReport = function (report) {
  const newRecord = {
    "roomId": report.roomId,
    "userId": report.userId,
    "category": report.category,
    "date": new Date(),
    "description": report.description,
    "isHandled": false,
    "answer": "",
  };
  return knex("report")
    .insert(newRecord)
    .then(() =>
      console.log(
        `row ${report.roomId} by ${report.userId} inserted to report table`
      )
    )
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      console.log(err);
      return { "ok": 0, "error": err };
    });
  // .finally(() => {
  //   knex.destroy();
  // });
};

//Đếm số lượng báo cáo
exports.getNumberReport = function () {
  return knex("report").count("reportId")
  .then((res)=>{
    return { 
      "ok": 1 ,
      "numberreport": res
  };
  }
  ).catch((err)=>{
    return { 
        "ok": 0,
        "error": err 
            };
  });

};

//Đếm số lượng báo cáo chưa xử lý
exports.getNumberReport_ = function () {
  return knex("report").count("reportId").where("isHandled",0)
  .then((res)=>{
    return { 
      "ok": 1 ,
      "numberreport_": res
  };
  }
  ).catch((err)=>{
    return { 
        "ok": 0,
        "error": err 
            };
  });

};
//Đếm số lượng bài đăng vi phạm
exports.getNumberPostReported = function () {
  return knex("report").countDistinct("roomId")
  .then((res)=>{
    return { 
      "ok": 1 ,
      "numberpostreported": res
  };
  }
  ).catch((err)=>{
    return { 
        "ok": 0,
        "error": err 
            };
  });

};

//Thống kê số lượng báo cáo theo tháng

exports.getStatisticReport = function () {
  return knex("report").select('date').count("reportId",{as:"numberreport"}).groupByRaw("month(date)").orderByRaw("month(date)")
  .then((res)=>{
     res.map(a => {
         a.date = a.date.getMonth() + 1
     }
      )

      
    return { 
      "ok": 1 ,
      "statisticreport": res
      
  };
  }
  ).catch((err)=>{
    return { 
        "ok": 0,
        "error": err 
            };
  });

};
// Xoá báo cáo
// Input: roomId, userId
exports.deleteReport = function (reportId, userId, roomId) {
  return knex("report")
    .where("reportId", reportId)
    .where("userId", userId)
    .where("roomId", roomId)
    .del()
    .then(() => console.log("user " + userId + " delete report room " + roomId))
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      console.log(err);
      return { "ok": 0, "error": err };
    })
    .finally(() => {
      knex.destroy();
    });
};

// Xem bao cao
// input: reportId
exports.getReport = function (reportId) {
  return knex("report")
    .select("*")
    .where("reportId", reportId)
    .then((rows) => {
      for (let row of rows) {
        console.log(row);
      }
    })
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      console.log(err);
      return { "ok": 0, "error": err };
    })
    .finally(() => {
      knex.destroy();
    });
};

// Sửa báo cáo
// input reportId, contentChanged
exports.editReport = function (reportId, contentChanged) {
  return knex("report")
    .where("reportId", reportId)
    .update(contentChanged)
    .then((res) => {
      return { "ok": 1 };
    })
    .catch((err) => {
      return { "ok": 0, "error": err };
    })
    .finally(() => {
      knex.destroy();
    });
};

function testInsert() {
  let report = {
    "roomId": 1,
    "userId": 4,
    "category": "blabla",
    "description": "blalalalala",
  };
  let res = exports.addReport(report);
  res.then((res) => {
    console.log("Insert ok: " + res.ok);
  });
}

function testDelete() {
  let res = exports.deleteReport(4, 1, 3);
  res.then((res) => {
    console.log("Delete ok: " + res.ok);
  });
}

function testGet() {
  let res = exports.getReport(1);
  res.then((res) => {
    console.log("Get ok: " + res.ok);
  });
}

function testEdit() {
  let a = exports.getReport(3);
  let content = { "roomId": 10, "category": "hahaha" };
  let res = exports.editReport(3, content);
  res.then((res) => {
    console.log("Edit ok: " + res.ok);
  });
  let b = exports.getReport(3);
}

//testInsert();
//testDelete();
// testGet();
//testEdit();

function test() {
  return knex("report")
    .select("*")
    .then((rows) => {
      for (let row of rows) {
        console.log(row);
      }
    });
}

//test();
