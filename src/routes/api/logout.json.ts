import type { Request, Response } from "express";

export async function get(req: Request, res: Response) {
  req.session!.user = null;
  res.json({ status: "logged out" });
}
