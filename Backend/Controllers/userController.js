//import Models
const masterAdminModel=require('../Models/adminModel.js').masterAdminModel
const userModel=require('../Models/userModel.js').userModel
const hospitalModel=require('../Models/hospitalModel.js').hospitalModel

//import bcrypt
const bcryptjs=require('bcryptjs')
const { appointmentHelperModel } = require('../Models/appointmenthelperModel.js')
const { appointmentModel } = require('../Models/appointmentModel.js')

//import multer
const upload=require('../Controllers/multer').upload

//register
async function register(req,res){

        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
        var regPhone = /^\d{10}$/;                                         //Javascript reGex for Phone Number validation.
        var regName = /^[a-zA-Z\ ]+$/
        var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
        let us=req.body;
        const adminobj=await masterAdminModel.findOne({username:us.username})
        const userobj=await userModel.findOne({username:us.username})
        const hospitalObj=await hospitalModel.findOne({username:us.username})
    
        if(adminobj!=null || userobj!=null || hospitalObj!=null){
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
        // us={...us,myappointment:[]}
        for (const i in us) {
            if (us[i] == '' && i!="myappointment") {
                console.log(i,us[i],1)
                res.send({ message: `${i} is not filled` })
                x = false
            }
            
        }
      
        if (x == true) {
            hashedPassword= await bcryptjs.hash(us.password,7)
            us.password=hashedPassword
         
            await userModel.create(us)
            res.send({ message: "registration successful" })
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

//to accept the appointments
async function accepetAppointment(req,res){
    
    let appointmentAssignObj=req.body;
    //console.log(appointmentAssignObj);

    await userModel.updateOne({"myappointment.id":appointmentAssignObj.id.toString()},{$set:{"myappointment.$.status":"accepted"}});

    await appointmentModel.updateOne({_id:appointmentAssignObj.id},{$set:{status:"accepted"}});

    res.send({message:"Appointment Accepted Successfully!!!"});
}

//to cancel appointments

async function cancelAppointment(req,res){

    let appointmentAssignObj=req.body;

    await userModel.findOneAndUpdate({username:appointmentAssignObj.username},{"$pull":{"myappointment":{id:appointmentAssignObj.id}}},{ safe: true, multi: false });

    await appointmentModel.updateOne({_id:appointmentAssignObj.id},{$set:{status:"cancelled",doctor:"Not Assigned"}})
     
    await appointmentHelperModel.deleteOne({hospitalName: appointmentAssignObj.hospitalName, doctor: appointmentAssignObj.doctor, appointmentdate: appointmentAssignObj.appointmentdate, timeslot: appointmentAssignObj.timeslot});

    res.send({message:"Appointment Successfully cancelled"});

}

module.exports={register,updateDetails,allusers,accepetAppointment,cancelAppointment};
