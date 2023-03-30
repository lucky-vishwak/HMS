//importing express route
const express = require("express")
const appointmentRoute = express.Router()
//import express async-handler
const errorHandler=require('express-async-handler')
//middleware
appointmentRoute.use(express.json())

//importing controller
const appointmentController=require("./../Controllers/appointmentController");


appointmentRoute.post("/add-appointment",errorHandler(appointmentController.addappointment))
//addappointment req
appointmentRoute.post("/addappointment",errorHandler(appointmentController.addappointment))
//getting appointment
appointmentRoute.get("/appointments/:username",errorHandler(appointmentController.getappointment))
//appointment based on hospital
appointmentRoute.post("/hospitalAppointments",appointmentController.hospitalappointment)
//all appointments under particular hospital
appointmentRoute.post("/all-appointments",errorHandler(appointmentController.allAppointments));
//all complelted appointments under specific hospitails
appointmentRoute.post("/completed-appointments",errorHandler(appointmentController.completedAppointments));
//all cancelled appointments under specific hospitails
appointmentRoute.post("/cancelled-appointments",errorHandler(appointmentController.cancelledAppointments));
//today appointment for doctor
appointmentRoute.post("/get-today",errorHandler(appointmentController.gettoday))

//
appointmentRoute.put('/update-appoint/:id',errorHandler(appointmentController.updateDoctorAppointment))


//view prescription
appointmentRoute.get('/show_prescription/:id',appointmentController.showPrescription)

module.exports = {appointmentRoute}