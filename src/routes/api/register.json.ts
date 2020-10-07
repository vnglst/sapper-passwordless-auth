import type { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "@shared/constants";
import { v4 } from "uuid";
import type { User } from "@prisma/client";
import { registerSchema } from "./_validation";

export async function post(req: Request, res: Response) {
  const redis = req.sessionStore.client;
  const { db } = req.context;
  const { email, name } = req.body;
  const token = v4();

  try {
    await registerSchema.validate(req.body, {
      abortEarly: false,
      context: req.context,
    });
  } catch (err) {
    return res.status(422).json(err);
  }

  let user: User;
  let alreadyUser = false;

  try {
    const existingEmail = await db.user.findOne({ where: { email } });
    if (existingEmail) {
      user = existingEmail;
      alreadyUser = true;
    } else {
      user = await db.user.create({ data: { email, name } });
    }
  } catch (e) {
    console.error(e);
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
}
