const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://hms:hms@cluster0.dvzgdxk.mongodb.net/hms').then(
    console.log('connected to database')
)

let logad = {
    username: { type: String }, password: {
        type: String
    }
}

let appointment_helper = {
    specialization: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeslot: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
}

let appointmentschema = {
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
        require: true
    }
}

let loginobj =
{
    myappointment:[appointmentschema],
    fullname: { type: String },
    username: { type: String },
    phonenumber: { type: Number },
    email: { type: String },
    password: { type: String },
    date: { type: String },
    city: { type: String },
    pincode: { type: Number },
    state: { type: String },
    gender: { type: String }
}

let doctorSchema = {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    phonenumber: { type: Number },
    join_date: { type: String },
    join_time: { type: String },
    email: { type: String },
    password: { type: String },
    confirmpassword: { type: String },
    gender: { type: String }
}

const loginus = mongoose.model('user', loginobj)
const loginad = mongoose.model('admin', logad)
const appointmentadd = mongoose.model("appointment", appointmentschema)
const doctorModel = mongoose.model('doctor', doctorSchema)

module.exports = { loginus, loginad, appointmentadd, doctorModel }