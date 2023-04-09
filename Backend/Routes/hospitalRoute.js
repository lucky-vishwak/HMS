const express=require('express')
const hospitalRoute=express.Router()
const mongoose=require('mongoose');
const verifyToken=require('../Middleware/verifyToken')
//import express async-handler
const errorHandler=require('express-async-handler')
const hospitalController=require('./../Controllers/hospitalController');

hospitalRoute.use(express.json());

hospitalRoute.post('/add-hospital',verifyToken,errorHandler(hospitalController.addHospital));

hospitalRoute.post('/emergency',verifyToken,errorHandler(hospitalController.emergency));

hospitalRoute.get('/all-hospitals',verifyToken,errorHandler(hospitalController.allHospitals));
 
hospitalRoute.post('/hospital-emergency',verifyToken,errorHandler(hospitalController.emehospital));


hospitalRoute.put("/assign-doctor/:hospitalName",verifyToken,errorHandler(hospitalController.assignDoctorToAppointments));

module.exports={hospitalRoute};