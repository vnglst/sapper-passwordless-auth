import type { Handler } from "express";

export const get: Handler = async function (req, res) {
  const { prisma, redis } = req.context;

  let dbStatus = "";

  try {
    // execute random query; if success db is working correctly
    await prisma.user.findFirst({});
    dbStatus = "OK";
  } catch (error) {
    dbStatus = "ERROR";
  }

  res.json({ status: "OK", redisStatus: redis.status, dbStatus });
};
