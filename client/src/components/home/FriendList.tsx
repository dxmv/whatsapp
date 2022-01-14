import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import removeFriend from "../../utils/removeFriend";
import PersonInfo from "./PersonInfo";
import { SET_USER } from "../../redux/userReducer";
import chatServices from "../../services/chatServices";
import { SET_ACTIVE } from "../../redux/chatReducer";
import { FriendListGrid, FriendListStyled } from "../styled/Home.styled";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function FriendList({
	setSelected,
}: {
	setSelected: () => void;
}) {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();

	const remove = async (id: string) => {
		const user = await removeFriend(id);
		dispatch(SET_USER(user));
	};

	const createNewChat = async (id: string) => {
		try {
			let exists: boolean = false;
			// Chat exists
			if (user) {
				for (let i = 0; i < user.chats.length; i++) {
					const chat = user.chats[i];
					if (chat) {
						exists = chat.users.find(u => u._id === id) ? true : false;
						if (exists) {
							await dispatch(SET_ACTIVE(i));
							break;
						}
					}
				}
			}
			// Create a new chat
			if (!exists) {
				const newChat = await chatServices.createChat(id);
				const chats = await chatServices.getAllChats();
				if (user) {
					user.chats = chats;
					dispatch(SET_USER(user));
					const index = chats.findIndex(chat => chat._id === newChat._id);
					dispatch(SET_ACTIVE(index));
				}
			}
		} catch (e: any) {
			if (e.response) {
				const msg = e.response.data.msg;
				alert(msg);
			}
			console.log(e);
		}
	};

	if (user) {
		return (
			<FriendListStyled>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "20px",
						width: "100%",
						borderBottom: "1px solid black",
					}}
				>
					<h2>Friends ({user.friends.length})</h2>
					<button onClick={() => setSelected()}>
						<IoIosAddCircleOutline style={{ width: "35px", height: "35px" }} />
					</button>
				</div>

				<FriendListGrid>
					{user.friends.map(friend => (
						<PersonInfo
							key={friend._id}
							id={friend._id}
							name={friend.fullName}
							email={friend.email}
							onClick={remove}
							onCreateNewChat={(id: string) => createNewChat(id)}
						/>
					))}
				</FriendListGrid>
			</FriendListStyled>
		);
	}
	return <div>halo</div>;
}
