const express = require("express")
const appointmentapi = express.Router()
const mongoose = require("mongoose")

appointmentapi.use(express.json())

//adding appointment
const appointmentadd=require("../schema").appointmentadd
const loginus=require("../schema").loginus
appointmentapi.post("/addappointment", async (req, res) => {
    let appointmentobj=req.body
    // let obj= await loginus.findOne({username:`${appointmentobj.username}`})
    // obj["myappointment"].push(appointmentobj)
    // loginus.updateOne({username:`${appointmentobj.username}`},{$set:{myappointment:obj["myappointment"]}})
    appointmentobj={...appointmentobj,doctor:"Not assigned",status:"pending"}
    await loginus.findOneAndUpdate({username:`${appointmentobj.username}`},{
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
    const details=new appointmentadd(appointmentobj)
    await details.save()
    res.send(appointmentobj)
})


//getting appointment
appointmentapi.get("/appointments/:username",async (req,res)=>{
    const name=req.params.username
    let result=await loginus.findOne({username:`${name}`})
    res.send(result.myappointment)
})


module.exports = {appointmentapi}