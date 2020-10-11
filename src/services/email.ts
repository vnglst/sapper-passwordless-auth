import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "darrin.wilderman76@ethereal.email",
    pass: "1sURUJEtdvxTaSCetr",
  },
});

export async function sendEmail(
  { to, from, subject, html }: Mail.Options = {
    from: '"Koen van Gilst" <koen@vragen-vragen.nl>',
  }
) {
  const result = await transporter.sendMail({ from, to, subject, html });
  console.log("Message sent: %s", result.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
}
