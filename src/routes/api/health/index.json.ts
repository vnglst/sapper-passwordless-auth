import type { Request, Response } from "express";

export async function get(req: Request, res: Response) {
  const redisStatus = req.sessionStore.client.status;
  const { db } = req.context;

  let dbStatus = null;

  try {
    // execute random query; if success db is working correctly
    await db.user.findFirst({});
    dbStatus = "OK";
  } catch (error) {
    dbStatus = "ERROR";
  }

  res.json({ status: "OK", redisStatus, dbStatus });
}
