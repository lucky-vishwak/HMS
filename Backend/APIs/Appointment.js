const express = require("express")
const appointmentApi = express.Router()
const mongoose = require("mongoose")

appointmentApi.use(express.json())

//adding appointment
const appointmentModel=require("../schema").appointmentModel
const userModel=require("../schema").userModel


appointmentApi.post("/addappointment", async (req, res) => {
    let appointmentobj=req.body
    // let obj= await userModel.findOne({username:`${appointmentobj.username}`})
    // obj["myappointment"].push(appointmentobj)
    // userModel.updateOne({username:`${appointmentobj.username}`},{$set:{myappointment:obj["myappointment"]}})
    appointmentobj={...appointmentobj,doctor:"Not assigned",status:"pending"}
    await userModel.findOneAndUpdate({username:`${appointmentobj.username}`},{
        $push:{
            myappointment:{
                  patientname: appointmentobj.patientname,
                  phonenumber: appointmentobj.phonenumber,
                  emailaddress: appointmentobj.emailaddress,
                  appointmentdate: appointmentobj.appointmentdate,
                  timeslot: appointmentobj.timeslot,
                  specialization: appointmentobj.specialization,
                  emergencyname: appointmentobj.emergencyname,
                  emergencyphone: appointmentobj.emergencyphone,
                  doctor: appointmentobj.doctor,
                  problem: appointmentobj.problem,
                  username: appointmentobj.username,
                  status: appointmentobj.status
            }
        }
    })
    const details=new appointmentModel(appointmentobj)
    await details.save()
    res.send(appointmentobj)
})


//getting appointment
appointmentApi.get("/appointments/:username",async (req,res)=>{
    const name=req.params.username
    let result=await userModel.findOne({username:`${name}`})
    res.send(result.myappointment)
})


module.exports = {appointmentApi}