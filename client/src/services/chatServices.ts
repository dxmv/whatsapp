import axios from "axios";
import { IChatModel } from "../types";
const URL="http://localhost:8080/api/chats"

const getAllChats=async():Promise<IChatModel[]>=>{
  const res=await axios.get(URL,{withCredentials:true});
  return res.data;
}

const deleteChat=async(id:string):Promise<void>=>{
  const res=await axios.delete(`${URL}/${id}`,{withCredentials:true});
}

const createChat=async(id:string):Promise<IChatModel>=>{
  const res=await axios.post(URL,{id:id},{withCredentials:true});
  return res.data;
}

export default {getAllChats,deleteChat,createChat};