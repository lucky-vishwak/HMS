//impoting mongoose
const mongoose = require('mongoose')
const doctorModel=require("./doctorModel").doctorModel

let ObjectId = mongoose.Schema.ObjectId;
//declaring appointment schema
let appointmentSchema = {
    id: {
        type: String
    },
    patientname: {
        type: String,
        required: true,
        minlength:[6,"patient length must be more than 6 characters"],
        validate: {
            validator: (v) => {
                var re = /^[a-zA-Z\ ]+$/;
                return re.test(v)
            },
            message: 'Provided Name is invalid.'
        }
    },
    phonenumber: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => {
                var re = /^\d{10}$/;
                return re.test(v)
            },
            message: 'Provided Phone Number is invalid.'
        }
    },
    emailaddress: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
                return re.test(v)
            },
            message: 'Provided Email is invalid.'
        }
    },
    appointmentdate: {
        type: String,
        default: Date.now(),
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
        required: true,
        minlength:[6,"emergency name length must be more than 6 characters"],
        validate: {
            validator: (v) => {
                var re = /^[a-zA-Z\ ]+$/;
                return re.test(v)
            },
            message: 'Provided Name is invalid.'
        }
    },
    emergencyphone: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => {
                var re = /^\d{10}$/;
                return re.test(v)
            },
            message: 'Provided Phone Number is invalid.'
        }
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:doctorModel,
        default: "642abd443a7befc275f25395",
        require: true
    },
    problem: {
        type: String
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "completed"]
        },
        require: true
    },
    hospitalName: {
        type: String,
        require: true
    },
    prescription: {
        type: Object,
        'default': {
            'temperature': '',
            'description': "",
            'BP': ""
        }
    }
}

//importing models
const appointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = { appointmentModel, appointmentSchema }