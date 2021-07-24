import { get } from "config";
import dotenv from "dotenv";
dotenv.config();

import { createTransport } from "nodemailer";
import { ISendMail } from "../entities";
const sendGrid = require("@sendgrid/mail");

export class EmailService {
  public static async sendMail(data: ISendMail) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        };
        let transporter = createTransport(obj as any);

        let info = await transporter.sendMail({
          from: `sFileShare <${data.from}>`,
          to: data.to,
          subject: data.subject,
          text: data.text,
          html: data.html,
        });
        if (info) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
