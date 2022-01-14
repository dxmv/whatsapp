import React from "react";
import {
	CircleIcon,
	IconsStyled,
	MainUserStyled,
	UserWindowStyled,
} from "../styled/Home.styled";
import { AiFillSetting } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { SET_ACTIVE } from "../../redux/chatReducer";

export default function UserWindow() {
	const dispatch = useDispatch();

	const logOut = async () => {
		document.cookie =
			"UserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload();
	};

	/*
					<CircleIcon>
					<AiOutlinePlus style={{ width: "20px", height: "25px" }} />
				</CircleIcon> */

	return (
		<UserWindowStyled>
			<MainUserStyled>
				<h2 style={{ fontSize: "2rem" }}>Chats</h2>
			</MainUserStyled>
			<IconsStyled>
				<button onClick={() => dispatch(SET_ACTIVE(-1))}>
					<CircleIcon>
						<BsFillPeopleFill style={{ width: "20px", height: "25px" }} />
					</CircleIcon>
				</button>
				<a href="/settings">
					<CircleIcon>
						<AiFillSetting style={{ width: "20px", height: "25px" }} />
					</CircleIcon>
				</a>
			</IconsStyled>
		</UserWindowStyled>
	);
}
