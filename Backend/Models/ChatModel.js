const mongoose=require('mongoose');

const MessageSchema={
    sender_id:{
        type:String
    },
    message:{
        type:String
    }
}

const ConversationSchmea={
    user:{
        type:String
    },
    doctor:{
        type:String
    },
    messages:[MessageSchema]
}

const ConversationModel=new mongoose.model("coversation",ConversationSchmea);

module.exports={ConversationModel};