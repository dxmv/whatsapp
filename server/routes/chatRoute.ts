import express from "express";
import chatController from "../controllers/chatController";
import { Request } from "express";
const route=express.Router();

// GET (api/chats) - all chats for a user
route.get("/",async(req:Request,res,next)=>{
  try{
    if(req.user){
      const chats=await chatController.allChats(req.user.id);
      res.status(200).json(chats);
    }
    else{
      res.status(403).json({
        "msg":"You must be logged in"
      })
    }
  }
  catch(e){
    next(e);
  }
});

// GET (api/chats/:id) - get a chat 
route.get("/:id",async(req,res,next)=>{
  try{
    if(req.user){
      const chat=await chatController.getById(req.params.id);
      if(chat){
        res.status(200).json(chat);
      }
      else{
        res.status(404).json({
          "msg":"Invalid ID provided"
        });
      }
    }
    else{
      res.status(403).json({
        "msg":"You must be logged in"
      })
    }
  }
  catch(e){
    next(e);
  }
})


// POST (api/chats) - create a new chat
route.post("/",async(req,res,next)=>{
  try{
    const body:{id:string}=req.body;
    const chat=await chatController.createChat(req.user.id,body.id);
    res.status(202).json(chat);
  }
  catch(e){
    let message=(e as Error).message;
    if(message==="You can't create a chat with yourself"){
      res.status(409).json({
        msg:message
      });
    }
    next(e);
  }
});


// PATCH (api/chats/:id) - add a user to chat

// DELETE (api/chats/:id) - delete a chat
route.delete("/:id",async(req,res,next)=>{
  try{
    if(req.user){
      const chat=await chatController.deleteChat(req.params.id,req.user.id);
      res.status(200).json({
        "msg":"Successfully deleted the chat"
      });
    }
    else{
      res.status(403).json({
        "msg":"You must be logged in"
      })
    }
  }
  catch(e){
    let message=(e as Error).message;
    if(message==="This chat doesn't exist"){
      res.status(404).json({
        msg:message
      });
    }
    else if(message==="You can only delete chats you are in"){
      res.status(403).json({
        msg:message
      })
    }
    next(e);
  }
});




module.exports=route;