const bcryptjs = require('bcryptjs')

const hospitalModel = require('./../Models/hospitalModel').hospitalModel;
const userModel = require('./../Models/userModel').userModel;
const masterAdminModel = require('./../Models/adminModel').masterAdminModel;
const doctorModel = require('./../Models/doctorModel').doctorModel;
const appointmentHelperModel = require('./../Models/appointmenthelperModel').appointmentHelperModel;
const appointmentModel = require('./../Models/appointmentModel').appointmentModel;
const emergencyS=require('./../Models/emergencyModel')
const rating={5:200,4:180,3:160,2:150,1:150}
async function addHospital(req, res) {

    let hospitalObj = req.body;

    let hospitalname = await hospitalModel.find({ hospitalName: hospitalObj['hospitalName'] })
    let hospitaluser = await hospitalModel.find({ username: hospitalObj['username'] })
    let adminobj = await masterAdminModel.find({ username: hospitalObj['username'] })
    let userobj = await userModel.find({ username: hospitalObj['username'] })

    if (hospitalname.length != 0) {
        res.send({ message: 'Hospital already exist' });
    }
    else if (adminobj.length != 0 || userobj.length != 0 || hospitaluser.length != 0) {
        res.send({ message: "username already exist" });
    }
    else {
        hashedPassword = await bcryptjs.hash(hospitalObj.password, 7)
        hospitalObj.password = hashedPassword
        await hospitalModel.create(hospitalObj);
        res.send({ message: "Hospital added succesfully" });
    }
}

async function allHospitals(req, res) {

    let hospitals = await hospitalModel.find({});
    if (hospitals.length != 0)
        res.send({ message: "Success", hospitalsObj: hospitals });
    else
        res.send({ message: "No Hospital found" });

}

async function getAllDcotors(req,res){
    let doctors=await doctorModel.find({username:{$ne:"Not assigned"}});
    res.send({message: "Success",doctors:doctors});
}

async function assignDoctorToAppointments(req, res) {

    let appointmentAssignObj = req.body;
    let hospitalName = req.params.hospitalName;
    let doctors = await doctorModel.find({ hospitalName: hospitalName, specialization: appointmentAssignObj.specialization }).sort({ rating_avg: -1 });
    //console.log(doctors);

    if (doctors.length == 0) {
        res.send({ message: "No doctor under this specalisation" });
    }
    else {
        for (let i = 0; i < doctors.length; i++) {
            let amount=rating[Math.ceil(doctors[i].rating_avg)]
            let helperObj = await appointmentHelperModel.find({ hospitalName: hospitalName, doctor: doctors[i].username, appointmentdate: appointmentAssignObj.appointmentdate, timeslot: appointmentAssignObj.timeslot });
            if (helperObj.length == 0) {
                await appointmentModel.findOneAndUpdate({ _id: appointmentAssignObj._id }, { $set: { "doctor":doctors[i]['_id'].toString(),amount:amount} });
                let helpObj = {
                    "hospitalName": hospitalName,
                    "reason": appointmentAssignObj.problem,
                    "doctor": doctors[i].username,
                    "appointmentdate": appointmentAssignObj.appointmentdate,
                    "timeslot": appointmentAssignObj.timeslot
                }
                await appointmentHelperModel.create(helpObj);
                await userModel.updateOne({"myappointment.id":appointmentAssignObj._id.toString()},{$set:{'myappointment.$.doctor':doctors[i]['_id'].toString(),'myappointment.$.amount':amount}})
                res.send({ message: `Successfully assigned with ${doctors[i].username}`, succ: "success", doctorName: doctors[i].username });
                return;
            }
        }
        res.send({ message: "No doctor available!!" })
    }
}

