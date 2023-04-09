const express=require('express')
const hospitalRoute=express.Router()
const mongoose=require('mongoose');
const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')
const hospitalController=require('./../Controllers/hospitalController');
const expressAsyncHandler = require('express-async-handler');

hospitalRoute.use(express.json());

hospitalRoute.post('/add-hospital',verifyToken,errorHandler(hospitalController.addHospital));

hospitalRoute.get('/all-hospitals',verifyToken,errorHandler(hospitalController.allHospitals));

hospitalRoute.get('/all-doctors',verifyToken,errorHandler(hospitalController.getAllDcotors));

hospitalRoute.put("/assign-doctor/:hospitalName",verifyToken,errorHandler(hospitalController.assignDoctorToAppointments));

module.exports={hospitalRoute};