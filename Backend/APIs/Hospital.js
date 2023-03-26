const express=require('express')
const hospitalApi=express.Router()
const mongoose=require('mongoose');
const { doctorModel } = require('./../schema');

hospitalApi.use(express.json())
//establish connection between schema and collection


const hospitalModel=require('./../schema').hospitalModel;
const masterAdminModel=require('./../schema').masterAdminModel;
const userModel=require('./../schema').userModel;
const appointmentHelperModel=require('./../schema').appointmentHelperModel;
const appointmentModel=require('./../schema').appointmentModel;

hospitalApi.post('/add-hospital',async(req,res)=>{

    let hospitalObj=req.body;


    let hospitalname=await hospitalModel.find({hospitalName:hospitalObj['hospitalName']})
    let hospitaluser=await hospitalModel.find({username:hospitalObj['username']})
    let adminobj=await masterAdminModel.find({username:hospitalObj['username']})
    let userobj=await userModel.find({username:hospitalObj['username']})

    if(hospitalname.length!=0)
    {
        res.send({message:'Hospital already exist'});
    }
    else if(adminobj.length!=0 || userobj.length!=0 || hospitaluser.length!=0)
    {
        res.send({message:"username already exist"}); 
    }
    else{
        await hospitalModel.create(hospitalObj);
        res.send({message:"Hospital added succesfully"});
    }
})

hospitalApi.get('/all-hospitals',async(req,res)=>{
    
    let hospitals=await hospitalModel.find({});
    if(hospitals.length!=0)
    res.send({message:"Success",hospitalsObj:hospitals});
    else
    res.send({message:"No Hospital found"});

})

hospitalApi.put("/assign-doctor/:hospitalName",async (req,res)=>{

    let appointmentAssignObj=req.body;
    let hospitalName=req.params.hospitalName;

    let doctors=await doctorModel.find({hospitalName:hospitalName,specialization:appointmentAssignObj.specialization}).sort({rating_avg:-1});

    if(doctors.length==0){
        res.send({message:"No doctor under this specalisation"});
    }
    else{

    for(let i=0;i<doctors.length;i++){
        let helperObj=await appointmentHelperModel.find({hospitalName:hospitalName,doctor:doctors[i].username,appointmentdate:appointmentAssignObj.appointmentdate,timeslot:appointmentAssignObj.timeslot});
        
        if(helperObj.length==0){

            await appointmentModel.findOneAndUpdate({_id:appointmentAssignObj._id},{$set:{"doctor":doctors[i]['username'],"status":"accepted"}});

            let helpObj={
                "hospitalName":hospitalName,
                "reason":appointmentAssignObj.problem,
                "doctor":doctors[i].username,
                "appointmentdate":appointmentAssignObj.appointmentdate,
                "timeslot":appointmentAssignObj.timeslot
            }

            await appointmentHelperModel.create(helpObj);

            res.send({message:`Successfully assigned with ${doctors[i].username}`});
            return;
            
        }
      }
    }

})

module.exports={hospitalApi}
