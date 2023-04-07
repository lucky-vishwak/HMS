const express = require("express")
const paymentRoute = express.Router()
paymentRoute.use(express.json())
const verifyToken=require('../Middleware/verifyToken')
//controllers
const paymentcontroller=require("../Controllers/paymentcontrollers")



paymentRoute.post('/orderId',verifyToken,paymentcontroller.create_orderId)
paymentRoute.post('/payment/verify',verifyToken,paymentcontroller.verify_payment)





module.exports={paymentRoute}