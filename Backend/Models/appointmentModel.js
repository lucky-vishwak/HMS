//impoting mongoose
const mongoose=require('mongoose')


//declaring appointment schema
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
        default:"pending",
        require: true
    },
    hospitalName: {
        type: String,
        require: true
    }
}

//importing models
const appointmentModel=mongoose.model('appointment',appointmentSchema);

module.exports={appointmentModel,appointmentSchema}