const express=require('express')
const userRoute=express.Router()


const multer=require('multer')
//import multer
const upload=require('../Controllers/multer').upload

//import userController
const userController=require('../Controllers/userController')

//middleware
userRoute.use(express.json())

//register request
userRoute.post('/register', userController.register)

//update user request
userRoute.post('/edit/:username',userController.updateDetails)

//all user
userRoute.get('/all-users',userController.allusers)

module.exports={userRoute}