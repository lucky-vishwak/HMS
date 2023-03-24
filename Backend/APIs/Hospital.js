const express=require('express')
const hospitalApi=express.Router()
const mongoose=require('mongoose')

hospitalApi.use(express.json())
//establish connection between schema and collection

const HospitalSchema={
    hospitalName:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
}

const HospitalModel=mongoose.model('hospital',HospitalSchema)
const loginad=require('./User').loginad;
const loginus=require('./User').loginus;

hospitalApi.post('/add-hospital',async(req,res)=>{

    let hospitalObj=req.body;

    // console.log(hospitalObj);

    let hospitalname=await HospitalModel.find({hospitalName:hospitalObj['hospitalName']})
    let hospitaluser=await HospitalModel.find({username:hospitalObj['username']})
    let adminobj=await loginad.find({username:hospitalObj['username']})
    let userobj=await loginus.find({username:hospitalObj['username']})
   
    // console.log(hospitalname)
    // console.log(hospitaluser)
    // console.log(adminobj)
    // console.log(userobj)

    if(hospitalname.length!=0)
    {
        res.send({message:'Hospital already exist'});
    }
    else if(adminobj.length!=0 || userobj.length!=0 || hospitaluser.length!=0)
    {
        res.send({message:"username already exist"}); 
    }
    else{
        await HospitalModel.create(hospitalObj);
        res.send({message:"Hospital added succesfully"});
    }
})

hospitalApi.get('/all-hospitals',async(req,res)=>{
    
    let hospitals=await HospitalModel.find({});
    if(hospitals.length!=0)
    res.send({message:"Success",hospitalsObj:hospitals});
    else
    res.send({message:"No Hospital found"});

})


module.exports={hospitalApi}