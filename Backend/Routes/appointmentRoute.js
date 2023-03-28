//importing express route
const express = require("express")
const appointmentRoute = express.Router()

//middleware
appointmentRoute.use(express.json())

//importing controller
const appointmentController=require("./../Controllers/appointmentController");


appointmentRoute.post("/add-appointment",appointmentController.addappointment)
//addappointment req
appointmentRoute.post("/addappointment",appointmentController.addappointment)
//getting appointment
appointmentRoute.get("/appointments/:username",appointmentController.getappointment)
//appointment based on hospital
appointmentRoute.post("/hospitalAppointments",appointmentController.hospitalappointment)
//all appointments under particular hospital
appointmentRoute.post("/all-appointments",appointmentController.allAppointments);
//all complelted appointments under specific hospitails
appointmentRoute.post("/completed-appointments",appointmentController.completedAppointments);
//all cancelled appointments under specific hospitails
appointmentRoute.post("/cancelled-appointments",appointmentController.cancelledAppointments);
//today appointment for doctor
appointmentRoute.post("/get-today",appointmentController.gettoday)



module.exports = {appointmentRoute}