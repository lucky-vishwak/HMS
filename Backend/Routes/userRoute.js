const express=require('express')
const multer = require('multer')
const userRoute=express.Router()

const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')


//import multerobj
const upload=require('../Middleware/multer').multerObj



var userController=require('../Controllers/userController')
//middleware
userRoute.use(express.json())
userRoute.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

//register request
userRoute.post('/register', errorHandler(userController.register))

//update user request
userRoute.post('/edit/:username',verifyToken,errorHandler(userController.updateDetails))

//all user
userRoute.get('/all-users',verifyToken,errorHandler(userController.allusers))

//user


//update user profilepic
userRoute.post('/uploadfile',upload.single('image'),userController.updateProfilepic)

//cancel appointments by specific user
userRoute.put('/cancel-appointment',verifyToken,userController.cancelAppointment);

//accept appointments by specific user
userRoute.put('/accept-appointment',verifyToken,userController.accepetAppointment);

userRoute.post('/post-data',userController.push)




module.exports={userRoute}