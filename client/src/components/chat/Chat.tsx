import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { IMessageModel } from "../../types";
import MessageInput from "./MessageInput";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import chatServices from "../../services/chatServices";
import { SET_USER } from "../../redux/userReducer";
import theme from "../../utils/theme";
import ChatHeader from "./ChatHeader";

const socket = io("http://localhost:8080", {
	reconnection: true,
	reconnectionAttempts: 10,
});

export default function Chat() {
	const [messages, setMessages] = useState<Omit<IMessageModel, "chat">[]>([]);
	const selected = useSelector((state: RootState) => state.chats.active);
	const user = useSelector((state: RootState) => state.user.user);
	const chat = useSelector(
		(state: RootState) => state.user.user?.chats[selected]
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (chat) {
			socket.emit("join-room", chat._id);
			setMessages([...chat.messages]);
		}
	}, [selected]);

	useEffect(() => {
		const setChats = async () => {
			if (user) {
				user.chats = await chatServices.getAllChats();
				await dispatch(SET_USER(user));
			}
		};
		setChats();
	});

	const addMessage = async (message: IMessageModel) => {
		await setMessages(prev => [...prev, message]);
	};

	useEffect(() => {
		if (socket === null) return;
		socket.on("receive-message", addMessage);
		return () => {
			socket.off("receive-message");
		};
	}, [messages, socket]);

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				overflow: "none",
				background: theme.colors.white,
			}}
		>
			<ChatHeader />
			<MessageList messages={messages} />
			<MessageInput socket={socket} />
		</div>
	);
}
