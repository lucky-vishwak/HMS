const express=require("express");
const doctorRoute=express.Router();
const doctorController=require('./../Controllers/doctorController');

doctorRoute.use(express.json());

doctorRoute.post("/add-doctor",doctorController.addDoctor);

doctorRoute.post('/all-doctors',doctorController.allDoctors);

doctorRoute.put('/upadteProfile/:username',doctorController.updatedDoctorObj);

module.exports={doctorRoute}