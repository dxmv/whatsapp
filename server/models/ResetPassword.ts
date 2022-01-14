import mongoose from "mongoose";
import { IResetPassword } from "../types";

const schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	expire_at: { type: Date, default: Date.now, expires: 7200 },
});

module.exports = mongoose.model<IResetPassword>("ResetPassword", schema);
