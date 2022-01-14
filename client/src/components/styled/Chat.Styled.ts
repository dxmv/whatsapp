import styled from "styled-components";

export const ChatHeaderStyled = styled.div`
	width: 100%;
	height: 9%;
	border-bottom: 1px solid black;
	margin-bottom: 20px;
	padding: 0.5rem 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ChatMain = styled.div`
	padding: 1rem;
	height: 85%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const MessageStyled = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.5rem;
	width: 15%;
`;

export const MessageMainStyled = styled.div`
	margin-left: 0.4rem;
	width: 100%;
`;

export const MessageTextStyled = styled.div`
	border-radius: 50px;
	font-size: 1.2rem;
	border: 1px solid black;
	padding: 0.4rem 0.7rem;
	overflow-wrap: break-word;
	color: white;
`;

export const MessageTimeStyled = styled.p`
	font-size: 0.7rem;
	opacity: 0.6;
`;

export const SendMessageIcon = styled.div`
	position: absolute;
	font-size: 2rem;
	right: 1.5rem;
	top: 0.1rem;
	color: white;
	&:hover {
		cursor: pointer;
	}
`;

export const MessageInputStyled = styled.input`
	height: 100%;
	width: 100%;
	outline: none;
	border-radius: 1rem;
	padding: 0.3rem 0.5rem;
	font-size: 1.2rem;
	border: 1px solid #777;
	background-color: ${props => props.theme.colors.darkBlue};
	color: white;

	&::placeholder {
		color: white;
		opacity: 0.7;
	}
`;
