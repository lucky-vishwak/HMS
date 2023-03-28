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

userRoute.post('/x',(req,res)=>{
    upload(req,res,(err)=>{
        res.send({message:'image created successfully'})
    })
    
})

module.exports={userRoute}