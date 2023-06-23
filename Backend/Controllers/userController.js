//import Models
const masterAdminModel=require('../Models/adminModel.js').masterAdminModel
const userModel=require('../Models/userModel.js').userModel
const hospitalModel=require('../Models/hospitalModel.js').hospitalModel

//import bcrypt
const bcryptjs=require('bcryptjs')
//import 
const jwt = require("jsonwebtoken")


const { appointmentHelperModel } = require('../Models/appointmenthelperModel.js')
const { appointmentModel } = require('../Models/appointmentModel.js')
const { ConversationModel } = require('../Models/ChatModel.js')


//register
async function register(req,res){
        try{
            var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            let us=req.body;
            const adminobj=await masterAdminModel.findOne({username:us.username})
            const userobj=await userModel.findOne({username:us.username})
            const hospitalObj=await hospitalModel.findOne({username:us.username})
            if(adminobj!=null || userobj!=null || hospitalObj!=null){
            res.send({message:`${us.username} already existed`})
            return
            }
            var pass = us.password;
            if (!pass.match(regpass)) {
                res.send({ message: 'password should conttain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character' })
                return
            }
                hashedPassword= await bcryptjs.hash(us.password,7)
                us.password=hashedPassword;

                const payLoad={
                    username:us.username,
                    password:us.password,
                    email:us.email
                }
                await userModel.create(us)
                jwt.sign(payLoad,"aarogya@123",{ expiresIn: "2h" },(err,token)=>{
                    if(err){
                        console.log(err)
                        res.send("Error")
                    }
                    else{
                        res.send({ message: "registration successful" ,access_token:token});
                    }
                })
        }
        catch(err){
            res.status = 400
            res.send({message: err.message})
        }
    
}

//update details
async function updateDetails(req,res){
    var fusername=req.params.username;
    var user= req.body
    await  userModel.updateOne({username:user.username},{$set:{...user}})

    res.send({message:'changes successfully done','user':user})
}

//to get count of users
async function allusers(req,res){
    let users=await userModel.find({});
    res.send({message:"Successfully retrived",userObj:users})
}

//upload profile pic
async function updateProfilepic(req,res){
    res.send({message:"image updated successfully",imgurl:req.file.path})
}

  
async function push(req,res){
    let obj=req.body;
    let Obj=await ConversationModel.findOne({user:obj.user,doctor:obj.doctor});

    if(Obj==null){
        let conversationObj={
            user:obj.user,
            doctor:obj.doctor
        }
        await ConversationModel.create(conversationObj);
    }
    res.send({message:"successfully done"})
}

//to accept the appointments
async function accepetAppointment(req,res){
    
    let appointmentAssignObj=req.body;
    //console.log(appointmentAssignObj);

    await userModel.updateOne({"myappointment.id":appointmentAssignObj.id.toString()},{$set:{"myappointment.$.status":"accepted"}});

    await appointmentModel.updateOne({_id:appointmentAssignObj.id},{$set:{status:"accepted"}});

    console.log(appointmentAssignObj)
    console.log("assign")
    let Obj=await ConversationModel.findOne({user:appointmentAssignObj.userid,doctor:appointmentAssignObj.doctor._id});

    if(Obj==null){
        let conversationObj={
            user:appointmentAssignObj.userid,
            doctor:appointmentAssignObj.doctor._id
        }
        await ConversationModel.create(conversationObj);
    }
    
    res.send({message:"Appointment Accepted Successfully!!!"});
}

//to cancel appointments

async function cancelAppointment(req,res){

    let appointmentAssignObj=req.body;
    console.log(appointmentAssignObj)
    
    await userModel.findOneAndUpdate({username:appointmentAssignObj.username},{$pull:{"myappointment":{id:appointmentAssignObj.id}}},{ safe: true, multi: false });

    await appointmentModel.updateOne({_id:appointmentAssignObj.id},{$set:{status:"cancelled",doctor:"643317660f35b3e524e62fa0"}})
     
    await appointmentHelperModel.deleteOne({hospitalName: appointmentAssignObj.hospitalName, doctor: appointmentAssignObj.doctor.username, appointmentdate: appointmentAssignObj.appointmentdate, timeslot: appointmentAssignObj.timeslot});

    res.send({message:"Appointment Successfully cancelled"});
}

module.exports={register,updateDetails,allusers,accepetAppointment,cancelAppointment,updateProfilepic,push}