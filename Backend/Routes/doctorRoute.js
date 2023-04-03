const express=require("express");
const doctorRoute=express.Router();
const doctorController=require('./../Controllers/doctorController');
//import express async-handler
const errorHandler=require('express-async-handler')
doctorRoute.use(express.json());

doctorRoute.post("/add-doctor",errorHandler(doctorController.addDoctor));

doctorRoute.post('/all-doctors',errorHandler(doctorController.allDoctors));

doctorRoute.put('/upadteProfile/:username',errorHandler(doctorController.updatedDoctorObj));

doctorRoute.get('/total-doctors',doctorController.totaldoctors);

doctorRoute.put('/upadteProfile/:username',doctorController.updatedDoctorObj);

doctorRoute.post('/add-dummy',doctorController.addDoctorDummy);

module.exports={doctorRoute}