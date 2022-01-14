import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FormWindowStyled, UserPageButton } from "../styled/UserPage.Styled";
import tokenServices from "../../services/tokenServices";

export default function ResetPassword() {
	const [sent, setSent] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const user = useSelector((state: RootState) => state.user.user);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLFormElement, MouseEvent>
	) => {
		e.preventDefault();
		// await setSent(prev => !prev);
		try {
			const res = await tokenServices.createResetToken();
			await setSent(true);
		} catch (e: any) {
			await setSent(false);
			if (e.response.data) {
				let message = e.response.data.msg;
				await setError(message);
			}
		}
	};
	return (
		<FormWindowStyled
			style={{ display: "flex", flexDirection: "column" }}
			onSubmit={handleSubmit}
		>
			<h2 style={{ fontSize: "32px" }}>Reset your password</h2>
			{sent ? (
				<>
					<p style={{ fontSize: "20px", opacity: "0.7", marginTop: "10px" }}>
						Check your email
					</p>
				</>
			) : (
				<>
					<p style={{ fontSize: "20px", opacity: "0.7", marginTop: "10px" }}>
						The url for resetting your password will be sent to:
					</p>
					<p style={{ marginTop: "10px", color: "red" }}>
						{error !== "" && error}
					</p>
					<input
						value={user?.email}
						disabled
						style={{
							width: "50%",
							fontSize: "1.2rem",
							padding: "0.3rem 0.5rem",
							marginTop: "20px",
							borderRadius: "0.5rem",
							border: "1px solid #415a77",
							outline: "none",
						}}
					/>
					<UserPageButton type="submit" style={{ width: "min-content" }}>
						<span style={{ position: "relative", zIndex: "3" }}>SEND</span>
					</UserPageButton>
				</>
			)}
		</FormWindowStyled>
	);
}
