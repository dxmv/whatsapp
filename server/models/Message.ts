import mongoose from "mongoose";
import { IMessageModel } from "../types";

const schema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  text:{
    type:String,
    maxlength:100,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chat",
    required:true
  }
});

module.exports=mongoose.model<IMessageModel>("Message",schema);