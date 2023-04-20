//import express
const express = require("express")
//import session
const session=require("express-session")
//import mongoose
const mongoose=require('mongoose')
//import bcryptjs
const bcryptjs=require('bcryptjs')
const {v4:uuidv4}=require("uuid")
const app = express()
const path=require("path")

// const http=require("http").createServer(app)
// const io=require("./Middleware/socket")

require("dotenv").config()

//import express async-handler
const errorHandler=require('express-async-handler')

const cors=require("cors")
app.use(cors())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))


//connected to database
mongoose.connect(process.env.MONGOURL).then(
    console.log('connected to database')
)

//Middleware
app.use(express.json())

//importing routes
const userRoute=require("./Routes/userRoute.js").userRoute
const adminRoute=require("./Routes/adminRoute.js").adminRoute
const doctorRoute=require('./Routes/doctorRoute.js').doctorRoute
const appointmentRoute=require("./Routes/appointmentRoute.js").appointmentRoute
const hospitalRoute = require("./Routes/hospitalRoute.js").hospitalRoute
const loginRoute=require('./Routes/loginRoute').loginRoute;
const contactRoute = require("./Routes/contactRoute.js").contactRoute
const chatRoute  = require("./Routes/chatRoute.js").chatRoute
const paymentRoute=require("./Routes/paymentRoute.js").paymentRoute


//API Routers
app.use('/',loginRoute)
app.use('/appointment',appointmentRoute)
app.use('/user',userRoute)
app.use('/doctor',doctorRoute);
app.use('/hospital',hospitalRoute);
app.use('/admin',adminRoute)
app.use('/contact',contactRoute);
app.use('/chat',chatRoute);
app.use('/create',paymentRoute)
app.use('/api',paymentRoute)
app.get("/",(req,res)=>{
    res.send({message:"hello this is aarogya backend"})
})



//error handling for invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

port=process.env.PORT || 3005
var server = app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

module.exports = {server}
