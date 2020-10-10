import { PrismaClient } from "@prisma/client";
import * as sapper from "@sapper/server";
import { json } from "body-parser";
import compression from "compression";
import connectRedis, { RedisStore } from "connect-redis";
import dotenv from "dotenv";
import express, { Request } from "express";
import session from "express-session";
import Redis from "ioredis";
import sirv from "sirv";
import apiRoutes from "./api/routes";
import { COOKIE_NAME, __dev__, __prod__ } from "./constants";
import { setContext } from "./middlewares/setContext";

dotenv.config();

const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS);

const prisma = new PrismaClient({
  log: __prod__ ? [] : ["query", "info", "warn"],
});

const app = express()
  .use(json())
  .use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "secret", // TODO
      resave: false,
    })
  )
  .use(setContext({ prisma, redis }))
  // api routes
  .use("/api", apiRoutes)
  // client side routing
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev: __dev__ }),
    sapper.middleware({
      ignore: [(uri: string) => uri.startsWith("/api")],
      session: (req: Request) => {
        return { user: req.session?.user };
      },
    })
  );

app.listen(process.env.PORT);
