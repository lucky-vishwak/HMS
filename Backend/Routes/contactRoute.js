const express=require('express');
const contactRoute=express.Router();
//import express async-handler
const errorHandler=require('express-async-handler')
const verifyToken=require('../Middleware/verifyToken')
contactRoute.use(express.json());

const contactController=require('./../Controllers/contactController');


contactRoute.post('/add-contact',verifyToken,errorHandler(contactController.contactAdd));

contactRoute.get("/all-contact",verifyToken,errorHandler(contactController.contactAll));

module.exports={contactRoute};