const express=require("express");
const doctorRoute=express.Router();
const doctorController=require('./../Controllers/doctorController');

const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')
doctorRoute.use(express.json());

doctorRoute.post("/add-doctor",verifyToken,errorHandler(doctorController.addDoctor));

doctorRoute.post('/all-doctors',verifyToken,errorHandler(doctorController.allDoctors));

doctorRoute.put('/updateProfile/:username',verifyToken,errorHandler(doctorController.updatedDoctorObj));

doctorRoute.get('/total-doctors',verifyToken,doctorController.totaldoctors);


doctorRoute.post('/add-dummy',verifyToken,doctorController.addDoctorDummy);

module.exports={doctorRoute}