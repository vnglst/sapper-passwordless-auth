import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

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
  console.log("Message sent: %s", result.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
}
