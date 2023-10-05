require("dotenv").config();
import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
import BetaUser from "./beta-user.model";
import { CreateBetaUserInput } from "./beta-user.schema";
import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';



sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
console.log(process.env.SENDGRID_API_KEY);

export const createBetaUserController = async (req: Request, res: Response) => {
  const { name, email } = req.body as CreateBetaUserInput;

  const existingUser = await BetaUser.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ message: "User already registered" });
  }

  const newUser = await BetaUser.create({ name, email });
  const templatePath = path.resolve('src/modules/confirmation_email.html');
  const template = fs.readFileSync(templatePath, 'utf-8');
  const html = ejs.render(template, { name });

  const msg = {
    to: email,
    from: "support@postshorts.studio",
    subject: `Hello, ${name}`,
    text: `Dear ${name}, this is a message from Postshorts Studio.`,
    html: html,
  };

  await sgMail.send(msg);

  return res.json(newUser);
};
