import React from "react";
import Message from "./Message";
import { IMessageModel } from "../../types";
import { ChatMain } from "../styled/Chat.Styled";

export default function MessageList({
	messages,
}: {
	messages: Omit<IMessageModel, "chat">[];
}) {
	return (
		<ChatMain>
			{messages.map(message => (
				<Message key={message._id} author={message.user} text={message.text} />
			))}
		</ChatMain>
	);
}
