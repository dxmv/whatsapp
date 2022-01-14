import mongoose from "mongoose";
import { IChatModel } from "../types";

const schema=new mongoose.Schema({
  users:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  ],
  messages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Message",
    }
  ],
});

module.exports=mongoose.model<IChatModel>("Chat",schema);