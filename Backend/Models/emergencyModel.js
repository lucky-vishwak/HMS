const mongoose=require('mongoose')

const emergencySchema={

appointmentdate:{
  type:String,
},
patientname: {
    type:String, 
},
specialization:{
    type:String,

} , 
prescription: {
    type: Object,
    'default': {
        'temperature': '',
        'description': "",
        'BP': ""
    }
},
doctor:{
    type:String,
   

},
status:{
    type: String,
    default: "pending",
    enum: {
        values: ["pending", "completed"]
    },
},
hospitalName:{
    type:String,
   
},
timeslot: {
    type:String,
   
},
id:{
    type:String,
}
}
const emergencyModel=mongoose.model('emergency',emergencySchema)
module.exports={emergencyModel,emergencySchema}