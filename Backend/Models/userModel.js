//import mongoose
const mongoose=require('mongoose')
const appointmentSchema=require('./../Models/appointmentModel').appointmentSchema
//user schema
let userSchema =
{
    myappointment:[appointmentSchema],
    fullname:{ 
        type: String ,
        minlength:[6,"fullname must be more than 6 characters"],
        validate: {
            validator: (v) => {
                var re = /^[a-zA-Z\ ]+$/;
                return re.test(v)
            },
            message: 'Provided Name is invalid.'
        },
        required:true
    },
    username: { 
        type: String ,
        minlength:[6,"username must be more than 6 characters"],
        validate: {
            validator: (v) => {
                var re = /^[a-zA-Z\ ]+$/;
                return re.test(v)
            },
            message: 'Provided Name is invalid.'
        },
        required:true
    },
    phonenumber: { 
        type: Number ,validate: {
            validator: (v) => {
                var re = /^\d{10}$/;
                return re.test(v)
            },
            message: 'Provided Phone Number is invalid.'
        },
        required:true
    },
    email: { 
        type: String ,
        required:true,
        validate: {
            validator: (v) => {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
                return re.test(v)
            },
            message: 'Email format is worng'
        }
    },
    password: { 
        type: String ,
        required:true
    },
    date: { 
        type: String ,
        required:true
    },
    city: { 
        type: String ,
        required:true
    },
    pincode: { 
        type: Number ,
        required:true
    },
    state: { 
        type: String ,
        required:true
    },
    gender: { 
        type: String ,
        enum:{
            values:["male","female"]
        },
        required:true
    },
     image:{
      type:String,
      required:true
    }

}

//creating model
const userModel=mongoose.model('user',userSchema)

module.exports={userModel,userSchema}