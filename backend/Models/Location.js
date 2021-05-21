// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',
//         database: 'it5005',
//         acquireConnectionTimeout: 10000,
//         timezone: "+00:00"
//     }
// });
const configDB = require("./knexfile.js");
const knex = require("knex")(configDB);

exports.getListProvince = function () {
  return knex("tinhthanhpho")
    .select("name")
    .then((res) => {
      (data = []),
        res.forEach((element) => {
          data.push({ value: element.name, label: element.name });
        });
      return data;
    });
};

exports.getListDistrictOfProvince = function (provinceName) {
  return knex("tinhthanhpho")
    .join("quanhuyen", "tinhthanhpho.matp", "quanhuyen.matp")
    .where("tinhthanhpho.name", provinceName)
    .select("quanhuyen.name")
    .then((res) => {
      (data = []),
        res.forEach((element) => {
          data.push({ value: element.name, label: element.name });
        });
      return data;
    });
};

exports.getListWardOfDistrict = function (districtName) {
  return knex("quanhuyen")
    .join("xaphuongthitran", "quanhuyen.maqh", "xaphuongthitran.maqh")
    .where("quanhuyen.name", districtName)
    .select("xaphuongthitran.name")
    .then((res) => {
      (data = []),
        res.forEach((element) => {
          data.push({ value: element.name, label: element.name });
        });
      return data;
    });
};

//test Location model

// testgetListProvince();
// testgetListDistrictOfProvince();
// testgetListWardOfDistrict();
async function testgetListProvince() {
  try {
    res = await exports.getListProvince();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
async function testgetListDistrictOfProvince() {
  try {
    res = await exports.getListDistrictOfProvince("Thành phố Hà Nội");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function testgetListWardOfDistrict() {
  try {
    res = await exports.getListWardOfDistrict("Quận Hoàng Mai");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
