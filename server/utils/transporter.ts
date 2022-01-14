import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAIL,
		pass: process.env.PASSWORD,
	},
});

export default transporter;
