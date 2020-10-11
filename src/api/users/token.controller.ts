import type { Handler } from "express";
import { verifyToken } from "./user.model";
import { tokenSchema } from "./user.validation";

export const getToken: Handler = async function (req, res) {
  await tokenSchema.validate(req.params, { abortEarly: false });
  const { user } = await verifyToken(req.params.token);

  if (user) {
    req.session!.user = user;
    return res.json({ status: "logged in", user });
  }

  return res.status(401).json({ status: "token expired" });
};
