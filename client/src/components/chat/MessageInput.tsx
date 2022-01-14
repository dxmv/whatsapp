import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { IMessageModel } from "../../types";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { SendMessageIcon, MessageInputStyled } from "../styled/Chat.Styled";

export default function MessageInput({ socket }: { socket: Socket }) {
	const user = useSelector((state: RootState) => state.user.user);
	const selected = useSelector((state: RootState) => state.chats.active);
	const chat = useSelector(
		(state: RootState) => state.user.user?.chats[selected]
	);
	const [text, setText] = useState<string>("");

	const handleCreate = () => {
		if (user) {
			const message: {
				text: string;
				user: string;
				date: string;
				chat: string;
			} = {
				text,
				user: user._id,
				date: "24-12-2021",
				chat: chat ? chat._id : "",
			};
			socket.emit("send-message", message);
			setText("");
		}
	};
	return (
		<div style={{ position: "relative", padding: "0rem 1rem" }}>
			<MessageInputStyled
				type="text"
				className="send-message message-box"
				placeholder="Type your message here..."
				value={text}
				onChange={e => setText(e.target.value)}
				autoFocus={true}
			/>
			<SendMessageIcon>
				<BiSend className="send-message-icon" onClick={handleCreate} />
			</SendMessageIcon>
		</div>
	);
}
