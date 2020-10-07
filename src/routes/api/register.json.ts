import type { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "@shared/constants";
import { v4 } from "uuid";
import type { User } from "@prisma/client";

export async function post(req: Request, res: Response) {
  const redis = req.sessionStore.client;
  const { db } = req.context;
  const { email, name } = req.body;
  const token = v4();

  let user: User;
  let alreadyUser = false;

  try {
    const existingName = await db.user.findOne({ where: { name } });

    if (existingName)
      return res.json({ error: "Already in use", field: "name" });

    const existingEmail = await db.user.findOne({ where: { email } });

    if (existingEmail) {
      user = existingEmail;
      alreadyUser = true;
    } else {
      console.log("creating user", email, name);
      user = await db.user.create({ data: { email, name } });
    }

    console.log("user", user);
  } catch (e) {
    console.error("Error", e);
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
