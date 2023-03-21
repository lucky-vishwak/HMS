const express=require("express")
const doctorApi=express.Router()
const mongoose=require("mongoose")


doctorApi.use(express.json())

let doctorSchema={
    firstname:{type:String},
    lastname:{type:String},
    username:{type:String},
    phonenumber:{type:Number},
    join_date:{type:String},
    join_time:{type:String},
    email:{type:String},
    password:{type:String},
    confirmpassword:{type:String},
    gender:{type:String}
    } 

const doctorModel=mongoose.model('doctor',doctorSchema)

doctorApi.post("/add-doctor",async(req,res)=>{

    let doctorObj=req.body;
    let doctors=await doctorModel.find({username:`${doctorObj.username}`})
    if(doctors.length==0){
    await doctorModel.create(doctorObj);
    res.send({message:"Doctor added successfully"})
    }
    else{
        res.send({message:`Doctor with ${doctorObj.username} username already exist`});
    }
})

doctorApi.get("/all-doctors",async(req,res)=>{

    let doctors=await doctorModel.find({});

    res.send({message:"Successfully retrived",doctorObj:doctors})
    
})




module.exports={doctorApi}