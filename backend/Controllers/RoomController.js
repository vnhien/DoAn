const Room = require('../Models/Room');
const House = require('../Models/House');
const fs = require('fs');
const { type } = require('os');
const { ok } = require('assert');
const { Int } = require('mssql');
exports.createRoom = async (req, res) => {
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try {
        let data = req.body;
        data.userId = user.userId;
        data.image = req.file.path.slice(7);
        let result = await Room.createRoom(data);
        if (result.ok === 1) {
            res.status(200).send({ "message": 'created' });
        }
    } catch (err) {
        deleteFile(req.file.path)
        res.status(500).end();
        console.log(err)
    }

}

exports.getNumberRoom = async (req, res) => {

    // let user = req.jwtDecoded;
    // if (user.acctype != 'Chủ nhà trọ' && user.acctype != 'Quản trị viên') {
    //     res.status(403).end();
    //     return;
    // }
    
    try{
        var result = await Room.getNumberRoom();
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
    ;
}

exports.getStatisticRoom = async (req, res) => {

    // let user = req.jwtDecoded;
    // if (user.acctype != 'Chủ nhà trọ' && user.acctype != 'Quản trị viên') {
    //     res.status(403).end();
    //     return;
    // }
    
    try{
        var result = await Room.getStatisticRoom();
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
    ;
}

exports.getListRoom = async (req, res)=>{
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try{
        let data = {};
        data.userId = user.userId;
        data.page = parseInt(req.query.page) || 1;
        if(data.page < 1){
            data.page = 1;
        }
        let result = await Room.getListRoom(data);
        console.log(result)
        res.status(200).json(result)
    }catch(err){
        console.log(err)
    }
}
exports.getAllRoom = async (req, res)=>{
    try{
        let data = {};
        data.page = parseInt(req.query.page) || 1;
        if(data.page < 1){
            data.page = 1;
        }
        let result = await Room.getAllRoom(data);
        console.log(typeof(result))
        res.status(200).send(result)
        
    }catch(err){
        console.log(err)
    }
    
}
exports.getRooms = async (req, res) => {
    // priceup = roomdata.priceup,
    //   pricedown = roomdata.pricedown,
    //   sizeup = roomdata.sizeup,
    //   sizedown = roomdata.sizedown,
    //   category = roomdata.category,
    //   ordertype = roomdata.ordertype,
    //   order = roomdata.order,
    //   province = roomdata.province,
    //   district = roomdata.district,
    //   ward =  roomdata.ward
    try{
        var priceup,pricedown,sizeup,sizedown,category,ordertype,order,province=req.query.province,district=req.query.district,ward=req.query.ward,page=req.query.page||1;
        if (page<1) 
            page=1;
        switch(req.query.price){
            case '0':
                priceup = 100000;
                pricedown = 0;
                break;
            case '1':
                priceup = 1000;
                pricedown = 0;
                break;
            case '2':
                priceup = 1500;
                pricedown = 1000;
                break;
            case '3':
                priceup = 2000;
                pricedown = 1500;
                break;
            case '4':
                priceup = 2500;
                pricedown = 2000;
                break;
            case '5':
                priceup = 3000;
                pricedown = 2000;
                break;
            case '6':
                priceup = 6000;
                pricedown = 3000;
                break;
            case '7':
                priceup = 100000;
                pricedown = 6000;
                break;
            default:
                priceup = 100000;
                pricedown = 0;
                break;

        }
        switch(req.query.size){
            case '0':
                sizeup=1000;
                sizedown=0;
                break;
            case '1':
                sizeup=10;
                sizedown=0;
                break;
            case '2':
                sizeup=20;
                sizedown=10;
                break;
            case '3':
                sizeup=30;
                sizedown=20;
                break;
            case '4':
                sizeup=60;
                sizedown=30;
                break;
            case '5':
                sizeup=1000;
                sizedown=60;
                break;
            default:
                sizeup=1000;
                sizedown=0;
                break;

        }
        switch(req.query.category){
           case '0':
               category="%";
               break;
            case '1': 
                category="Phòng cho thuê";
                break;
            case '2':
                category="Homestay";
                break;
            case '3':
                category="Ở ghép";
                break;
            case '4': 
                category="Nguyên căn";
                break;
            default:
                category="%";
                break;

        }
        switch(req.query.ordertype){
            case '0':
                ordertype="price";
                break;
            case '1':
                ordertype="price";
                break;
            case '2':
                ordertype="size";
                break;
            default:
                ordertype="price";
                break;   
        }
        switch(req.query.order){
            case '0':
                console.log('asc now');
                order='asc';
                break;
            case '1':
                order='desc';
                console.log('desc now')
                break;
            default:
                console.log('default now')
                order='asc';
                break;   
        }
        if (district=='all')
            district="%";
        if (province=='all')
            province='%';
        if(ward=='all')
            ward='%';
        let result = await Room.getRooms({
            'priceup' : priceup,
            'pricedown' : pricedown,
            'sizeup' : sizeup,
            'sizedown' : sizedown,
            'category' : category,
            'ordertype' : ordertype,
            'order' : order,
            'province' : province,
            'district' : district,
            'ward' :  ward
        });
        //console.log(result.data);
        res.status(200).json(result);
        
        
        
    }
    catch(err){
        console.log(err)
    }

};
// function deleteFile(path) {
//     fs.unlink(path, (err) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         //file removed
//     })
// }

exports.getListHouseRoom = async (req, res)=>{
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
        res.status(403).end();
        return;
    }
    try{
        let data = {};
        data.userId = user.userId;
        data.houseId = req.query.houseId;
        data.page = parseInt(req.query.page) || 1;
        if(data.page < 1){
            data.page = 1;
        }
        let result = await Room.getListHouseRoom(data);
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
}
exports.createRoom = async (req, res) => {
    let user = req.jwtDecoded;
    // console.log(user)
    // console.log("Request ---", req.body);
    // console.log("Request file ---", req.file);//Here you get file.
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try {
        let data = req.body;
        // console.log("data:", data)
        data.userId = user.userId;
        var images = req.files;
        data.image1 = (images[0] && images[0].path) ? images[0].path.slice(7) : '';
        data.image2 = (images[1] && images[1].path) ? images[1].path.slice(7) : '';
        data.image3 = (images[2] && images[2].path) ? images[2].path.slice(7) : '';
        data.image4 =(images[3] && images[3].path) ? images[3].path.slice(7) : '';
        data.image5 = (images[4] && images[4].path) ? images[4].path.slice(7) : '';
        var check = await House.checkExistHouse(data.userId, data.houseId)
        if (check && check.houseId !== parseInt(data.houseId, 10)){
            images.forEach(image => {
                deleteFile(image.path)
            });
            res.status(403).end();
            console.log(check.houseId , data.houseId)
            return
        }
 
        let result = await Room.createRoom(data);
        if (result.ok === 1) {
            res.status(200).send({ "message": 'created' });
        }
    } catch (err) {
        var images = req.files;
        images.forEach(image => {
            if(image && image.path){
                deleteFile(image.path)
            }
        });
        res.status(500).end();
        console.log(err)
    }

}
exports.getRoom = async (req, res)=>{
    try{
        let roomId = req.query.roomId;
        let result = await Room.getRoom(roomId);
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
}
exports.DeleteHouseRoom = async(req, res)=>{
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try{
        let data = {};
        data.userId = user.userId;
        data.houseId = req.query.houseId
        data.roomId = req.query.roomId
        let result = await Room.deleteHouseRoom(data);
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
}

exports.editRoom = async (req, res) => {
    let user = req.jwtDecoded;
    // console.log(user)
    // console.log("Request ---", req.body);
    // console.log("Request file ---", req.file);//Here you get file.
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try {
        let data = req.body;
        // console.log("data:", data)
        data.userId = user.userId;
        var images = req.files;
        var imageNames = data.imageNames ? data.imageNames : [];
        // console.log('imageNames: ', imageNames)
        for(let i = 0; i< imageNames.length; i++){
            data[imageNames[i]] =  (images[i] && images[i].path) ? images[i].path.slice(7) : ''
        }
        // console.log(data)
        let result = await Room.updateRoom(data);
        if (result.ok === 1) {
            res.status(200).send({ "message": 'created' });
        }else{
            res.status(500).end();
        }
    } catch (err) {
        var images = req.files;
        images.forEach(image => {
            if(image && image.path){
                deleteFile(image.path)
            }
        });
        res.status(500).end();
        console.log(err)
    }

}
function deleteFile(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file removed
    })
}
