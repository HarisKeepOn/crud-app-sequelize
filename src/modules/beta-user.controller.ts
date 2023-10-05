require("dotenv").config();
import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
import BetaUser from "./beta-user.model";
import { CreateBetaUserInput } from "./beta-user.schema";


sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
console.log(process.env.SENDGRID_API_KEY);

export const createBetaUserController = async (req: Request, res: Response) => {
  const { name, email } = req.body as CreateBetaUserInput;

  const existingUser = await BetaUser.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ message: "User already registered" });
  }

  const newUser = await BetaUser.create({ name, email });

  const msg = {
    to: email,
    from: "support@postshorts.studio",
    subject: "Welcome to Beta",
    text: `Hello ${name}, welcome to our beta program.`,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  await sgMail.send(msg);

  return res.json(newUser);
};