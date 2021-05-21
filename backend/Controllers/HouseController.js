const House = require('../Models/House');
const Room = require('../Models/Room');
const fs = require('fs')
exports.createHouse = async (req, res) => {
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
        data.userId = user.userId;
        data.image = req.file.path.slice(7);
        let result = await House.createHouse(data);
        if (result.ok === 1) {
            res.status(200).send({ "message": 'created' });
        }
    } catch (err) {
        deleteFile(req.file.path)
        res.status(500).end();
        console.log(err)
    }

}
exports.getListHouse = async (req, res)=>{
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
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
        let result = await House.getListHouse(data);
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
}

exports.getHouse =  async (req, res)=>{
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try{
        let data = {};
        data.userId = user.userId;
        data.houseId = (req.query.houseId) || 0;
        let result = await House.getDetailHouse(data);
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
}

exports.editHouse = async (req, res) =>{
    let user = req.jwtDecoded;
    // console.log(user)
    // console.log("Request ---", req.body);
    // console.log("Request file ---", req.file);//Here you get file.
    if (user.acctype != 'Chủ nhà trọ') {
        if(req.file){
            deleteFile(req.file.path)
        }
        res.status(403).end();
        return;
    }
    try {
        let data = req.body;
        data.userId = user.userId;
        if(req.file){
            data.image = req.file.path.slice(7);
        }else{
            delete data.image;
        }
        let result = await House.updateHouse(data);
        if (result.ok === 1) {
            res.status(200).send({ "message": 'updated' });
        }
    } catch (err) {
        if(req.file){
            deleteFile(req.file.path)
        }
        res.status(500).end();
        console.log(err)
    }
}

exports.deleteHouse = async (req, res)=>{
    let user = req.jwtDecoded;
    if (user.acctype != 'Chủ nhà trọ') {
        deleteFile(req.file.path)
        res.status(403).end();
        return;
    }
    try{
        let data = {};
        data.userId = user.userId;
        data.houseId = (req.query.houseId) || 0;
        let result = {};
        result['deletehouse'] = await House.deleteHouse(data);
        result['deleteroom'] = await Room.deleteHouseRooms(data);
        res.status(200).json(result)
    }catch(err){
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