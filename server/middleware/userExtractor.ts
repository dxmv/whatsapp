import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types";

const userExtractor=async(req:CustomRequest,res:Response,next:NextFunction)=>{
  const token=req.cookies.UserToken;
  if(token){
    const user:any=await jwt.verify(token,process.env.SECRET?process.env.SECRET:"key");
    const newUser:{email:string,id:string}=user;
    req.user=newUser;
  }
  next();
};

module.exports=userExtractor;