import styled from "styled-components";

export const StyledHome = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	overflow: hidden;
	display: grid;
	grid-template-columns: 20% 80%;
`;

export const LeftSideStyled = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid ${({ theme }) => theme.colors.dark};
`;

export const UserWindowStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 1rem;
	height: 100px;
`;

export const MainUserStyled = styled.div`
	display: flex;
	align-items: center;
`;

export const IconsStyled = styled.div`
	align-self: flex-start;
	display: flex;
	width: 20%;
	justify-content: space-between;
`;

export const CircleIcon = styled.div`
	border: 1px solid #777;
	border-radius: 40px;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

export const UserChatListStyled = styled.ul`
	list-style: none;
`;

export const PersonChatStyled = styled.li`
	display: flex;
	padding: 10px 10px;
	align-items: center;

	&:hover {
		cursor: pointer;
		opacity: 0.6;
		transition: 0.5s;
	}
`;

export const ChatInfo = styled.div`
	margin-left: 10px;
`;

export const FriendSearch = styled.div`
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FilterResult = styled(PersonChatStyled)`
	width: 100%;
	justify-content: space-between;
	margin-bottom: 10px;
`;

export const FriendListStyled = styled.div`
	padding: 1rem 2rem;
`;

export const FriendListGrid = styled.ul`
	list-style: none;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
`;

export const FriendInfo = styled(PersonChatStyled)`
	width: 100%;
	justify-content: space-between;
	&:hover {
		background-color: ${props => props.theme.colors.lightBlue};
		opacity: 1;
	}
`;

export const FriendIconsStyled = styled(IconsStyled)`
	width: 17%;
	align-items: center;
`;
