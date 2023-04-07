const express = require("express")
const paymentRoute = express.Router()
paymentRoute.use(express.json())

//controllers
const paymentcontroller=require("../Controllers/paymentcontrollers")



paymentRoute.post('/orderId',paymentcontroller.create_orderId)
paymentRoute.post('/payment/verify',paymentcontroller.verify_payment)





module.exports={paymentRoute}