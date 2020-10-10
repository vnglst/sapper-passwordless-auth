import type { Handler } from "express";
import { FORGET_PASSWORD_PREFIX } from "../../constants";
import { tokenSchema } from "../validation";

export const getToken: Handler = async function (req, res) {
  const { token } = req.params;
  const { prisma, redis } = req.context;

  try {
    await tokenSchema.validate(req.params, { abortEarly: false });
  } catch (err) {
    return res.status(401).json({ status: "token invalid" });
  }

  const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);

  if (userId) {
    const user = await prisma.user.findOne({
      where: { id: parseInt(userId, 10) },
    });
    req.session!.user = user;
    return res.json({ status: "logged in", user });
  }

  return res.status(401).json({ status: "token expired" });
};
