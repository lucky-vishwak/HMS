const express = require("express")
const userapi=require("./APIs/User").userapi
const appointmentapi=require("./APIs/Appointment.js").appointmentapi

const session=require("express-session")

const {v4:uuidv4}=require("uuid")

const app = express()

const cors=require("cors")
app.use(cors())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

//Middleware
app.use(express.json())

//models for userapi
const loginus=require('./schema').loginus
const loginad=require('./schema').loginad

//appointment API
app.use("/appointment",appointmentapi)
//user api
app.use('/user',userapi)

//connection established
const mongoose=require('mongoose')
 

//For Login
app.post('/login',async(req,res)=>{
    const userreq=req.body
    const adminobj=await loginad.findOne({username:userreq.username})
    const userobj=await loginus.findOne({username:userreq.username})
   
    if(adminobj!=null){
            res.send({message:adminobj.username,admin:true})
            return
        }
    else if(userobj!=null){
            res.send({message:"success",userobj:userobj,admin:false})
            return
        }
    res.send({message:"failure"})
})


port=3005
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

