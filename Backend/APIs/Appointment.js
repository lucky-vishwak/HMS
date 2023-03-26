const express = require("express")
const appointmentApi = express.Router()
const mongoose = require("mongoose")

appointmentApi.use(express.json())

//adding appointment
const appointmentModel=require("../schema").appointmentModel
const userModel=require("../schema").userModel


// appointmentApi.post('/add-appointment',async(req,res)=>{
//     let appointmentObj=req.body;

//     await appointmentModel.create(appointmentObj);
    
//     res.send({message:"Successfully added"});
// })


appointmentApi.post("/addappointment", async (req, res) => {
    let appointmentobj=req.body

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

appointmentApi.post("/hospitalAppointments",async (req,res)=>{

    let hospitalObj=req.body;

    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name}).sort([['appointmentdate', 1], ['timeslot', 1]]);

    const [assignedAppointments, notAssignedAppointments] = appointments.reduce(([assigned, notAssigned], appointmentObj) => ((appointmentObj.doctor!="Not assigned") ? [[...assigned, appointmentObj], notAssigned] : [assigned, [...notAssigned, appointmentObj]]), [[], []]);

    res.send({message:"Success",assignedAppointments:assignedAppointments,notAssignedAppointments:notAssignedAppointments})

})

appointmentApi.post("/all-appointments",async (req,res)=>{

    let hospitalObj=req.body;
    //console.log(hospitalObj);

    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name});

    res.send({message:"Success",appointments:appointments});
})

appointmentApi.post("/completed-appointments",async (req,res)=>{

    let hospitalObj=req.body;
    //console.log(hospitalObj);

    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name,status:'completed'});

    res.send({message:"Success",appointments:appointments});
})

appointmentApi.post("/cancelled-appointments",async (req,res)=>{

    let hospitalObj=req.body;
    //console.log(hospitalObj);

    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name,status:'cancelled'});

    res.send({message:"Success",appointments:appointments});
})



module.exports = {appointmentApi}