async function emehospital(req,res){
    hospitalObj=req.body
    
      var x= await emergencyS.emergencyModel.find({hospitalName: hospitalObj.name})
      res.send({message:"success",appointments:x})
}
async function emergency(req,res){
   let emergencyObj=req.body;
   
   let doctors = await doctorModel.find({specialization: emergencyObj.specialization }).sort({ rating_avg: -1 });
   if (doctors.length != 0) {
    for (let i = 0; i < doctors.length; i++) {
        let amount=rating[Math.ceil(doctors[i].rating_avg)]
        let helperObj = await appointmentHelperModel.find({doctor: doctors[i].username, appointmentdate: emergencyObj.appointmentdate, timeslot: emergencyObj.timeslot });
        if (helperObj.length == 0) {
            
       //await emergencyModel.findOneAndUpdate({ _id: appointmentAssignObj._id }, { $set: { "doctor":doctors[i]['_id'].toString(),amount:amount} });
            let s=await emergencyS.emergencyModel.find({"appointmentdate":emergencyObj.appointmentdate, "timeslot": emergencyObj.timeslot,specialization:emergencyObj.specialization})
            
            if(s.length==0){
                let helpObj = {
                    "hospitalName": doctors[i].hospitalName,
                    "doctor": doctors[i].username,
                    "appointmentdate": emergencyObj.appointmentdate,
                    "timeslot": emergencyObj.timeslot
                }
                var emeObj={...helpObj,"specialization":emergencyObj.specialization,"patientname":emergencyObj.patientname}
                var emergencyM= new emergencyS.emergencyModel(emeObj)
                await emergencyM.save()
             
                await appointmentHelperModel.create(helpObj);
                
                await userModel.findOneAndUpdate({ _id: emergencyObj._id}, {
                    $push: {
                        emergency: {
                            hospitalName: doctors[i].hospitalName,
                            doctor: doctors[i].username,
                            appointmentdate: emergencyObj.appointmentdate,
                            timeslot: emergencyObj.timeslot,
                            specialization:emergencyObj.specialization,
                            patientname:emergencyObj.patientname,
                            id: emergencyM._id.toString()
                        }
                    }
                })
               
               res.send({ message: `Successfully assigned with ${doctors[i].username}`, succ: "success", doctorName: doctors[i].username ,hospitalName:doctors[i].hospitalName,emergency:emeObj});
                return;
            }
          
        }
    }
    
    }
    let doctorsww = await doctorModel.find({specialization: 'generalPhysician'}).sort({ rating_avg: -1 });
    if (doctorsww.length != 0) {
        for (let i = 0; i < doctorsww.length; i++) {
            let amount=rating[Math.ceil(doctorsww[i].rating_avg)]
            let helperObj = await appointmentHelperModel.find({doctor: doctorsww[i].username, appointmentdate: emergencyObj.appointmentdate, timeslot: emergencyObj.timeslot });
            if (helperObj.length == 0) {
           //await emergencyModel.findOneAndUpdate({ _id: appointmentAssignObj._id }, { $set: { "doctor":doctors[i]['_id'].toString(),amount:amount} });
           let s=await emergencyS.emergencyModel.find({"appointmentdate":emergencyObj.appointmentdate, "timeslot": emergencyObj.timeslot,specialization: 'generalPhysician'})
           if(s.length==0){   
           let helpObj = {
                    "hospitalName": doctorsww[i].hospitalName,
                    "doctor": doctorsww[i].username,
                    "appointmentdate": emergencyObj.appointmentdate,
                    "timeslot": emergencyObj.timeslot
                }
                var emeObj={...helpObj,"specialization":"generalPhysician","patientname":emergencyObj.patientname}
                var emergencyM= new emergencyS.emergencyModel(emeObj)
                await emergencyM.save()
           
             await userModel.findOneAndUpdate({ _id: emergencyObj._id}, {
                $push: {
                    emergency: {
                        hospitalName: doctors[i].hospitalName,
                        doctor: doctors[i].username,
                        appointmentdate: emergencyObj.appointmentdate,
                        timeslot: emergencyObj.timeslot,
                        specialization:"generalPhysician",
                        patientname:emergencyObj.patientname,
                        id: emergencyM._id.toString()
                    }
                }
            }) 
             res.send({ message: `Successfully assigned with ${doctors[i].username} general physician`, succ: "success", doctorName: doctors[i].username ,hospitalName:doctors[i].hospitalName,emergency:emeObj});
                return;
            }
        }}
        
        }
    res.send({message:"no doctor available"})
}

module.exports = { addHospital, allHospitals, assignDoctorToAppointments,emergency,emehospital}
