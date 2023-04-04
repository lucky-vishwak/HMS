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
// var bodyParser = require('body-parser');
// app.use(bodyParser.raw({limit: '500mb'}));
// app.use(bodyParser.json({limit: '500mb'}));
// app.use(bodyParser.urlencoded({ 
//     extended: false,
//     parameterLimit: 10000000000,
//     bodyLimit:10000000 // experiment with this parameter and tweak
// }));

//calling express
//const app = express()


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




//error handling for invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

//error handling for invalid syntax
// app.use((err,req,res,next)=>{
//      console.log(err.message)
//      res.send({message:`${err}`})
// })
port=3005
var server = app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

module.exports = {server}
