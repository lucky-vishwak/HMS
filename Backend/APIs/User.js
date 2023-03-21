const express=require('express')
const userapi=express.Router()
const mongoose=require('mongoose')
let loginobj=
    {
<<<<<<< HEAD
        firstname:{type:String},lastname:{type:String},username:{type:String},phonenumber:{type:Number},email:{type:String},password:{type:String},confirmpassword:{type:String},address:{type:String},city:{type:String},pincode:{type:Number},state:{type:String},gender:{type:String},
        date:{type:String}
=======
        firstname:{type:String},
        lastname:{type:String},
        username:{type:String},
        phonenumber:{type:Number},
        email:{type:String},
        password:{type:String},
        confirmpassword:{type:String},
        address:{type:String},
        city:{type:String},
        pincode:{type:Number},
        state:{type:String},
        gender:{type:String}
>>>>>>> ba11b99207ace6a11a7be248f096d1302cd5a50e
    } 

 let logad={
    username:{type:String},password:{
        type:String
    }
 }

userapi.use(express.json())
//establish connection between schema and collection
const loginus=mongoose.model('user',loginobj)
const loginad=mongoose.model('admin',logad)

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
    var fName = us.firstname;
    if (!fName.match(regName)) {
        res.send({ message: 'First name shouldnt contain numbers' })
        return
    }
    else if (fName.length < 4) {
        res.send({ message: 'first name should have minimum 4 characters' })
        return
    }
    var lName = us.lastname;
    if (lName.length < 4) {
        res.send({ message: 'first name should have minimum 4 characters' })
        return
    }
    else if (!lName.match(regName)) {
        res.send({ message: 'First name shouldnt contain numbers' })
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
        res.send({ message: 'password should confirmpasswordtain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character' })
        return
    }
    
    var conpass = us.confirmpassword;
    if (pass != conpass || conpass == "") {
        res.send({ message: 'password and confirm  password are not same' })
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


module.exports={userapi,loginus,loginad}