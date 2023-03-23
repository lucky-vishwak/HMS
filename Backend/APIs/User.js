const express=require('express')
const userapi=express.Router()
const mongoose=require('mongoose')
const appointmentschema=require("./Appointment").appointmentschema

const loginus=require("../server").loginus
const loginad=require("../server").loginad




userapi.use(express.json())
//establish connection between schema and collection


userapi.post('/register', async(req, res) => {
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
    var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
    var regName = /^[a-zA-Z\ ]+$/
    var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    var us = req.body;
    const adminobj=await loginad.findOne({username:us.username})
    const userobj=await loginus.findOne({username:us.username})
    if(adminobj!=null || userobj!=null){
       res.send({message:`${us.username} already existed`})

       return
    }
    var username = us.username;
    if (username.length < 6) {
        res.send({ message: 'username should be minimum 6 characters' })
        return
    }
    var phonenumber = us.phonenumber;
    if (!phonenumber.match(regPhone)) {
        res.send({ message: 'phone number should consist of 10 digits' })
        return
    }
    
    var email = us.email;
    if (!email.match(regEmail)) {
        res.send({ message: 'Email format is worng' })
        return
    }
   
    var pass = us.password;
    if (!pass.match(regpass)) {
        res.send({ message: 'password should conttain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character' })
        return
    }
    
  
   
    x = true
    for (const i in us) {
        if (us[i] == '') {
            res.send({ message: `${i} is not filled` })
            x = false
        }
    }
    if (x == true) {
        
        await loginus.create(us)
        res.send({ message: "registration successful" })
    }
})

module.exports={userapi}