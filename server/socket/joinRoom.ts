import { Socket } from "socket.io";

const joinRoom=(room:string,socket:Socket)=>{
  socket.join(room);
};

export default joinRoom;