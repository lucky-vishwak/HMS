const express=require("express")
const doctorApi=express.Router()
const mongoose=require("mongoose")


doctorApi.use(express.json())

let doctorSchema={
    fullname:{type:String},
    username:{type:String},
    phonenumber:{type:Number},
    join_date:{type:String},
    join_time:{type:String},
    email:{type:String},
    password:{type:String},
    specialization:{type:String},
    gender:{type:String},
    about:{type:String},
    imgurl:{type:String},
    hospital:{type:String}
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

doctorApi.put("/upadteProfile/:username",async(req,res)=>{
    let username=req.params.username;
    
    let updatedDoctorObj=req.body;

    let filter={username:username}

    await doctorModel.updateOne(filter,{ $set :{phonenumber:updatedDoctorObj['phonenumber']}});

    await doctorModel.updateOne(filter,{ $set :{email:updatedDoctorObj['email']}});

    await doctorModel.updateOne(filter,{ $set :{about:updatedDoctorObj['about']}});
    
    console.log(await doctorModel.findOne(filter));
    res.send({message:"Updated Successfully",updateddoctorobj:updatedDoctorObj});

})






module.exports={doctorApi,doctorModel}