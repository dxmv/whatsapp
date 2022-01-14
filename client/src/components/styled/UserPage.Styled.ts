import styled from "styled-components";

export const UserMain = styled.main`
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100vh;
	padding: 40px 60px;
	display: grid;
	grid-template-columns: 20% 79%;
	grid-gap: 1%;
`;

export const UserOptions = styled.ul`
	list-style: none;
	background-color: ${({ theme }) => theme.colors.black};
	margin-top: 30px;
`;

export const UserOption = styled.li<UserOptionProps>`
	color: white;
	padding: 1rem;
	border-bottom: 2px solid ${({ theme }) => theme.colors.white};
	display: flex;
	align-items: center;
	background-color: ${props => props.bg};

	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => theme.colors.blue};
		transition: 850ms;
		width: 100%;
		height: 100%;
	}
`;

export const UserOptionText = styled.span`
	margin-left: 5px;
	&:hover {
		opacity: 0.7;
	}
`;

export const FormWindowStyled = styled.form`
	padding: 0.6rem 4rem;
`;

export const UserPageButton = styled.button`
	margin-top: 2rem;
	text-transform: uppercase;
	background-color: ${props => props.theme.colors.darkBlue};
	color: white;
	padding: 1rem 2rem;
	font-size: 1.2rem;
	font-weight: 600;
	border-radius: 10px;
	border: 1px solid black;
	position: relative;
	cursor: pointer;

	&::after {
		border-radius: 10px;
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		width: 0%;
		height: 100%;
		background-color: ${props => props.theme.colors.black};
		transition: 850ms;
	}

	&:hover::after {
		width: 100%;
	}

	&:disabled {
		background-color: #777;
	}
`;

export const ErrorMessage = styled.p`
	color: red;
	margin-top: 10px;
`;

interface UserOptionProps {
	bg: string;
}
