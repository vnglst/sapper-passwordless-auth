import type { Handler } from "express";

export const getHealth: Handler = async function (req, res) {
  const { prisma, redis } = req.context;

  let dbStatus = "";

  try {
    await prisma.user.findFirst({});
    dbStatus = "OK";
  } catch (error) {
    dbStatus = "ERROR";
  }

  res.json({ status: "OK", redisStatus: redis.status, dbStatus });
};
