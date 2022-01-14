import React, { useState } from "react";
import { UserMain } from "../styled/UserPage.Styled";
import EditForm from "./EditForm";
import ResetPassword from "./ResetPassword";
//import "../../styles/user.css";
import UserNav from "./UserNav";

export default function UserPage() {
	const [active, setActive] = useState<string>("edit");

	return (
		<UserMain>
			<UserNav active={active} setActive={setActive} />
			{active === "edit" ? <EditForm /> : <ResetPassword />}
		</UserMain>
	);
}
