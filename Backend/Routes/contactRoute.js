const express=require('express');
const contactRoute=express.Router();

contactRoute.use(express.json());

const contactController=require('./../Controllers/contactController');


contactRoute.post('/add-contact',contactController.contactAdd);

contactRoute.get("/all-contact",contactController.contactAll);

module.exports={contactRoute};