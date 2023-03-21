const { time } = require("console")
const express = require("express")
const appointmentapi = express.Router()
const mongoose = require("mongoose")
const { type } = require("os")

let appointmentschema = {
    patientname: { type: String },
    // guardianname: { type: String },
    // phonenumber: { type: Number },
    // emailaddress: { type: String },
    appointmentdate: { type: Date },
    timeslot: { type: String },
    reason: { type: String },
    emergencyname: { type: String },
    emergencyphone: { type: Number },
    preference:{type:String},
    problem:{type:String},
    username:{type:String}
}

//adding appointment
const appointmentadd=mongoose.model("appointment",appointmentschema)

appointmentapi.post("/addappointment", async (req, res) => {
    const appointmentobj=req.body
    const details=new appointmentadd(appointmentobj)
    await details.save()
    res.send("appointment added successfully")
})


//getting appointment
appointmentapi.get("/appointments/:username",async (req,res)=>{
    const name=req.params.username
    let result=await appointmentadd.find({username:`${name}`})
    res.send(result)
})




module.exports = { appointmentapi }