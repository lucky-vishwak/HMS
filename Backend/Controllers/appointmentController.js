//importing nodemailer
const nodemailer = require('nodemailer');
//step-1 of nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aarogyaservice@gmail.com',
        pass: 'wcpuhuzpenzbtnty'
    }
});
//importing models
const appointmentModel = require("../Models/appointmentModel").appointmentModel
const userModel = require("../Models/userModel").userModel
const doctorModel=require("../Models/doctorModel").doctorModel


//addappointment controller
async function addappointment(req, res) {
    let appointmentobj = req.body
    // if(appointmentobj.doctor){
    //     const doctorId=await doctorModel.findOne({username:appointmentobj.doctor})
    //     appointmentobj.doctor=doctorId._id
    // }
    const details = new appointmentModel(appointmentobj)
    await userModel.findOneAndUpdate({ username: `${appointmentobj.username}` }, {
        $push: {
            myappointment: {
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
                hospitalName: details.hospitalName,
                id: details._id.toString()
            }
        }
    })
    await details.save();
    res.send(appointmentobj)
}


//getting appointment for specific users
async function getappointment(req, res) {
    const name = req.params.username
    let result = await userModel.findOne({ username: `${name}`}).populate("myappointment.doctor");
    //console.log(result)
    //console.log(result);
    res.send({ message: "Success", appointments: result.myappointment })
}


//to get hospital appointments with sorted by date
async function hospitalappointment(req, res) {
    let hospitalObj = req.body;
    // let assignedAppointments=await appointmentModel.find({ hospitalName: hospitalObj.name })
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name }).sort([['appointmentdate', 1], ['timeslot', 1]]).populate('doctor');

   //console.log(appointments);
    const [assignedAppointments, notAssignedAppointments] =appointments.reduce(([assigned, notAssigned], appointmentObj) => ((appointmentObj.doctor.username != "Not assigned") ? [[...assigned, appointmentObj], notAssigned] : [assigned, [...notAssigned, appointmentObj]]), [[], []]);

    res.send({ message: "Success", assignedAppointments: assignedAppointments, notAssignedAppointments: notAssignedAppointments })
}

//to get all appointments
async function allAppointments(req, res) {
    let hospitalObj = req.body;
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name }).populate('doctor');
    res.send({ message: "Success", appointments: appointments });
}

//completed appointments
async function completedAppointments(req, res) {
    let hospitalObj = req.body;
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name, status: 'completed' }).populate('doctor');
    res.send({ message: "Success", appointments: appointments });
}

//canceled appointments
async function cancelledAppointments(req, res) {
    let hospitalObj = req.body;
    let appointments = await appointmentModel.find({ hospitalName: hospitalObj.name, status: 'cancelled' }).populate('doctor');
    res.send({ message: "Success", appointments: appointments });
}

//get today appointments for doctor
async function gettoday(req, res) {
    const name = req.body.doctorname
    const today = req.body.date
    let objid=await doctorModel.findOne({username:name})
    objid=objid._id.toString()
    let appointments = await appointmentModel.find({ doctor: objid, appointmentdate: today })
    console.log(appointments);
    res.send({ message: "successfully", appointments: appointments })
}

//total appointments for master admin 
async function totalappointent(req, res) {
    let appointments = await appointmentModel.find({});
    res.send({ message: "success", appointments: appointments })
}

async function addApp(req, res) {
    let appointmentobj = req.body
    const details = new appointmentModel(appointmentobj)
    await details.save()
    res.send({ message: "successfully added" });
}

async function updateDoctorAppointment(req, res) {
    let id = req.params.id;
    let updatedAppointment = req.body;
    //step-2 of nodemailer
    var mailOptions = {
        from: 'aarogya@gmail.com',
        to: updatedAppointment["email"],
        subject: 'Prescription From Aarogya',
        html: `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                .background-radial-gradient {
                    background-color: hsl(218, 41%, 15%);
                    background-image: radial-gradient(650px circle at 0% 0%,
                            hsl(218, 41%, 35%) 15%,
                            hsl(218, 41%, 30%) 35%,
                            hsl(218, 41%, 20%) 75%,
                            hsl(218, 41%, 19%) 80%,
                            transparent 100%),
                        radial-gradient(1250px circle at 100% 100%,
                            hsl(218, 41%, 45%) 15%,
                            hsl(218, 41%, 30%) 35%,
                            hsl(218, 41%, 20%) 75%,
                            hsl(218, 41%, 19%) 80%,
                            transparent 100%);
                }
                hr{
                    border: 2px solid;
                }
                th{
                    padding: 30px;
                }
                table{
                    border: 5px solid white;
                }
            </style>
        </head>
        
        <body>
            <section class="background-radial-gradient overflow-hidden" style="display: flex; justify-content: center; padding-left:20%">
                <div style="padding: 10px; color: white;">
                    <b><h3 style="text-align: center; font-size: 50px; margin: 20px; padding-bottom: 5px;">
                        Aarogya
                    </h3></b>
                    <hr>
                    <b><p style="text-align: center; font-size: 20px;">prescription</p></b>
        
                    <table border="2" style="border-collapse: collapse; color: white; margin: auto;">
                        <tr>
                            <th>Patient Name</th>
                            <th>${updatedAppointment["patientname"]}</th>
                        </tr>
                        <tr>
                            <th>description</th>
                            <th>${updatedAppointment["description"]}</th>
                        </tr>
                        <tr> 
                            <th>temperature</th>
                            <th>${updatedAppointment["temperature"]}</th>
                        </tr>
                        <tr>
                            <th>B.P.</th>
                            <th>${updatedAppointment["BP"]}</th>
                        </tr>
                    </table>
                </div>
            </section>
            <!-- MDB -->
        </body>
        
        </html>`
    };
    //send-3 of nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });

    await appointmentModel.updateOne({ _id: id }, { $set: { 'prescription.temperature': updatedAppointment.temperature, 'prescription.description': updatedAppointment.description, 'prescription.BP': updatedAppointment.BP, "status": "completed" } })
    await userModel.updateOne({ "myappointment.id": id }, { $set: { 'myappointment.$.prescription.temperature': updatedAppointment.temperature, 'myappointment.$.prescription.description': updatedAppointment.description, 'myappointment.$.prescription.BP': updatedAppointment.BP, "myappointment.$.status": "completed" } })
    res.send({ message: "response send successfullySuccessfully" });
}

async function showPrescription(req,res){
    var id=req.params.id
    var pres=await appointmentModel.findOne({_id:id})
    res.send({message:"prescription shown",prescription:pres.prescription,patientname:pres.patientname})
        
}


module.exports={addApp,addappointment,cancelledAppointments,completedAppointments,allAppointments,getappointment,hospitalappointment,gettoday,showPrescription,totalappointent,updateDoctorAppointment}
