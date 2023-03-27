//importing mongoose model
const mongoose=require("mongoose")


//declaring doctor schema
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
    rating:{
        type:Array,
        'default':[0,0,0,0,0]
    },
    rating_avg:{
        type:Number,
        default:1
    },
    hospitalName:{
        type:String
    }
}

//creating doctorModel
const doctorModel=mongoose.model('doctor',doctorSchema);


//exporting doctorModel
module.exports={doctorModel}