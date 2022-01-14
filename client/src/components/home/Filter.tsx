import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userServices from "../../services/userServices";
import { IUserModel } from "../../types";
import theme from "../../utils/theme";
import TextInput from "../reusable/TextInput";
import { FriendSearch } from "../styled/Home.styled";
import FilterPerson from "./FilterPerson";
import { IoArrowBackSharp } from "react-icons/io5";

interface IError {
	result: string;
}

export default function Filter({ setSelected }: { setSelected: () => void }) {
	const [filter, setFilter] = useState<string>("");
	const [error, setError] = useState<IError>({ result: "" });
	const [users, setUsers] = useState<IUserModel[]>([]);
	const [result, setResult] = useState<IUserModel[]>([]);
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		const getUsers = async () => {
			const users = await userServices.getAll();
			await setUsers([...users]);
		};
		getUsers();
	}, []);

	useEffect(() => {
		if (filter === "") {
			setResult([]);
			return;
		}
		const currentFilter = filter.toLowerCase();
		const filtered = users
			.filter(user => user.fullName.toLowerCase().startsWith(currentFilter)) // Filter by name
			.filter(u => u._id !== user?._id) // Don't show the current user
			.filter(u => !user?.friends.find(f => f._id === u._id)); // and the friends of current user
		setResult([...filtered]);
	}, [filter]);

	const reset = async (): Promise<void> => {
		await setFilter("");
		await setResult([]);
	};

	return (
		<FriendSearch>
			<div
				style={{
					display: "flex",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h1 style={{ textAlign: "center", flexGrow: 1 }}>Add friends</h1>
				<button onClick={() => setSelected()} style={{ justifySelf: "end" }}>
					<IoArrowBackSharp style={{ width: "35px", height: "35px" }} />
				</button>
			</div>
			<TextInput
				style={{
					margin: "1rem 0rem 0.5rem 0",
					width: "50%",
				}}
				placeholder="Search..."
				inputStyle={{
					padding: "0.5rem 0.8rem",
					width: "100%",
					fontSize: "1rem",
					border: `1px solid ${theme.colors.black}`,
					backgroundColor: theme.colors.blue,
					borderRadius: "50px",
					color: "white",
				}}
				value={filter}
				setValue={setFilter}
				error={error.result}
				setErrorMessage={msg =>
					setError(prev => {
						return { ...prev, result: msg };
					})
				}
			/>
			<ul className="filter-results" style={{ width: "50%" }}>
				{result.length !== 0 ? (
					result.map(user => (
						<FilterPerson
							key={user._id}
							name={user.fullName}
							email={user.email}
							id={user._id}
							reset={reset}
						/>
					))
				) : (
					<h3 style={{ textAlign: "center", color: theme.colors.black }}>
						{filter !== "" && "There are no users that match the username"}
					</h3>
				)}
			</ul>
		</FriendSearch>
	);
}
