import { IResetPassword } from "../types";
import { Model } from "mongoose";
import bcrypt from "bcrypt";
const ResetPassword: Model<IResetPassword> = require("../models/ResetPassword");

const createResetToken = async (userId: string) => {
	const exists = await ResetPassword.exists({ user: userId });
	if (exists) {
		throw new Error("We've already sent you a mail.");
	}
	const newToken: Omit<IResetPassword, "_id"> = {
		user: userId,
	};
	const reset = await new ResetPassword(newToken);
	reset.save();
	return reset;
};

export default { createResetToken };
