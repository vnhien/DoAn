const bcrypt = require("bcrypt");

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("account")
    .del()
    .then(function () {
      // Inserts seed entries
      let salt = bcrypt.genSaltSync(10);
      return knex("account").insert([
        {
          "userId": 1,
          "username": "ChuTro1",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Tam Tùng",
          "date": "2021-04-30",
          "birthday": "1989-11-11", // YYYY-MM-DD
          "address": "120 Hoàng Đạo Thành, Hoàng Mai, Hà Nội",
          "phone": "0942205171",
          "email": "tamtung@gmail.com",
          "job": "Cảnh sát",
          "introduction": "Xin chào, hãy đến và thuê nhà trọ của tôi!!!",
          "acctype": "Chủ nhà trọ",
        },
        {
          "userId": 2,
          "username": "ChuTro2",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Chu Minh Trị",
          "date": "2021-04-30",
          "birthday": "1990-11-11", // YYYY-MM-DD
          "address": "120 Kim Giang, Hoàng Mai, Hà Nội",
          "phone": "0942205172",
          "email": "chuminhtri@gmail.com",
          "job": "Giáo viên",
          "introduction":
            "Xin chào, Tôi có rất nhiều nhà trọ đẹp. Các bạn hãy đến xem và thuê nhé!!!",
          "acctype": "Chủ nhà trọ",
        },
        {
          "userId": 3,
          "username": "ChuTro3",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Nguyễn Minh Giảng",
          "date": "2021-04-30",
          "birthday": "1991-11-11", // YYYY-MM-DD
          "address": "120 Định Công, Hoàng Mai, Hà Nội",
          "phone": "0942205173",
          "email": "giangdeptrai@gmail.com",
          "job": "Giám đốc",
          "introduction":
            "Xin chào, Tôi có rất nhiều nhà trọ đẹp. Các bạn hãy đến xem và thuê nhé!!!",
          "acctype": "Chủ nhà trọ",
        },
        {
          "userId": 4,
          "username": "ChuTro4",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Lê Thị Hạnh",
          "date": "2021-03-30",
          "birthday": "1992-11-11", // YYYY-MM-DD
          "address": "120 Vũ Tông Phan, Hoàng Mai, Hà Nội",
          "phone": "0942205174",
          "email": "hanhhihung@gmail.com",
          "job": "Văn phòng",
          "introduction":
            "Xin chào, Tôi có rất nhiều nhà trọ đẹp. Các bạn hãy đến xem và thuê nhé!!!",
          "acctype": "Chủ nhà trọ",
        },
        {
          "userId": 5,
          "username": "ChuTro5",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Trần Thị Thu",
          "date": "2021-03-30",
          "birthday": "1993-11-11", // YYYY-MM-DD
          "address": "120 Nguyễn Xiển, Hoàng Mai, Hà Nội",
          "phone": "0942205175",
          "email": "thutt@gmail.com",
          "job": "Bác sĩ",
          "introduction":
            "Xin chào, Tôi có rất nhiều nhà trọ đẹp. Các bạn hãy đến xem và thuê nhé!!!",
          "acctype": "Chủ nhà trọ",
        },
        {
          "userId": 6,
          "username": "NguoiThue1",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Hoàng Văn",
          "date": "2021-05-30",
          "birthday": "1994-11-11", // YYYY-MM-DD
          "address": "55 Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội",
          "phone": "0942205176",
          "email": "vanhoang@gmail.com",
          "job": "Sinh viên",
          "introduction": "Xin chào, tôi cần tìm nhà trọ rẻ và đẹp",
          "acctype": "Người thuê trọ",
        },
        {
          "userId": 7,
          "username": "NguoiThue2",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Lý Trung Kiên",
          "date": "2021-05-30",
          "birthday": "1995-11-11", // YYYY-MM-DD
          "address": "55 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội",
          "phone": "0942205177",
          "email": "kienlt@gmail.com",
          "job": "Sinh viên",
          "introduction": "Xin chào, tôi cần tìm nhà trọ rẻ và đẹp",
          "acctype": "Người thuê trọ",
        },
        {
          "userId": 8,
          "username": "NguoiThue3",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Mai An Tiêm",
          "date": "2021-05-30",
          "birthday": "1996-11-11", // YYYY-MM-DD
          "address": "55 Bạch Mai, Hai Bà Trưng, Hà Nội",
          "phone": "0942205178",
          "email": "duahau@gmail.com",
          "job": "Sinh viên",
          "introduction": "Xin chào, tôi cần tìm nhà trọ rẻ và đẹp",
          "acctype": "Người thuê trọ",
        },
        {
          "userId": 9,
          "username": "NguoiThue4",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Trịnh Thị Hồng",
          "date": "2021-05-30",
          "birthday": "1997-11-11", // YYYY-MM-DD
          "address": "55 Trương Định, Hai Bà Trưng, Hà Nội",
          "phone": "0942205179",
          "email": "hongtt@gmail.com",
          "job": "Sinh viên",
          "introduction": "Xin chào, tôi cần tìm nhà trọ rẻ và đẹp",
          "acctype": "Người thuê trọ",
        },
        {
          "userId": 10,
          "username": "NguoiThue5",
          "password": bcrypt.hashSync("12345", salt),
          "fullname": "Nguyễn Thị Cẩm Tú",
          "date": "2021-05-30",
          "birthday": "1998-11-11", // YYYY-MM-DD
          "address": "55 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội",
          "phone": "0942205180",
          "email": "tucau@gmail.com",
          "job": "Sinh viên",
          "introduction": "Xin chào, tôi cần tìm nhà trọ rẻ và đẹp",
          "acctype": "Người thuê trọ",
        },
        {
          "userId": 11,
          "username": "QuanTriVien",
          "password": bcrypt.hashSync("123456", salt),
          "fullname": "Nguyễn Quang Hưng",
          "date": "2021-03-30",
          "birthday": "1999-11-11", // YYYY-MM-DD
          "address": "01 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
          "phone": "0942205181",
          "email": "hungnq@gmail.com",
          "job": "Giám đốc",
          "introduction":
            "Xin chào, tôi là quản trị viên của trang web nhatro.com",
          "acctype": "Quản trị viên",
        },
      ]);
    });
};
