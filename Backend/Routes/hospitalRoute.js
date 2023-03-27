const express=require('express')
const hospitalRoute=express.Router()
const mongoose=require('mongoose');

const hospitalController=require('./../Controllers/hospitalController');

hospitalRoute.use(express.json());

hospitalRoute.post('/add-hospital',hospitalController.addHospital);

hospitalRoute.get('/all-hospitals',hospitalController.allHospitals);

hospitalRoute.put("/assign-doctor/:hospitalName",hospitalController.assignDoctorToAppointments);

module.exports={hospitalRoute};