const express=require('express')
const userapi=express.Router()

userapi.post('/register', (req, res) => {
    user = {}
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
    var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
    var regName = /^[a-zA-Z\ ]+$/
    var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    var us = req.body;
    console.log(us)
    var fName = us.firstname;
    if (!fName.match(regName)) {
        res.send({ message: 'First name shouldnt contain numbers' })
        return
    }
    else if (fName.length < 4) {
        res.send({ message: 'first name should have minimum 4 characters' })
        return
    }
    else {
        user.firstname = fName
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
    else {
        user.lastname = lName
    }
    var username = us.username;
    if (username.length < 6) {
        res.send({ message: 'username should be minimum 6 characters' })
        return
    }
    else {
        user.username = username
    }
    ///////////////////////////////////////////////////////////
    var phonenumber = us.phonenumber;
    if (!phonenumber.match(regPhone)) {
        res.send({ message: 'phone number should consist of 10 digits' })
        return
    }
    else {
        user.phonenumber = phonenumber
    }
    var email = us.email;
    if (!email.match(regEmail)) {
        res.send({ message: 'Email format is worng' })
        return
    }
    else {
        user.email = email
    }
    var pass = us.password;
    if (!pass.match(regpass)) {
        res.send({ message: 'password should confirmpasswordtain Atleast one digit,Atleast one lowercase character Atleast one uppercase character Atleast one special character' })
        return
    }
    else {
        user.password = pass
    }
    var conpass = us.confirmpassword;
    if (pass != conpass || conpass == "") {
        res.send({ message: 'password and confirm  password are not same' })
        return

    }
    else {
        user.confirmpassword = conpass
    }
    x = true
    for (const i in us) {
        if (us[i] == '') {
            res.send({ message: `${i} is not filled` })
            x = false
        }
    }
    if (x == true) {
        res.send({ message: "registration successful" })
    }
})


module.exports=userapi