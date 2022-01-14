import { IMessageModel,IChatModel } from "../types"
import { Model } from "mongoose";
import chatController from "./chatController";
const Message:Model<IMessageModel>=require("../models/Message");
const Chat:Model<IChatModel>=require("../models/Chat");

const createMessage=async(message:{text:string,user:string,date:string,chat:string})=>{
  const newMessage=await new Message({...message});
  await newMessage.save();
  const chat=await Chat.findById(message.chat);
  if(chat){
    chat.messages=[...chat.messages,newMessage._id];
    await chat.save();
  }
}

export default {createMessage};