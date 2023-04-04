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
    user1:{
        type:String
    },
    user2:{
        type2:String
    },
    messages:[MessageSchema]
}

const ConversationModel=new mongoose.model("coversation",ConversationSchmea);


module.exports={ConversationModel,MessageModel};