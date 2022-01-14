import React, { useState } from "react";
import {
	ErrorMessage,
	FormWindowStyled,
	UserPageButton,
} from "../styled/UserPage.Styled";
import TextInput from "../reusable/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userServices from "../../services/userServices";
import { SET_USER } from "../../redux/userReducer";

interface IError {
	fullname: string;
	email: string;
	password: string;
	confirm: string;
	form: string;
}

export default function EditForm() {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const [fullName, setFullName] = useState<string>(user ? user.fullName : "");
	const [email, setEmail] = useState<string>(user ? user.email : "");
	const [password, setPassword] = useState<string>("");
	const [confirm, setConfirm] = useState<string>("");
	const [error, setError] = useState<IError>({
		fullname: "",
		email: "",
		password: "",
		form: "",
		confirm: "",
	});

	const emptyValidation = async (): Promise<boolean> => {
		let empty = false;
		if (fullName === "") {
			await setError(prev => {
				return { ...prev, fullname: "This field is required" };
			});
			empty = true;
		} else {
			await setError(prev => {
				return { ...prev, fullname: "" };
			});
			empty = false;
		}
		if (email === "") {
			await setError(prev => {
				return { ...prev, email: "This field is required" };
			});
			empty = true;
		} else {
			await setError(prev => {
				return { ...prev, email: "" };
			});
			empty = false;
		}
		if (password === "") {
			await setError(prev => {
				return { ...prev, password: "This field is required" };
			});
			empty = true;
		} else {
			await setError(prev => {
				return { ...prev, password: "" };
			});
			empty = false;
		}
		if (confirm === "") {
			await setError(prev => {
				return { ...prev, confirm: "This field is required" };
			});
			empty = true;
		} else {
			await setError(prev => {
				return { ...prev, confirm: "" };
			});
			empty = false;
		}
		return empty;
	};

	const passwordValidation = async (): Promise<boolean> => {
		let match = false;
		if (password !== confirm) {
			await setError(prev => {
				return { ...prev, form: "Passwords must match" };
			});
			match = true;
		} else {
			await setError(prev => {
				return { ...prev, form: "" };
			});
		}
		return match;
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLFormElement, MouseEvent>
	) => {
		e.preventDefault();
		const empty = await emptyValidation();
		const isMatching = await passwordValidation();
		if (empty) {
			return;
		}
		if (isMatching) {
			return;
		}
		try {
			const newUser = await userServices.editUser({
				fullName,
				email,
				password,
			});
			await dispatch(SET_USER(newUser));
			await setFullName("");
			await setEmail("");
			await setPassword("");
			await setConfirm("");
		} catch (e: any) {
			if (e.response) {
				const msg = e.response.data.msg;
				if (msg === "Invalid password") {
					await setError(prev => {
						return { ...prev, password: msg };
					});
				} else {
					await setError(prev => {
						return { ...prev, form: msg };
					});
				}
			}
			await setPassword("");
			await setConfirm("");
		}
	};
	return (
		<FormWindowStyled onClick={handleSubmit}>
			<h2 style={{ fontSize: "32px" }}>Edit your account</h2>
			<ErrorMessage>{error.form !== "" && error.form}</ErrorMessage>
			<TextInput
				label="Full Name:"
				labelStyle={{ fontSize: "1.2rem" }}
				style={{ marginTop: "2rem", width: "50%" }}
				inputStyle={{
					width: "100%",
					fontSize: "1.2rem",
					padding: "0.3rem 0.5rem",
					marginTop: "0.2rem",
					borderRadius: "0.5rem",
					border: "1px solid #415a77",
					outline: "none",
					borderColor: error.fullname && "red",
				}}
				value={fullName}
				setValue={setFullName}
				error={error.fullname}
				setErrorMessage={(message: string) =>
					setError(prev => {
						return { ...prev, fullname: message };
					})
				}
				regex="^[\w]+ [\w]+"
			/>
			<TextInput
				label="Email:"
				labelStyle={{ fontSize: "1.2rem" }}
				style={{ marginTop: "2rem", width: "50%" }}
				inputStyle={{
					width: "100%",
					fontSize: "1.2rem",
					padding: "0.3rem 0.5rem",
					marginTop: "0.2rem",
					borderRadius: "0.5rem",
					border: "1px solid #415a77",
					outline: "none",
					borderColor: error.email && "red",
				}}
				value={email}
				setValue={setEmail}
				error={error.email}
				setErrorMessage={(message: string) =>
					setError(prev => {
						return { ...prev, email: message };
					})
				}
				regex="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
			/>
			<TextInput
				label="Password:"
				labelStyle={{ fontSize: "1.2rem" }}
				style={{ marginTop: "2rem", width: "50%" }}
				inputStyle={{
					width: "100%",
					fontSize: "1.2rem",
					padding: "0.3rem 0.5rem",
					marginTop: "0.2rem",
					borderRadius: "0.5rem",
					border: "1px solid #415a77",
					outline: "none",
					borderColor: error.password && "red",
				}}
				value={password}
				setValue={setPassword}
				error={error.password}
				setErrorMessage={(message: string) =>
					setError(prev => {
						return { ...prev, password: message };
					})
				}
				minLength={8}
				maxLength={15}
				password={true}
			/>
			<TextInput
				label="Confirm Password:"
				labelStyle={{ fontSize: "1.2rem" }}
				style={{ marginTop: "2rem", width: "50%" }}
				inputStyle={{
					width: "100%",
					fontSize: "1.2rem",
					padding: "0.3rem 0.5rem",
					marginTop: "0.2rem",
					borderRadius: "0.5rem",
					border: "1px solid #415a77",
					outline: "none",
					borderColor: error.confirm && "red",
				}}
				value={confirm}
				setValue={setConfirm}
				error={error.confirm}
				setErrorMessage={(message: string) =>
					setError(prev => {
						return { ...prev, confirm: message };
					})
				}
				minLength={8}
				maxLength={15}
				password={true}
			/>
			<UserPageButton type="submit">
				<span style={{ position: "relative", zIndex: "3" }}>Save Changes</span>
			</UserPageButton>
		</FormWindowStyled>
	);
}
