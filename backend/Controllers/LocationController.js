const Location = require('../Models/Location')

exports.getListProvinces = async function(req, res){
    try {
        data = await Location.getListProvince()
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).end()
    }
}
exports.getListDistrictsOfProvince = async function(req, res){
    try {
        data = await Location.getListDistrictOfProvince(req.body.province)
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).end()
    }
}

exports.getListWardsOfDistrict = async function(req, res){
    try {
        data = await Location.getListWardOfDistrict(req.body.district)
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).end()
    }
}