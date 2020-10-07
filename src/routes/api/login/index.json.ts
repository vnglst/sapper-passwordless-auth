import type { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "@shared/constants";
import { v4 } from "uuid";

export async function post(req: Request, res: Response) {
  const redis = req.sessionStore.client;
  const { email } = req.body;
  const token = v4();

  let userId = null;

  if (email === "k@k.nl") {
    userId = "koen-id"; // TODO: get from db based on email
  }

  if (!userId) {
    res.json({ status: "Email sent" });
    // send email telling user no account found, try again with different email here or register new account here
    return;
  }

  await redis.set(
    FORGET_PASSWORD_PREFIX + token,
    userId,
    "ex",
    1000 * 60 * 60 * 24 * 1 // 1 day
  );

  // this should be sent by email
  console.log("link: ", `http://localhost:3000/account/verify-token/${token}`);

  return res.json({ status: "Email sent" });
}
