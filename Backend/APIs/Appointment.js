const express = require("express")
const appointmentapi = express.Router()
const mongoose = require("mongoose")

appointmentapi.use(express.json())

let appointment_helper={
    specialization: {
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    timeslot: {
        type:String,
        required:true
    },
    doctor:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    }
}

let appointmentschema = {
    patientname: { 
        type: String, 
        required:true
    },
    phonenumber: { 
        type: Number,
        required:true
    },
    emailaddress: { 
        type: String, 
        required:true
    },
    appointmentdate: {
        type:String,
        required:true
    },
    timeslot: {
        type:String,
        required:true
    },
    specialization: {
        type:String,
        required:true
    },
    emergencyname: {
        type:String,
        required:true
    },
    emergencyphone: { 
        type: Number,
        required:true
    },
    doctor:{
        type:String,
        require:true
    },
    problem:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    }
}

//adding appointment
const appointmentadd=mongoose.model("appointment",appointmentschema)

appointmentapi.post("/addappointment", async (req, res) => {
    let appointmentobj=req.body
    appointmentobj={...appointmentobj,doctor:"Not assigned",status:"pending"}
    const details=new appointmentadd(appointmentobj)
    await details.save()
    res.send(appointmentobj)
})


//getting appointment
appointmentapi.get("/appointments/:username",async (req,res)=>{
    const name=req.params.username
    let result=await appointmentadd.find({username:`${name}`})
    res.send(result)
})




module.exports = { appointmentapi }