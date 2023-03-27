const express=require("express")
const doctorApi=express.Router()
const mongoose=require("mongoose")


doctorApi.use(express.json())


const doctorModel=require('./../schema').doctorModel;
const userModel=require("../schema").userModel;
const masterAdminModel=require("./../schema").masterAdminModel;

doctorApi.post("/add-doctor",async(req,res)=>{

    let doctorObj=req.body;
    let doctors=await doctorModel.find({username:`${doctorObj.username}`})
    let users=await userModel.find({username:`${doctorObj.username}`})
    let admins=await masterAdminModel.find({username:`${doctorObj.username}`})

    if(doctors.length==0&&users.length==0&&admins.length==0){
    await doctorModel.create(doctorObj);
    res.send({message:"Doctor added successfully"})
    }
    else{
        res.send({message:`${doctorObj.username} username already exist`});
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
    
    // console.log(await doctorModel.findOne(filter));
    res.send({message:"Updated Successfully",updateddoctorobj:updatedDoctorObj});

})



module.exports={doctorApi}