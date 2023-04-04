const express=require('express')
const hospitalRoute=express.Router()
const mongoose=require('mongoose');
//import express async-handler
const errorHandler=require('express-async-handler')
const hospitalController=require('./../Controllers/hospitalController');

hospitalRoute.use(express.json());

hospitalRoute.post('/add-hospital',errorHandler(hospitalController.addHospital));

hospitalRoute.get('/all-hospitals',errorHandler(hospitalController.allHospitals));

hospitalRoute.put("/assign-doctor/:hospitalName",errorHandler(hospitalController.assignDoctorToAppointments));

module.exports={hospitalRoute};