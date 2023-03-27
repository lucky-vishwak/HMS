//import express
const express = require("express")
//import session
const session=require("express-session")
//import mongoose
const mongoose=require('mongoose')
//import bcryptjs
const bcryptjs=require('bcryptjs')
const {v4:uuidv4}=require("uuid")

//calling express
const app = express()

const cors=require("cors")
app.use(cors())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

//connected to database
mongoose.connect('mongodb+srv://hms:hms@cluster0.dvzgdxk.mongodb.net/hms').then(
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

//API Routers
app.use('/',loginRoute)
app.use('/appointment',appointmentRoute)
app.use('/user',userRoute)
app.use('/doctor',doctorRoute);
app.use('/hospital',hospitalRoute);
app.use('/admin',adminRoute)
app.use('/contact',contactRoute);


port=3005
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

