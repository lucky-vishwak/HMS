const mongoose=require('mongoose');
const { doctorModel } = require('./doctorModel');
const userModel=require('./userModel').userModel

const MessageSchema=new mongoose.Schema({
    sender_id:{
        type:String
    },
    message:{
        type:String
    },
},{timestamps: true })

const ConversationSchmea={
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:doctorModel
    },
    messages:[MessageSchema]
}

const ConversationModel=new mongoose.model("conversation",ConversationSchmea);

module.exports={ConversationModel};