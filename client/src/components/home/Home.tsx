import React from "react";
import ChatBox from "./ChatBox";
import UserWindow from "./UserWindow";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Chat from "../chat/Chat";
import { LeftSideStyled, StyledHome } from "../styled/Home.styled";
import RightSide from "./RightSide";

export default function Home() {
	const selected = useSelector((state: RootState) => state.chats.active);
	return (
		<StyledHome>
			<LeftSideStyled>
				<UserWindow />
				<ChatBox />
			</LeftSideStyled>
			<>
				{selected === -1 ? (
					<RightSide />
				) : (
					<div className="home-right">
						<Chat />
					</div>
				)}
			</>
		</StyledHome>
	);
}
