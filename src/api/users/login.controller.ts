import type { Handler } from "express";
import { login } from "./user.model";
import { loginSchema } from "./user.validation";

export const postLogin: Handler = async (req, res) => {
  await loginSchema.validate(req.body, { abortEarly: false });
  const { email } = req.body;
  await login(email);
  return res.json({ status: "Email sent" });
};
