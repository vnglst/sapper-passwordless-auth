import type { Handler } from "express";

export const get: Handler = async function (req, res) {
  const redisStatus = req.sessionStore.client.status;
  const { db } = req.context;

  let dbStatus = "";

  try {
    // execute random query; if success db is working correctly
    const u = await db.user.findFirst({});
    console.log(u);
    dbStatus = "OK";
  } catch (error) {
    dbStatus = "ERROR";
  }

  res.json({ status: "OK", redisStatus, dbStatus });
};
