const express=require('express')
const hospitalApi=express.Router()
const mongoose=require('mongoose')

hospitalApi.use(express.json())
//establish connection between schema and collection


const hospitalModel=require('./../schema').hospitalModel;
const masterAdminModel=require('./../schema').masterAdminModel;
const userModel=require('./../schema').userModel;

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
        hashedPassword= await bcryptjs.hash(hospitalObj.password,7)
        hospitalObj.password=hashedPassword
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

module.exports={hospitalApi}
