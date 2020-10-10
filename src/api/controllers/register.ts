import type { User } from "@prisma/client";
import type { Handler } from "express";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../../constants";
import { registerSchema } from "../validation";

export const postRegister: Handler = async (req, res) => {
  const { prisma, redis } = req.context;
  const { email, name } = req.body;
  const token = v4();

  await registerSchema.validate(req.body, {
    abortEarly: false,
    context: req.context,
  });

  let user: User;
  let alreadyUser = false;

  const existingEmail = await prisma.user.findOne({ where: { email } });

  if (existingEmail) {
    user = existingEmail;
    alreadyUser = true;
  } else {
    user = await prisma.user.create({ data: { email, name } });
  }

  await redis.set(
    FORGET_PASSWORD_PREFIX + token,
    user!.id,
    "ex",
    1000 * 60 * 60 * 24 * 1 // 1 day
  );

  // this should be sent by email
  console.log("sending email to", user!.email);
  console.log("link: ", `http://localhost:3000/account/verify-token/${token}`);
  console.log(
    alreadyUser
      ? "An account was already found with this email address, you can log in here"
      : "An account was created for this email address, you can log in here."
  );

  return res.json({ status: "Email sent" });
};
