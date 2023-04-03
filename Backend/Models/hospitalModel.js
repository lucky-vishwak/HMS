const mongoose=require('mongoose')

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
    //add field array of ref appointments
}

const hospitalModel=mongoose.model('hospital',hospitalSchema);


module.exports={hospitalModel};