const express = require("express")
const session=require("express-session")
const mongoose=require('mongoose')

const bcryptjs=require('bcryptjs')
const {v4:uuidv4}=require("uuid")

const app = express()

const cors=require("cors")
app.use(cors())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

mongoose.connect('mongodb+srv://hms:hms@cluster0.dvzgdxk.mongodb.net/hms').then(
    console.log('connected to database')
)

//appointment API
const userApi=require("./APIs/User").userApi
const appointmentApi=require("./APIs/Appointment.js").appointmentApi
const doctorApi=require('./APIs/Doctor').doctorApi
const hospitalApi=require('./APIs/Hospital').hospitalApi

//models
const doctorModel=require('./schema').doctorModel;
const userModel=require('./schema').userModel;
const masterAdminModel=require('./schema').masterAdminModel;
const hospitalModel=require('./schema').hospitalModel;

//Middleware
app.use(express.json())


//API Routers
app.use("/appointment",appointmentApi)
app.use('/user',userApi)
app.use('/doctor',doctorApi)
app.use('/hospital',hospitalApi);
 

//For Login
app.post('/login',async(req,res)=>{
    const userreq=req.body
    const adminobj=await masterAdminModel.findOne({username:userreq.username})
    const userobj=await userModel.findOne({username:userreq.username})
    const doctorobj=await doctorModel.findOne({username:userreq.username})
    const hospitalObj=await hospitalModel.findOne({username:userreq.username})
    if(adminobj!=null){   
        let resultOfUser=await bcryptjs.compare(userreq.password,adminobj.password)
        console.log(await bcryptjs.hash(adminobj.password,7))
        if(resultOfUser!=false){
           
            res.send({message:"success",masterObj:adminobj,type:"admin"})
            return
        }
        }
    if(userobj!=null){
     
        let resultOfUser=await bcryptjs.compare(userreq.password,userobj.password)
        if(resultOfUser!=false){
        
            res.send({message:"success",userObj:userobj,type:"user"})
            return
        }
            
        }
    if(doctorobj!=null){
        //let resultOfUser=await bcryptjs.compare(userreq.password,doctorobj.password)
       // if(resultOfUser!=false){
            res.send({message:"success",doctorObj:doctorobj,type:"doctor"})
            return
       // }
     
      
    }
    if(hospitalObj!=null){
        let resultOfUser=await bcryptjs.compare(userreq.password,hospitalobj.password)
        if(resultOfUser!=false){
            res.send({message:"success",hospitalObj:hospitalObj,type:"hospital"})
            return
        }
       
    }
   
    res.send({message:"failure"})
    
})


port=3005
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

