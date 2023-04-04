//import mongoose
const mongoose=require('mongoose')
const appointmentSchema=require('./../Models/appointmentModel').appointmentSchema
//user schema
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
    },
     image:{
      type:String
    }

}

//creating model
const userModel=mongoose.model('user',userSchema)

module.exports={userModel}