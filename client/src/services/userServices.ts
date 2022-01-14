import axios from "axios";
import { IUser, IUserModel } from "../types";
const URL = "http://localhost:8080/api/users";
const LOGIN_URL = "http://localhost:8080/api/login";

interface Login {
	email: string;
	password: string;
}

const register = async (user: IUser): Promise<IUser> => {
	const res = await axios.post<IUser>(`${URL}`, user);
	return res.data;
};

const login = async (user: Login): Promise<IUser> => {
	const res = await axios.post(`${LOGIN_URL}`, user, { withCredentials: true });
	return res.data;
};

const getCurrentUser = async (): Promise<IUserModel> => {
	const res = await axios.get(`${URL}/current`, { withCredentials: true });
	return res.data;
};

const removeFriend = async (id: string): Promise<void> => {
	const res = await axios.delete(`${URL}/friends/${id}`, {
		withCredentials: true,
	});
};

const addFriend = async (id: string): Promise<void> => {
	const res = await axios.post(
		`${URL}/friends/${id}`,
		{},
		{ withCredentials: true }
	);
};

const getAll = async (): Promise<IUserModel[]> => {
	const res = await axios.get(URL);
	return res.data;
};

const editUser = async (user: {
	fullName: string;
	email: string;
	password: string;
}): Promise<IUserModel> => {
	const res = await axios.put(URL, user, { withCredentials: true });
	return res.data;
};

export default {
	register,
	login,
	getCurrentUser,
	removeFriend,
	getAll,
	addFriend,
	editUser,
};
