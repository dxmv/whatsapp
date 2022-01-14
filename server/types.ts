import { Request } from "express";
export interface IUser {
	fullName: string;
	email: string;
	password: string;
}

export interface IUserModel extends IUser {
	_id: string;
	friends: string[];
	chats: string[];
}

export interface IChat {
	users: string[];
}

export interface IChatModel extends IChat {
	_id: string;
	messages: string[];
}

export interface CustomRequest extends Request {
	user: {
		email: string;
		id: string;
	};
}

export interface IMessage {
	text: string;
	date: string;
}

export interface IMessageModel extends IMessage {
	_id: string;
	user: string;
	chat: string;
}

export interface IResetPassword {
	_id: string;
	user: string;
}
