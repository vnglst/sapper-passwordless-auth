import { PrismaClient } from "@prisma/client";
import { __prod__ } from "../constants";

export const prisma = new PrismaClient({
  log: __prod__ ? [] : ["query", "info", "warn"],
});
