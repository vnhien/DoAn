exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex("room")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("room").insert([
          {
            "roomId": 1,
            "houseId": 1,
            "userId": 1,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 1500,
            "size": 10,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro1-1618037718826-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro1-1618037718826-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro1-1618037718826-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro1-1618037718826-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro1-1618037718826-house.jpg",
          },
          {
            "roomId": 2,
            "houseId": 1,
            "userId": 1,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 2500,
            "size": 20,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro1-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro1-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro1-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro1-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro1-1618037718827-house.jpg",
          },
          {
            "roomId": 3,
            "houseId": 2,
            "userId": 2,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 1500,
            "size": 25,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro2-1618037718826-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro2-1618037718826-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro2-1618037718826-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro2-1618037718826-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro2-1618037718826-house.jpg",
          },
          {
            "roomId": 4,
            "houseId": 2,
            "userId": 2,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 1600,
            "size": 20,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro2-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro2-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro2-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro2-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro2-1618037718827-house.jpg",
          },
          {
            "roomId": 5,
            "houseId": 3,
            "userId": 3,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 1500,
            "size": 10,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro3-1618037718826-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro3-1618037718826-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro3-1618037718826-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro3-1618037718826-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro3-1618037718826-house.jpg",
          },
          {
            "roomId": 6,
            "houseId": 3,
            "userId": 3,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 2500,
            "size": 29,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro3-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro3-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro3-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro3-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro3-1618037718827-house.jpg",
          },
          {
            "roomId": 7,
            "houseId": 5,
            "userId": 5,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 5000,
            "size": 50,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro5-1618037718826-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro5-1618037718826-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro5-1618037718826-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro5-1618037718826-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro5-1618037718826-house.jpg",
          },
          {
            "roomId": 8,
            "houseId": 5,
            "userId": 5,
            "name": "Phòng trọ giá tốt",
            "date": "2021-03-30",
            "price": 6500,
            "size": 40,
            "category": "Phong tro",
            "description": "Phòng trọ giá rẻ, siêu đẹp ,siêu sạch",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro5-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro5-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro5-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro5-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro5-1618037718827-house.jpg",
          },
          {
            "roomId": 9,
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-03-30",
            "price": 15000,
            "size": 100,
            "category": "Chung cu mini",
            "description":
              "Chung cu mini cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718826-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718826-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718826-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718826-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718826-house.jpg",
          },
          {
            "roomId": 10,
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-03-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-03-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-03-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-03-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
  
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
  
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
  
          {
            "houseId": 4,
            "userId": 4,
            "name": "Chung cu mini cap cap",
            "date": "2021-04-30",
            "price": 7000,
            "size": 30,
            "category": "Chung cu mini",
            "description":
              "Chung cu cao cap, ban cong rong rai, thoang mat, ban cong rong rai, dan tri cao.",
            "status": "0",
            "image1": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image2": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image3": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image4": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
            "image5": "uploads/images/IMAGE-ChuTro4-1618037718827-house.jpg",
          },
        ]);
      });
  };
  