import type { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "@shared/constants";
import { v4 } from "uuid";
import { loginSchema } from "../_validation";

export async function post(req: Request, res: Response) {
  const redis = req.sessionStore.client;
  const { db } = req.context;
  const { email } = req.body;
  const token = v4();

  try {
    await loginSchema.validate(req.body);
  } catch (err) {
    return res.status(422).json(err);
  }

  const user = await db.user.findOne({ where: { email } });

  if (!user) {
    res.json({ status: "Email sent" });
    // send email telling user no account found,
    // try again with different email here or register new account here
    return;
  }

  await redis.set(
    FORGET_PASSWORD_PREFIX + token,
    user.id,
    "ex",
    1000 * 60 * 60 * 24 * 1 // 1 day
  );

  // send email with following link
  console.log("link: ", `http://localhost:3000/account/verify-token/${token}`);

  return res.json({ status: "Email sent" });
}
