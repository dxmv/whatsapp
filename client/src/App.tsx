import React, { useEffect } from "react";
import Home from "./components/home/Home";
import { Routes as Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userServices from "./services/userServices";
import { useDispatch } from "react-redux";
import { SET_USER } from "./redux/userReducer";
import { useNavigate } from "react-router-dom";
import chatServices from "./services/chatServices";
import { SET_ACTIVE } from "./redux/chatReducer";
import UserPage from "./components/user/UserPage";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import GlobalStyle from "./components/styled/Global";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await userServices.getCurrentUser();
				user.chats = await chatServices.getAllChats();
				dispatch(SET_USER(user));
				dispatch(SET_ACTIVE(-1));
			} catch (e: any) {
				if (e.response) {
					navigate("/login");
				}
			}
		};
		getUser();
	});
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Switch>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/settings" element={<UserPage />} />
				<Route path="/reset/:id" element={<ResetPasswordForm />} />
			</Switch>
		</ThemeProvider>
	);
}

export default App;
