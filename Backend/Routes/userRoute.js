const express=require('express')
const multer = require('multer')
const userRoute=express.Router()


//import express async-handler
const errorHandler=require('express-async-handler')
//import multerobj
//const upload=require('../Controllers/multer')


//import userController
const upload=require('../Controllers/multer').upload

var userController=require('../Controllers/userController')
//middleware
userRoute.use(express.json())

//register request
userRoute.post('/register', errorHandler(userController.register))

//update user request
userRoute.post('/edit/:username',errorHandler(userController.updateDetails))

//all user
userRoute.get('/all-users',errorHandler(userController.allusers))

//update user profilepic
userRoute.post('/uploadfile/:username',upload,(req,res)=>{
   console.log(upload)
})

module.exports={userRoute}