import messageController from "../controllers/messageController";

const sendMessage=async(message:{text:string,user:string,date:string,chat:string},io:any)=>{
  io.to(message.chat).emit("receive-message",message);
  await messageController.createMessage(message);
}
export default sendMessage;