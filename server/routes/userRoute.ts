import express from "express";
import userController from "../controllers/userController";
import { IUser } from "../types";
import tokenController from "../controllers/tokenController";
import transporter from "../utils/transporter";
const userRoute = express.Router();

// GET (api/users) - get all users
userRoute.get("/", async (req, res, next) => {
	try {
		const users = await userController.getAll();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
});

// GET (api/users/current) - get current user
userRoute.get("/current", async (req, res, next) => {
	try {
		if (req.user) {
			const user = await userController.getUser(req.user.id);
			res.status(200).json(user);
		} else {
			res.status(403).json({
				msg: "You must be logged in to do this",
			});
		}
	} catch (err) {
		next(err);
	}
});

// GET (api/users/:id) - get single user
userRoute.get("/:id", async (req, res, next) => {
	try {
		const user = await userController.getUser(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				msg: "Invalid ID provided",
			});
		}
	} catch (err) {
		next(err);
	}
});

// POST (api/users/resetMail) - send an email with reset password link
userRoute.post("/resetMail", async (req, res, next) => {
	try {
		if (req.user) {
			const token = await tokenController.createResetToken(req.user.id);
			const mail = {
				from: process.env.MAIL,
				to: req.user.email,
				subject: "Password reset",
				text: `To reset your password, click this link:\nhttp://localhost:3000/reset/${token._id}`,
			};
			transporter.sendMail(mail);
			res.status(202).json(token);
		} else {
			res.status(403).json({
				msg: "You must be logged in to do this",
			});
		}
	} catch (e) {
		let message = (e as Error).message;
		if (message === "We've already sent you a mail.") {
			res.status(409).json({
				msg: message,
			});
		} else {
			next(e);
		}
	}
});

// POST (api/users) - create a user
userRoute.post("", async (req, res, next) => {
	try {
		const reqUser: IUser = req.body;
		const user = await userController.createUser(reqUser);
		if (user) {
			res.status(202).json(user);
		} else {
			res.status(409).json({
				msg: `This email is already in use`,
			});
		}
	} catch (err) {
		next(err);
	}
});

// POST (api/users/friends/:id) - add a new friend
userRoute.post("/friends/:id", async (req, res, next) => {
	try {
		if (req.user) {
			const added = await userController.addFriend(req.user.id, req.params.id);
			if (added) {
				res.status(202).json({
					msg: "You added a friend",
				});
			} else {
				res.status(404).json({
					msg: `There is no user with id: ${req.params.id}`,
				});
			}
		} else {
			res.status(403).json({
				msg: "You must be logged in to do this",
			});
		}
	} catch (err) {
		let message = (err as Error).message;
		if (
			message === "You are friends already" ||
			message === "User doesn't exist" ||
			message === "You can't remove your self"
		) {
			res.status(404).json({
				msg: message,
			});
		} else {
			next(err);
		}
	}
});

// PUT (api/users/) - edit a user
userRoute.put("/", async (req, res, next) => {
	try {
		if (req.user) {
			const user: { fullName: string; email: string; password: string } =
				req.body;
			const newUser = await userController.editUser(req.user.id, user);
			res.status(204).json(newUser);
		} else {
			res.status(403).json({
				msg: "You must be logged in to do this",
			});
		}
	} catch (e) {
		let message = (e as Error).message;
		if (message === "Invalid password") {
			res.status(401).json({
				msg: message,
			});
		} else {
			next(e);
		}
	}
});

// DELETE (api/users/friends/:id) - remove a friend
userRoute.delete("/friends/:id", async (req, res, next) => {
	try {
		if (req.user) {
			const removed = await userController.removeFriend(
				req.user.id,
				req.params.id
			);
			res.status(202).json({
				msg: "You removed a friend",
			});
		} else {
			res.status(403).json({
				msg: "You must be logged in to do this",
			});
		}
	} catch (err: any) {
		let message = (err as Error).message;
		if (
			message === "You aren't friends" ||
			message === "User doesn't exist" ||
			message === "You can't remove your self"
		) {
			res.status(404).json({
				msg: message,
			});
		} else {
			next(err);
		}
	}
});

// PATCH (api/users/:id/reset) - reset password

module.exports = userRoute;
