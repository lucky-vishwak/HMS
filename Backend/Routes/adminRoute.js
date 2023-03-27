//import express
const express=require('express')
const adminRoute=express.Router()

//middleware
adminRoute.use(express.json())

//importing controllers
const adminController=require("./../Controllers/adminController")


//post call for adding admin
adminRoute.post("/addadmin",adminController.addAdmin)



//exporting
module.exports={adminRoute}