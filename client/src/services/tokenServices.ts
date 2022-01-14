import axios from "axios";

const createResetToken = async () => {
	const res = await axios.post(
		"http://localhost:8080/api/users/resetMail",
		{},
		{ withCredentials: true }
	);
	return res.data;
};

export default { createResetToken };
