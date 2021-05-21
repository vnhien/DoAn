const Room = require('../Models/Room.js')
const AccountController = require('../Controllers/AccountController')
const AuthMiddleWare = require('../Middlewares/Authenication')
const HouseController = require('../Controllers/HouseController')
const multer = require("multer");
const RoomController = require('../Controllers/RoomController')
const ReportController = require('../Controllers/ReportController')
const storage = multer.diskStorage({
  destination: "./Public/uploads/images",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + req.jwtDecoded.username + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
})
const LocationController = require('../Controllers/LocationController')
module.exports = function (app) {
  //cho phép cors từ React server
  app.use('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, content-type, X-Auth-Token, x-access-token');
    next();
  });
  //phương thức này để tránh lỗi khi react server gọi bản tin preflight check
  app.options('/*', function (req, res) {
    res.status(200).end()
  })

  //Xử lý yêu cầu lấy danh sách tỉnh thành phố
  app.get('/listprovince', LocationController.getListProvinces)
  // Xử lý yêu cầu lấy danh sách quận huyện
  app.post('/listdistrict', LocationController.getListDistrictsOfProvince)
  //Xử lý yêu cầu lấy danh sách phường xã 
  app.post('/listward', LocationController.getListWardsOfDistrict)
  //Xử lý yêu cầu đăng nhập
  app.post('/login', AccountController.Login);
  // Xử lý yêu cầu đăng xuất
  app.post('/logout', AccountController.logOut)

  //xử lý yêu cầu làm mới JWT Token
  app.post("/refresh-token", AccountController.refreshToken);

  // Xử lý yêu cầu đăng ký
  app.post('/register', AccountController.Register);

  // Sử dụng authMiddleware.isAuth trước những api cần xác thực người dùng đã đăng nhập, thông tin người dùng có thể lấy trong req.jwtDecoded
  // app.use(AuthMiddleWare.isAuth);
  // app.get('/', )
  app.get('/allroom', RoomController.getAllRoom);
  app.get('/numberuser', AccountController.getNumberUser);
  app.get('/numberroom', RoomController.getNumberRoom);
  app.get('/numberreport', ReportController.getNumberReport);
  app.get('/numberreport_', ReportController.getNumberReport_);
  app.get('/numberpostreported', ReportController.getNumberPostReported);
  //thống kê
  app.get('/statisticreport', ReportController.getStatisticReport);
  app.get('/statisticuser', AccountController.getStatisticUser);
  app.get('/statisticroom', RoomController.getStatisticRoom);
  // Xử lý yêu cầu thêm nhà trọ mới
  app.post('/createhouse',  AuthMiddleWare.isAuth , upload.single('image'), HouseController.createHouse)
  app.get('/listhouse',  AuthMiddleWare.isAuth, HouseController.getListHouse)
  app.get('/gethouse',  AuthMiddleWare.isAuth, HouseController.getHouse)
  app.get('/listroom',RoomController.getRooms)
  app.delete('/deletehouse',  AuthMiddleWare.isAuth, HouseController.deleteHouse)
  app.post('/edithouse',  AuthMiddleWare.isAuth , upload.single('image'), HouseController.editHouse)
  app.get('/listhouseroom',  AuthMiddleWare.isAuth, RoomController.getListHouseRoom)
  app.get('/getroom', RoomController.getRoom)
  app.post('/createroom',  AuthMiddleWare.isAuth , upload.array('images', 5), RoomController.createRoom)
  app.post('/editroom',  AuthMiddleWare.isAuth , upload.array('images', 5), RoomController.editRoom)
  app.delete('/deletehouseroom',  AuthMiddleWare.isAuth, RoomController.DeleteHouseRoom)
  // app.get('/Public*', function(req,res){
  //   res.sendFile()
  // })
}
