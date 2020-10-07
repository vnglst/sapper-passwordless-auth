import type { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "@shared/constants";

export async function get(req: Request, res: Response) {
  const { token } = req.params;
  const redis = req.sessionStore.client;

  const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);

  if (userId) {
    req.session!.user = userId;
    return res.json({ status: "logged in", user: userId });
  }

  return res.json({ status: "token expired" });
}
