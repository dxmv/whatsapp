import { IChatModel,IChat,IUserModel, IMessageModel } from "../types"
import { Model } from "mongoose";
const Chat:Model<IChatModel>=require("../models/Chat");
const User:Model<IUserModel>=require("../models/User");
const Message:Model<IMessageModel>=require("../models/Message");

const allChats=async(id:string)=>{
  const chats=await Chat.find({}).populate("users","fullName email").populate("messages","text date user");
  return chats;
}

const createChat=async(id:string,otherId:string)=>{
  if(id===otherId){
    throw new Error("You can't create a chat with yourself")
  }
  const chat:IChat={
    users:[id,otherId],
  }
  const newChat=await new Chat(chat);
  newChat.messages=[];
  await newChat.save();
  newChat.users.forEach(async(userId:string)=>{
    const user=await User.findById(userId);
    if(user){
      user.chats=[...user.chats,newChat._id];
      await user.save();
    }
  });
  return newChat;
}

const getById=async(id:string)=>{
  try{
    return await Chat.findById(id).populate("users","fullName email").populate("messages","text date user");;
  }
  catch{
    return undefined;
  }
};

const deleteChat=async(id:string,userId:string)=>{
  const exists=await Chat.exists({_id:id});
  if(!exists){
    throw new Error(`This chat doesn't exist`);
  }
  const chat=await Chat.findById(id);
  if(!chat?.users.includes(userId)){
    throw new Error("You can only delete chats you are in");
  }
  chat.users.forEach(async(u)=>{
    const user=await User.findById(u);
    if(user){
      const index=user.chats.findIndex(c=>c===chat._id);
      user.chats.splice(index,1);
      await user.save();
    }
  });
  chat.messages.forEach(async(m)=>{
    await Message.findByIdAndDelete(m);
  });
  await Chat.findByIdAndDelete(id);
};

export default {allChats,createChat,getById,deleteChat};