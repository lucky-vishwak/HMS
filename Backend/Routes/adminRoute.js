//import express
const express=require('express')
const adminRoute=express.Router()

//middleware
adminRoute.use(express.json())

const verifyToken=require('../Middleware/verifyToken')

//import express async-handler
const errorHandler=require('express-async-handler')

//importing controllers
const adminController=require("./../Controllers/adminController")


//post call for adding admin
adminRoute.post("/addadmin",verifyToken,errorHandler(adminController.addAdmin))



//exporting
module.exports={adminRoute}