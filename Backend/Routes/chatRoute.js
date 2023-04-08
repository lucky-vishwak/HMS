const express = require("express")
const chatRoute = express.Router()
const chatController=require('./../Controllers/chatController');

chatRoute.use(express.json())

chatRoute.post('/add-conversation',chatController.createConversation);

chatRoute.post('/send-message',chatController.sendMessage);

chatRoute.post('/send-message-doctor',chatController.sendMessageByDoctor);

chatRoute.post('/get-chat',chatController.getConversationParticularUser);

chatRoute.post('/get-chat-doctor',chatController.getConversationParticularDoctor);

module.exports={chatRoute}