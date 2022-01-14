import express from "express";
import { Model } from "mongoose";
import { IUserModel } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginRoute=express.Router();
const User:Model<IUserModel>=require("../models/User");

loginRoute.post("/",async(req,res,next)=>{
  try{
    const reqUser:{email:string,password:string}=req.body;
    const userExists=await User.exists({email:reqUser.email});
    if(!userExists) { res.status(401).json({"msg":"Incorrect email"}); return; }
    const dbUser=await User.findOne({email:reqUser.email});
    const correct=dbUser&&await bcrypt.compare(reqUser.password,dbUser.password);
    if(!correct) { res.status(401).json({"msg":"Incorrect password"}); return; }
    const token=await jwt.sign(JSON.stringify({email:reqUser.email,id:dbUser&&dbUser._id}),process.env.SECRET?process.env.SECRET:"key");
    res.cookie("UserToken",token,{maxAge:24 * 60 * 60 * 1000});
    res.status(202).json({token,userToken:{email:reqUser.email,id:dbUser&&dbUser._id}});
  }
  catch(e){
    next(e);
  }
});

module.exports=loginRoute;