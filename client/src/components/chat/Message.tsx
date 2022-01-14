import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import theme from "../../utils/theme";
import {
	MessageMainStyled,
	MessageStyled,
	MessageTextStyled,
	MessageTimeStyled,
} from "../styled/Chat.Styled";

export default function Message({
	author,
	text,
}: {
	author: string;
	text: string;
}) {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<MessageStyled
			className="message"
			style={{ alignSelf: user?._id === author ? "flex-end" : "flex-start" }}
		>
			{user?._id === author ? (
				<>
					<MessageMainStyled>
						<MessageTextStyled style={{ backgroundColor: theme.colors.black }}>
							{text}
							<br></br>
							<MessageTimeStyled>12-12-2021</MessageTimeStyled>
						</MessageTextStyled>
					</MessageMainStyled>
				</>
			) : (
				<>
					<MessageMainStyled>
						<MessageTextStyled style={{ backgroundColor: theme.colors.blue }}>
							{text}
							<br></br>
							<MessageTimeStyled>12-12-2021</MessageTimeStyled>
						</MessageTextStyled>
					</MessageMainStyled>
				</>
			)}
		</MessageStyled>
	);
}
