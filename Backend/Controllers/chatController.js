const ConversationModel=require('./../Models/ChatModel').ConversationModel;


async function createConversation(req,res){
    let ConversationObj=req.body;
    
    let Obj=await ConversationModel.findOneAndUpdate({ user1 :{$in:[ConversationObj.senderId,ConversationObj.reciverId]}},{ user2 :{$in:[ConversationObj.senderId,ConversationObj.reciverId]}});

    if(Obj==null){
        await ConversationModel.create(ConversationObj);
        res.send({message:'created conversation'});
        return
    }
    res.send({message:'Conversation already exist'});
    
}

async function sendMessage(req,res){

    let ConversationObj=req.body;
    await ConversationModel.findOneAndUpdate({ user1 :{$in:[ConversationObj.senderId,ConversationObj.reciverId]}},{ user2 :{$in:[ConversationObj.senderId,ConversationObj.reciverId]}}, {
        $push: {
            messages: {
                sender_id:ConversationObj.senderId,
                message:ConversationObj.message
            }
        }
    })

    res.send({message:"Success"});

}

async function getConversationParticularUser(req,res){

    let obj=req.body;

    let conversations=await ConversationModel.find({$or:{user1:obj.userId,user2:obj.userId}});

    res.send({message:"success",conversations:conversations});

}

module.exports={createConversation,sendMessage,getConversationParticularUser};