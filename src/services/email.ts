import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { logger } from "./logger";

export async function sendEmail(
  { to, from, subject, html }: Mail.Options = {
    from: '"Koen van Gilst" <koen@vragen-vragen.nl>',
  }
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const result = await transporter.sendMail({ from, to, subject, html });
  logger.info("Message sent: %s", result.messageId);
  logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(result));
}
