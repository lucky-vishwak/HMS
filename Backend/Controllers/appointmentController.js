//importing models
const appointmentModel=require("../Models/appointmentModel").appointmentModel
const userModel=require("../Models/userModel").userModel


//addappointment controller
async function addappointment(req,res){
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
}


//getting appointment for specific users
async function getappointment(req,res){
    const name=req.params.username
    let result=await userModel.findOne({username:`${name}`})
    res.send(result.myappointment)
}


//to get all appointments
async function hospitalappointment(req,res){
    let hospitalObj=req.body;
    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name}).sort([['appointmentdate', 1], ['timeslot', 1]]);
    const [assignedAppointments, notAssignedAppointments] = appointments.reduce(([assigned, notAssigned], appointmentObj) => ((appointmentObj.doctor!="Not assigned") ? [[...assigned, appointmentObj], notAssigned] : [assigned, [...notAssigned, appointmentObj]]), [[], []]);
    res.send({message:"Success",assignedAppointments:assignedAppointments,notAssignedAppointments:notAssignedAppointments})
}

async function allAppointments(req,res){

    let hospitalObj=req.body;

    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name});

    res.send({message:"Success",appointments:appointments});
}

async function completedAppointments(req,res){

    let hospitalObj=req.body;
    
    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name,status:'completed'});

    res.send({message:"Success",appointments:appointments});
}

async function cancelledAppointments(req,res){

    let hospitalObj=req.body;

    let appointments=await appointmentModel.find({hospitalName:hospitalObj.name,status:'cancelled'});

    res.send({message:"Success",appointments:appointments});
}

async function addApp(req,res){
    let appointmentobj=req.body
    const details=new appointmentModel(appointmentobj)
    await details.save()
    res.send({message:"successfully added"});
}



module.exports={addApp,addappointment,cancelledAppointments,completedAppointments,allAppointments,getappointment,hospitalappointment}