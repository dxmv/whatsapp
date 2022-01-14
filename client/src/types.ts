export interface IUser{
  fullName:string,
  email:string,
  password:string
}

export interface IUserModel extends IUser{
  _id:string,
  friends:IUserModel[],
  chats:IChatModel[],
}

export interface IChat{
  users:IUserModel[]
}

export interface IChatModel extends IChat{
  _id:string,
  messages:Omit<IMessageModel,"chat">[]
}


export interface IMessageModel{
  _id:string,
  user:string,
  chat:IChatModel,
  text:string,
  date:string
}

