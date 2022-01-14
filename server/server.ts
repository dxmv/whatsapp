require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors";
import { Socket } from "socket.io";
import sendMessage from "./socket/sendMessage";
import joinRoom from "./socket/joinRoom";
import errorHandler from "./middleware/errorHandler";
const app=express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{cors:{origin:"http://localhost:3000"}});
const userExtractor=require("./middleware/userExtractor");

// Routes
const userRouter=require("./routes/userRoute");
const loginRouter=require("./routes/loginRoute");
const chatRouter=require("./routes/chatRoute");

// Extending the Request
declare global {
  namespace Express {
    interface Request {
      user:{
        email:string,
        id:string
      }
    }
  }
}

// Connect to mongoose server
mongoose.connect(process.env.MONGO_URL?process.env.MONGO_URL:"");

// Parsing the body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,
}));

// For cookies
app.use(cookieParser());

// Middleware
app.use(userExtractor);

// Endpoints
app.use("/api/users",userRouter);
app.use("/api/login",loginRouter);
app.use("/api/chats",chatRouter);

// Socket
io.on('connection', (socket:Socket) => {
  // Joining the room
  socket.on("join-room",(room:string)=>joinRoom(room,socket));
  
  // Sending the message
  socket.on("send-message",(message:{text:string,user:string,date:string,chat:string})=>sendMessage(message,io));
});

app.use(errorHandler);

http.listen(process.env.PORT,()=>console.log(`Listening on port: ${process.env.PORT}`))
