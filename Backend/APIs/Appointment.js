const express=require("express")
const appointmentapi=express.Router()
const mongoose=require("mongoose")
appointmentapi.post("/addappointment",(req,res)=>{
    res.send({message:"hello"})
})




module.exports={appointmentapi}