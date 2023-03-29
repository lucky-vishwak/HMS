const express=require('express')
const loginRoute=express.Router()

//import express async-handler
const errorHandler=require('express-async-handler')
//import logincontroller
const loginController=require('../Controllers/loginController.js')


loginRoute.use(express.json())


loginRoute.post('/login',errorHandler(loginController.login))

module.exports={loginRoute};