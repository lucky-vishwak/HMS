//import models
masterAdminModel=require('../Models/adminModel.js').masterAdminModel
userModel=require('../Models/userModel.js').userModel
doctorModel=require('../Models/doctorModel.js').doctorModel
hospitalModel=require('../Models/hospitalModel.js').hospitalModel

//import bcryptjsconst 
const bcryptjs=require('bcryptjs')



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
    //     let resultOfUser=await bcryptjs.compare(userreq.password,doctorobj.password)
    //    if(resultOfUser!=false){
            res.send({message:"success",doctorObj:doctorobj,type:"doctor"})
            return
    //    }
     
      
    }
    if(hospitalObj!=null){
        // let resultOfUser=await bcryptjs.compare(userreq.password,hospitalObj.password)
        //  if(resultOfUser!=false){
            res.send({message:"success",hospitalObj:hospitalObj,type:"hospital"})
             return
    //}
       
    }
   
    res.send({message:"failure"})
    
}

module.exports={login}