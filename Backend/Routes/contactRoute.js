const express=require('express');
const contactRoute=express.Router();
//import express async-handler
const errorHandler=require('express-async-handler')
contactRoute.use(express.json());

const contactController=require('./../Controllers/contactController');


contactRoute.post('/add-contact',errorHandler(contactController.contactAdd));

contactRoute.get("/all-contact",errorHandler(contactController.contactAll));

module.exports={contactRoute};