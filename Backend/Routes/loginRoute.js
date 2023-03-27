const express=require('express')
const loginRoute=express.Router()

//import logincontroller
const loginController=require('../Controllers/loginController.js')


loginRoute.use(express.json())


loginRoute.post('/login',loginController.login)

module.exports={loginRoute};