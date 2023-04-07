const express = require("express")
const chatRoute = express.Router()
const chatController=require('./../Controllers/chatController');

chatRoute.use(express.json())

chatRoute.post('/add-conversation',chatController.createConversation);

chatRoute.post('/send-message',chatController.sendMessage);

chatRoute.post('get-chat',chatController.getConversationParticularUser);

module.exports={chatRoute}