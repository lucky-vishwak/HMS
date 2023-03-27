const mongoose=require('mongoose')

const contactSchema={
    username:{
        type:String
    },
    email:{
        type:String
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
}

const contactModel=mongoose.model('contact',contactSchema);

module.exports={contactModel}

