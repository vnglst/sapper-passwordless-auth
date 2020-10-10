import type { Handler } from "express";

export const getLogout: Handler = async function (req, res) {
  req.session!.user = null;
  res.json({ status: "logged out" });
};
