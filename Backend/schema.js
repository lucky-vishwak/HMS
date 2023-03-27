//Schemas for HMS
const mongoose=require('mongoose')

const masterAdminSchema = {
    username: { 
        type: String 
    },
    password: {
        type: String
    }
}

const hospitalSchema={
    hospitalName:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
}

const doctorSchema = {
    fullname: { 
        type: String 
    },
    email: {
        type: String 
    },
    phonenumber: {
        type: Number 
    },
    join_date: { 
        type: String 
    },
    join_time: { 
        type: String 
    },
    imgurl:{
        type:String
    },
    gender: { 
        type: String 
    },
    username: { 
        type: String 
    },
    password: { 
        type: String 
    },
    about:{
        type:String
    },
    specialization:{
        type:String
    },
    rating:[{
        type:Number
    }],
    hospitalName:{
        type:String
    }
}

let appointmentHelperSchema = {
    appointmentdate: {
        type: String,
    },
    timeslot: {
        type: String,
    },
    doctor: {
        type: String,
    }
    ,
    hospitalName:{
        type:String
    } 
}

let appointmentSchema = {
    patientname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    emailaddress: {
        type: String,
        required: true
    },
    appointmentdate: {
        type: String,
        required: true
    },
    timeslot: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    emergencyname: {
        type: String,
        required: true
    },
    emergencyphone: {
        type: Number,
        required: true
    },
    doctor: {
        type: String,
        default:"Not assigned",
        require: true
    },
    problem: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum:["pending","completed","canceled"],
        default:"pending",
        require: true
    },
    hospitalName:{
        type:String
    }
}

let userSchema =
{
    myappointment:[appointmentSchema],
    fullname:{ 
        type: String 
    },
    username: { 
        type: String 
    },
    phonenumber: { 
        type: Number 
    },
    email: { 
        type: String 
    },
    password: { 
        type: String 
    },
    date: { 
        type: String 
    },
    city: { 
        type: String 
    },
    pincode: { 
        type: Number 
    },
    state: { 
        type: String 
    },
    gender: { 
        type: String 
    }
}

const masterAdminModel=mongoose.model('admin',masterAdminSchema);
const hospitalModel=mongoose.model('hospital',hospitalSchema);
const doctorModel=mongoose.model('doctor',doctorSchema);
const appointmentHelperModel=mongoose.model('appointmentHelper',appointmentHelperSchema);
const appointmentModel=mongoose.model('appointment',appointmentSchema);
const userModel=mongoose.model('user',userSchema)

module.exports = {masterAdminModel,hospitalModel,doctorModel,appointmentHelperModel,appointmentModel,userModel }