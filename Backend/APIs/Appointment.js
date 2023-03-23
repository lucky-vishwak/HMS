const express = require("express")
const appointmentapi = express.Router()
const mongoose = require("mongoose")

// const loginus=require("./User").loginus
appointmentapi.use(express.json())
const appointmentadd=require("../server")





// async function adding_appo_to_user(username,appointmentobj){
    
// }
//adding appointment
// const appointmentadd=mongoose.model("appointment",appointmentschema)

appointmentapi.post("/addappointment", async (req, res) => {
    let appointmentobj=req.body
    const usern=appointmentobj.username
    appointmentobj={...appointmentobj,doctor:"Not assigned",status:"pending"}
    const details=new appointmentadd(appointmentobj)

    await loginus.update({username:`${username}`}, {$push: {myappointment:appointmentobj}});
    await details.save()

    res.send(appointmentobj)
})


//getting appointment
appointmentapi.get("/appointments/:username",async (req,res)=>{
    const name=req.params.username
    let result=await appointmentadd.find({username:`${name}`})
    res.send(result)
})




module.exports = { appointmentapi}