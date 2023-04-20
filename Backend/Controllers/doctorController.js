//importing doctor model
const doctorModel = require('./../Models/doctorModel').doctorModel;
const userModel = require('./../Models/userModel').userModel;
const masterAdminModel = require('./../Models/adminModel').masterAdminModel;
const appointmentModel = require('./../Models/appointmentModel').appointmentModel;
const bcryptjs = require('bcryptjs')


// adding doctor to doctor collection
async function addDoctor(req, res) {

    let doctorObj = req.body;
    let doctors = await doctorModel.find({ username: `${doctorObj.username}` })
    let users = await userModel.find({ username: `${doctorObj.username}` })
    let admins = await masterAdminModel.find({ username: `${doctorObj.username}` })

    if (doctors.length == 0 && users.length == 0 && admins.length == 0) {
        let hashedPassword = await bcryptjs.hash(doctorObj.password, 7);
        doctorObj.password = hashedPassword
        await doctorModel.create(doctorObj);
        res.send({ message: "Doctor added successfully" });
    }
    else {
        res.send({ message: `${doctorObj.username} username already exist` });
    }
}

//add dummy doctor
async function addDoctorDummy(req, res) {
    let doctorObj = req.body;
    await doctorModel.create(doctorObj);
    res.send({ message: "Doctor added successfully" });

}

//retriving all doctors based on hospitals
async function allDoctors(req, res) {
    let hospitalObj = req.body;
    let doctors = await doctorModel.find({ hospitalName: hospitalObj.name });
    res.send({ message: "Successfully retrived", doctorObj: doctors });

}

async function updatedDoctorObj(req, res) {
    let username = req.params.username;
    let updatedDoctorObj = req.body;
    let filter = { username: username }
    await doctorModel.updateOne(filter, { $set: { phonenumber: updatedDoctorObj['phonenumber'], email: updatedDoctorObj['email'], about: updatedDoctorObj['about'], fullname: updatedDoctorObj['fullname'], image: updatedDoctorObj['image'] } });
    res.send({ message: "changes successfully done", updateddoctorobj: updatedDoctorObj });

}

//total doctors for master admin
async function totaldoctors(req, res) {
    let doctors = await doctorModel.find({})
    res.send({ message: "success", doctorObj: doctors })
}

async function rateDoctor(req, res) {
    var obj = req.body
    obj.rating[obj.ratingIndex] += 1
    let s = 0, p = 0
    for (let i = 0; i < 5; i++) {
        s += obj.rating[i] * (i + 1)
        p += obj.rating[i]
    }
    s = parseFloat(s / p)
    await doctorModel.updateOne({ username: obj.username }, { $set: { rating: obj.rating, rating_avg: s } })
    await appointmentModel.updateOne({ _id: obj.appoid }, { $set: { rating: obj.ratingIndex } })
    await userModel.updateOne({ "myappointment.id": obj.appoid }, { $set: { 'myappointment.$.rating': obj.ratingIndex } })
    res.send({ message: "successfull", rating: obj.rating })
}

module.exports = { addDoctor, allDoctors, updatedDoctorObj, totaldoctors, addDoctorDummy, rateDoctor }