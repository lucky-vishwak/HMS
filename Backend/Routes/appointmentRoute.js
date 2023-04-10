//importing express route
const express = require("express")
const appointmentRoute = express.Router()
//import express async-handler
const errorHandler=require('express-async-handler')
//middleware
appointmentRoute.use(express.json())


const verifyToken=require('../Middleware/verifyToken')
//importing controller
const appointmentController=require("./../Controllers/appointmentController");


appointmentRoute.post("/add-appointment",verifyToken,errorHandler(appointmentController.addappointment))
//addappointment req
appointmentRoute.post("/addappointment",verifyToken,errorHandler(appointmentController.addappointment))
//getting appointment
appointmentRoute.get("/appointments/:username",verifyToken,errorHandler(appointmentController.getappointment))
//appointment based on hospital
appointmentRoute.post("/hospitalAppointments",verifyToken,appointmentController.hospitalappointment)
//all appointments under particular hospital
appointmentRoute.post("/all-appointments",verifyToken,errorHandler(appointmentController.allAppointments));
//all complelted appointments under specific hospitails
appointmentRoute.post("/completed-appointments",verifyToken,errorHandler(appointmentController.completedAppointments));
//all cancelled appointments under specific hospitails
appointmentRoute.post("/cancelled-appointments",verifyToken,errorHandler(appointmentController.cancelledAppointments));
//today appointment for doctor

//total appointmnets for master admin
appointmentRoute.get("/total-appointments",verifyToken,appointmentController.totalappointent)

appointmentRoute.post("/get-today",verifyToken,errorHandler(appointmentController.gettoday))

//view prescription
appointmentRoute.get('/show_prescription/:id',verifyToken,appointmentController.showPrescription)
//
appointmentRoute.put('/update-appoint/:id',verifyToken,errorHandler(appointmentController.updateDoctorAppointment))

appointmentRoute.put('/updateappoint/:id',verifyToken,errorHandler(appointmentController.updateAppointment))

appointmentRoute.get('/allAppointmentsOfDoctor/:id',verifyToken,appointmentController.allAppointmentsOfDoctor)


module.exports = {appointmentRoute}