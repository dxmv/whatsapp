import React, { useState } from "react";
import { Link } from "react-router-dom";
import userServices from "../../services/userServices";
import "../../styles/login.css";
import TextInput from "../reusable/TextInput";
import { useNavigate } from "react-router-dom";

interface IError {
	email: string;
	password: string;
	form: string;
}

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<IError>({
		email: "",
		password: "",
		form: "",
	});
	const navigate = useNavigate();

	const emptyValidation = async (): Promise<boolean> => {
		let empty = false;
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
		return empty;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const empty = await emptyValidation();
		if (empty) {
			return;
		}
		try {
			const res = await userServices.login({ email, password });
			navigate("/");
		} catch (e: any) {
			if (e.response) {
				const msg = e.response.data.msg;
				if (msg === "Incorrect email") {
					await setError(prev => {
						return { ...prev, email: msg };
					});
				} else if (msg === "Incorrect password") {
					await setError(prev => {
						return { ...prev, password: msg };
					});
				} else {
					await setError(prev => {
						return { ...prev, form: msg };
					});
				}
			}
		}
	};

	return (
		<div className="main">
			<div className="form">
				<h1 className="form-header">Login Form</h1>
				<form
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
					onSubmit={handleSubmit}
				>
					<p className="error-form">{error.form && error.form}</p>
					<TextInput
						label="Email:"
						labelStyle={{ fontSize: "1.2rem" }}
						style={{ marginTop: "2rem", width: "80%" }}
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
						style={{ marginTop: "2rem", width: "80%" }}
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
					<button
						type="submit"
						className="btn-submit-form"
						disabled={error.email !== "" || error.password !== ""}
					>
						<span className="btn-text">Login</span>
					</button>
					<p className="form-para-bottom">
						Not a member? <Link to="/register">Sign up here</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
