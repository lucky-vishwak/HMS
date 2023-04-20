//import models
masterAdminModel=require('../Models/adminModel.js').masterAdminModel
userModel=require('../Models/userModel.js').userModel
doctorModel=require('../Models/doctorModel.js').doctorModel
hospitalModel=require('../Models/hospitalModel.js').hospitalModel

//import bcryptjsconst 
const bcryptjs=require('bcryptjs')

//import jwt
const jwt=require('jsonwebtoken')

require("dotenv").config();


//login controller
async function  login(req,res){
    const userreq=req.body
    const adminobj=await masterAdminModel.findOne({username:userreq.username})
    const userobj=await userModel.findOne({username:userreq.username})
    const doctorobj=await doctorModel.findOne({username:userreq.username})
    const hospitalObj=await hospitalModel.findOne({username:userreq.username})
    if(adminobj!=null){   
        let resultOfUser=await bcryptjs.compare(userreq.password,adminobj.password)
        if(resultOfUser!=false){   

            let token=   jwt.sign({username:userreq.username},process.env.SECRETKEY,{expiresIn:"2d"}) 
            token="Bearer"+" "+token
            res.send({message:"success",token:token,masterObj:adminobj,type:"admin"})
            return
        }
        }
    if(userobj!=null){
     
        let resultOfUser=await bcryptjs.compare(userreq.password,userobj.password)
        if(resultOfUser!=false){
            let token=jwt.sign({username:userreq.username},process.env.SECRETKEY) 
            token="Bearer"+" "+token
            res.send({message:"success",token:token,userObj:userobj,type:"user"})
            return
        }
            
        }
    if(doctorobj!=null){
    //     let resultOfUser=await bcryptjs.compare(userreq.password,doctorobj.password)
    //    if(resultOfUser!=false){
        token=jwt.sign({username:userreq.username},process.env.SECRETKEY)
        token="Bearer"+" "+token
            res.send({message:"success",token:token,doctorObj:doctorobj,type:"doctor"})
            return
    //    }
     
      
    }
    if(hospitalObj!=null){
        // let resultOfUser=await bcryptjs.compare(userreq.password,hospitalObj.password)
        //  if(resultOfUser!=false){
            token=jwt.sign({username:userreq.username},process.env.SECRETKEY)
            token="Bearer"+" "+token
            res.send({message:"success",token:token,hospitalObj:hospitalObj,type:"hospital"})
             return
    // }
       
    }
   
    res.send({message:"failure"})
    
}

module.exports={login}