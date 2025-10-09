const express = require("express")
const router = express.Router();

const { paymentProcess } = require('../contoller/paymentContoller')



router.post('/',paymentProcess)



module.exports=router