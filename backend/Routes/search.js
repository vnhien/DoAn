const Room = require('../Models/Room.js')
const express = require('express');

const router = express.Router()

// router.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
router.use(express.json());
router.get('/',(req, res)=>{            //return all room
    const data = Room.getAllRoom()
    data.then(data => res.send(data))
})
/**
 * request body expect: data{
 *                  lowest_price: ,
 *                  highest_price:
 *                  lowest_size: ,
 *                  highest_size: ,
 *                  quan_huyen: ,
 * }                xa_phuong: ,
 *
 */
router.post('/',(req,res)=>{
    const data=req.body;
  //  const result = Room.search(data);
    console.log(data)
    res.send('ok dc r')
   // result.then(result => res.send(result)) //send data to client
})
module.exports = router