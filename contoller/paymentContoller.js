// import { instance } from "../index"
const instance = require("../authUtlis.js/paymentInstance")

const paymentProcess = async(req,res)=>{
    const option = {
        amount : req.body.amount * 100,
        
    }
    const order = await instance.orders.create(option)
    res.status(200).json({
        success : true,
        order
    })
}

module.exports = {paymentProcess}

   

