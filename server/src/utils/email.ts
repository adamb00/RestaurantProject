import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import env from './validateEnv';
import { UserType } from '../models/UserModel';

export default class Email {
   private to: string;

   private from: string;

   constructor(user: UserType) {
      this.to = env.EMAIL_FROM;

      this.from = user.email;
   }

   private newTransport() {
      return nodemailer.createTransport({
         host: env.EMAIL_HOST,
         port: env.EMAIL_PORT,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD,
         },
      });
   }

   public async send(subject: string, template: string) {
      const mailOptions = {
         from: this.from,
         to: this.to,
         subject,
         text: htmlToText(template),
      };

      await this.newTransport().sendMail(mailOptions);
      console.log('sent');
   }
}
