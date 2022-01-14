import mongoose from "mongoose";
import { IUserModel } from "../types";

const schema=new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
    maxlength:50,
  },
  email:{
    type:String,
    required:true,
    maxlength:50,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  friends:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  ],
  chats:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Chat",
    }
  ]
});

module.exports=mongoose.model<IUserModel>("User",schema);