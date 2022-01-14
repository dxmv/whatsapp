import { IUser, IUserModel } from "../types"
import { Model,Document } from "mongoose";
import bcrypt from "bcrypt";
const User:Model<IUserModel>=require("../models/User");

const getAll=async()=>{
  return await User.find({}).populate("friends","fullName email");
}

const getUser=async(id:string)=>{
  try{
    return await User.findById(id).populate("friends","fullName email");
  }
  catch{
    return undefined;
  }
}
const createUser=async(user:IUser)=>{
  const exists=await User.findOne({email:user.email});
  if(exists) { return undefined; }
  const password=await bcrypt.hash(user.password,10);
  user.password=password;
  const newUser=await new User({...user,friends:[],chats:[]});
  await newUser.save();
  return newUser;
}

const addFriend=async(id:string,otherId:string):Promise<boolean>=>{
  const user=await User.findById(id);
  const friend=await User.findById(otherId);
  if(!user||!friend){ throw new Error("User doesn't exist") }
  if(user.equals(friend)) { throw new Error("You can't add your self") }
  if(!user.friends.includes(friend._id)&&!friend.friends.includes(user._id)){
    user.friends=[...user.friends,friend.id];
    await user.save();
    friend.friends=[...friend.friends,user.id];
    await friend.save();
    return true;
  }
  throw new Error("You are friends already");
}

const removeFriend=async(id:string,otherId:string):Promise<void>=>{
  const removeUserFriend=async(u:Document<any, any, IUserModel> & IUserModel & {_id: string;},otherId:string):Promise<void>=>{
    const friends=[...u.friends];
    const index=friends.findIndex(item=>item===otherId);
    friends.splice(index,1);
    u.friends=[...friends];
    await u.save();
  }
  
  const user=await User.findById(id);
  const friend=await User.findById(otherId);
  if(!user||!friend){ throw new Error("User doesn't exist") }
  if(user.equals(friend)) { throw new Error("You can't remove your self") }
  if(user.friends.includes(friend._id)&&friend.friends.includes(user._id)){
    await removeUserFriend(user,otherId);
    await removeUserFriend(friend,id);
    return;
  }
  throw new Error("You aren't friends");
}

const editUser=async(id:string,newUser:{fullName:string,email:string,password:string})=>{
  const dbUser=await User.findById(id);
  if(dbUser){
    const correctPassword=dbUser?await bcrypt.compare(newUser.password,dbUser.password):false;
    if(!correctPassword) { throw new Error("Invalid password"); }
    if(dbUser){
      const editedUser:Omit<IUserModel,"_id">={
        fullName:newUser.fullName,
        email:newUser.email,
        password:dbUser.password,
        friends:dbUser.friends,
        chats:dbUser.chats
      }
      const finalUser=await User.findByIdAndUpdate(id,editedUser);
      return finalUser;
    }
  }
  throw new Error("The user doesn't exist");  
};



export default {getUser,createUser,addFriend,removeFriend,getAll,editUser};
