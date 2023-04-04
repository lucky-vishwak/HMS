//importing doctor model
const doctorModel=require('./../Models/doctorModel').doctorModel;
const userModel=require('./../Models/userModel').userModel;
const masterAdminModel=require('./../Models/adminModel').masterAdminModel;

const bcryptjs=require('bcryptjs')


// adding doctor to doctor collection
async function addDoctor(req,res){

    let doctorObj=req.body;
    let doctors=await doctorModel.find({username:`${doctorObj.username}`})
    let users=await userModel.find({username:`${doctorObj.username}`})
    let admins=await masterAdminModel.find({username:`${doctorObj.username}`})

    if(doctors.length==0&&users.length==0&&admins.length==0){
        let hashedPassword= await bcryptjs.hash(doctorObj.password,7);
        doctorObj.password=hashedPassword
        await doctorModel.create(doctorObj);
        res.send({message:"Doctor added successfully"});
    }
    else{
        res.send({message:`${doctorObj.username} username already exist`});
    }
}

//retriving all doctors based on hospitals
async function allDoctors(req,res){
    let hospitalObj=req.body;
    let doctors=await doctorModel.find({hospitalName:hospitalObj.name});
    res.send({message:"Successfully retrived",doctorObj:doctors});

}

async function updatedDoctorObj(req,res){
    let username=req.params.username;
    let updatedDoctorObj=req.body;
    let filter={username:username}
    await doctorModel.updateOne(filter,{ $set :{phonenumber:updatedDoctorObj['phonenumber'],email:updatedDoctorObj['email'],about:updatedDoctorObj['about']}});
    res.send({message:"Updated Successfully",updateddoctorobj:updatedDoctorObj});

}

//total doctors for master admin
async function totaldoctors(req,res){
    let doctors=await doctorModel.find({})
    res.send({message:"success",doctorObj:doctors})
}

module.exports={addDoctor,allDoctors,updatedDoctorObj,totaldoctors}