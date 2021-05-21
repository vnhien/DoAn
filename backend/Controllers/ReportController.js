const Report = require('../Models/Report');
const fs = require('fs')

exports.getNumberReport = async (req, res) => {

    // let user = req.jwtDecoded;
    // if (user.acctype != 'Chủ nhà trọ' && user.acctype != 'Quản trị viên') {
    //     res.status(403).end();
    //     return;
    // }
    
    try{
        var result = await Report.getNumberReport();
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
    ;
}

exports.getNumberPostReported = async (req, res) => {

    // let user = req.jwtDecoded;
    // if (user.acctype != 'Chủ nhà trọ' && user.acctype != 'Quản trị viên') {
    //     res.status(403).end();
    //     return;
    // }
    
    try{
        var result = await Report.getNumberPostReported();
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
    ;
}

exports.getStatisticReport = async (req, res) => {

    // let user = req.jwtDecoded;
    // if (user.acctype != 'Chủ nhà trọ' && user.acctype != 'Quản trị viên') {
    //     res.status(403).end();
    //     return;
    // }
    
    try{
        var result = await Report.getStatisticReport();
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
    ;
}

exports.getNumberReport_ = async (req, res) => {

    // let user = req.jwtDecoded;
    // if (user.acctype != 'Chủ nhà trọ' && user.acctype != 'Quản trị viên') {
    //     res.status(403).end();
    //     return;
    // }
    
    try{
        var result = await Report.getNumberReport_();
        res.status(200).json(result)
    }catch(err){
        res.status(500).end();
        console.log(err)
    }
    ;
}