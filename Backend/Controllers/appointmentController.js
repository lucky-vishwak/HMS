//importing models
const appointmentModel=require("../Models/appointmentModel").appointmentModel
const userModel=require("../Models/userModel").userModel


//addappointment controller
async function addappointment(req,res){
    let appointmentobj=req.body
    const details=new appointmentModel(appointmentobj)
    await userModel.findOneAndUpdate({username:`${appointmentobj.username}`},{
        $push:{
            myappointment:{
                  patientname: details.patientname,
                  phonenumber: details.phonenumber,
                  emailaddress: details.emailaddress,
                  appointmentdate: details.appointmentdate,
                  timeslot: details.timeslot,
                  specialization: details.specialization,
                  emergencyname: details.emergencyname,
                  emergencyphone: details.emergencyphone,
                  doctor: details.doctor,
                  problem: details.problem,
                  username: details.username,
                  status: details.status,
                  hospitalName:details.hospitalName,
                  id:details._id.toString()
            }
        }
    })
    await details.save()
    res.send(appointmentobj)
}


//getting appointment for specific users
async function getappointment(req,res){
    const name=req.params.username
    let result=await userModel.findOne({username:`${name}`});
    console.log(result);
    res.send({message:"Success",appointments:result.myappointment})
}


//to get hospital appointments with sorted by date
async function hospitalappointment(req,res){
    let hospitalObj=req.body;
    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name}).sort([['appointmentdate', 1], ['timeslot', 1]]);
    const [assignedAppointments, notAssignedAppointments] = appointments.reduce(([assigned, notAssigned], appointmentObj) => ((appointmentObj.doctor!="Not assigned") ? [[...assigned, appointmentObj], notAssigned] : [assigned, [...notAssigned, appointmentObj]]), [[], []]);
    res.send({message:"Success",assignedAppointments:assignedAppointments,notAssignedAppointments:notAssignedAppointments})
}

//to get all appointments
async function allAppointments(req,res){
    let hospitalObj=req.body;
    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name});
    res.send({message:"Success",appointments:appointments});
}

//completed appointments
async function completedAppointments(req,res){
    let hospitalObj=req.body;    
    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name,status:'completed'});
    res.send({message:"Success",appointments:appointments});
}

//canceled appointments
async function cancelledAppointments(req,res){
    let hospitalObj=req.body;
    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name,status:'cancelled'});
    res.send({message:"Success",appointments:appointments});
}

//get today appointments for doctor
async function gettoday(req,res){
    const name=req.body.doctorname
    const today=req.body.date
    let appointments=await appointmentModel.find({doctor:name,appointmentdate:today})
   
    res.send({message:"successfully",appointments:appointments})
}

async function addApp(req,res){
    let appointmentobj=req.body
    const details=new appointmentModel(appointmentobj)
    await details.save()
    res.send({message:"successfully added"});
}

async function updateDoctorAppointment(req,res){
    let id=req.params.id;
    let updatedAppointment=req.body;
   
    await appointmentModel.updateOne({_id:id},{$set:{'prescription.temperature':updatedAppointment.temperature,'prescription.description':updatedAppointment.description,'prescription.BP':updatedAppointment.BP,"status":"completed"}})
    await userModel.updateOne({"myappointment.id":id},{$set:{'myappointment.$.prescription.temperature':updatedAppointment.temperature,'myappointment.$.prescription.description':updatedAppointment.description,'myappointment.$.prescription.BP':updatedAppointment.BP,"myappointment.$.status":"completed"}})
    res.send({message:"response send successfullySuccessfully"});
}

module.exports={addApp,addappointment,cancelledAppointments,completedAppointments,
    allAppointments,getappointment,hospitalappointment,gettoday,updateDoctorAppointment}