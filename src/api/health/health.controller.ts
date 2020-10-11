import type { Handler } from "express";
import { prisma, redis } from "../../services";

export const getHealth: Handler = async function (_req, res) {
  let dbStatus = "";

  try {
    await prisma.user.findFirst({});
    dbStatus = "OK";
  } catch (error) {
    dbStatus = "ERROR";
  }

  res.json({ status: "OK", redisStatus: redis.status, dbStatus });
};
