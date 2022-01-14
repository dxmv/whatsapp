import userServices from "../services/userServices"
import { IUserModel } from "../types";

const removeFriend=async(id:string):Promise<IUserModel>=>{
  await userServices.removeFriend(id);
  return await userServices.getCurrentUser();
}

export default removeFriend;