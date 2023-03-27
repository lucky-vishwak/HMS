//import mongoose
const mongoose=require('mongoose')

//declaring admin schema
const masterAdminSchema={
    username: { 
        type: String 
    },
    password: {
        type: String
    }
}

//creating model for admin
const masterAdminModel=mongoose.model('admin',masterAdminSchema);


module.exports={masterAdminModel}