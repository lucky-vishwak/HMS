const mongoose=require('mongoose')

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
    },
    reason:{
        type:String
    } 
}

const appointmentHelperModel=mongoose.model('appointmentHelper',appointmentHelperSchema);

module.exports={appointmentHelperModel};