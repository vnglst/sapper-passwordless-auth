import type { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "@shared/constants";
import { v4 } from "uuid";

export async function post(req: Request, res: Response) {
  const redis = req.sessionStore.client;
  const { email } = req.body;
  const token = v4();

  let userId = null;
  let alreadyUser = false;

  if (email === "k@k.nl") {
    alreadyUser = true;
    userId = "koen-id"; // TODO: get from db based on email
  }

  if (!userId) {
    // in DB create new user with name + email
    userId = "new-koen";
  }

  await redis.set(
    FORGET_PASSWORD_PREFIX + token,
    userId,
    "ex",
    1000 * 60 * 60 * 24 * 1 // 1 day
  );

  // this should be sent by email
  console.log("link: ", `http://localhost:3000/account/verify-token/${token}`);
  console.log(
    alreadyUser
      ? "An account was already found with this email address, you can log in here"
      : "An account was created for this email address, you can log in here."
  );

  return res.json({ status: "Email sent" });
}
