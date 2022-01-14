import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserChatListStyled } from "../styled/Home.styled";
import PersonChat from "./PersonChat";

export default function ChatBox() {
	const user = useSelector((state: RootState) => state.user.user);

	if (user) {
		return (
			<div className="chats left-box">
				<UserChatListStyled>
					{user.chats.length !== 0 &&
						user.chats.map((chat, i) => (
							<PersonChat
								name={chat.users.find(u => u._id !== user._id)?.fullName}
								key={chat._id}
								date={chat.messages[chat.messages.length - 1]?.date}
								message={chat.messages[chat.messages.length - 1]?.text}
								index={i}
							/>
						))}
				</UserChatListStyled>
			</div>
		);
	}
	return <div>a</div>;
}
