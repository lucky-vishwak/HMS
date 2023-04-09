const ConversationModel=require('./../Models/ChatModel').ConversationModel;

const format=require("timeago.js").format

async function createConversation(req,res){
    let ConversationObj=req.body;
    
    let Obj=await ConversationModel.findOneAndUpdate({ user :{$in:[ConversationObj.senderId,ConversationObj.reciverId]}},{ doctor :{$in:[ConversationObj.senderId,ConversationObj.reciverId]}});

    if(Obj==null){
        await ConversationModel.create(ConversationObj);
        res.send({message:'created conversation'});
        return
    }
    res.send({message:'Conversation already exist'});
    
}

async function sendMessage(req,res){

    let ConversationObj=req.body;

    await ConversationModel.findOneAndUpdate({user:ConversationObj.senderID,doctor:ConversationObj.doctor}, {
        $push: {
            messages: {
                sender_id:ConversationObj.senderID,
                message:ConversationObj.message
            }
        }
    })

    res.send({message:"Success"});

}

async function sendMessageByDoctor(req,res){

    let ConversationObj=req.body;

    await ConversationModel.findOneAndUpdate({doctor:ConversationObj.senderID,user:ConversationObj.user}, {
        $push: {
            messages: {
                sender_id:ConversationObj.senderID,
                message:ConversationObj.message
            }
        }
    })

    res.send({message:"Success"});

}


async function getConversationParticularUser(req,res){

    let obj=req.body;

    let conversations=await ConversationModel.find({user:obj.user}).populate('doctor');
    res.send({message:"success",conversations:conversations});
}

async function getConversationParticularDoctor(req,res){

    let obj=req.body;

    let conversations=await ConversationModel.find({doctor:obj.doctor}).populate('user');

    res.send({message:"success",conversations:conversations});
}



module.exports={createConversation,sendMessage,getConversationParticularUser,getConversationParticularDoctor,sendMessageByDoctor};