import type { Handler } from "express";
import { register } from "./user.model";
import { registerSchema } from "./user.validation";

export const postRegister: Handler = async (req, res) => {
  await registerSchema.validate(req.body, { abortEarly: false });
  const { email, name } = req.body;
  await register(email, name);
  return res.json({ status: "Email sent" });
};
