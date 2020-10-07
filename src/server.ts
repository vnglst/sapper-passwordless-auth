import * as sapper from "@sapper/server";
import compression from "compression";
import express, { Response, Request, NextFunction } from "express";
import { json } from "body-parser";
import sirv from "sirv";
import Redis from "ioredis";
import session from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import { __prod__, COOKIE_NAME, __dev__ } from "@shared/constants";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS);

const prisma = new PrismaClient({
  log: __prod__ ? [] : ["query", "info", "warn"],
});

declare global {
  export interface RedisStore {
    client: Redis.Redis;
  }
  namespace Express {
    export interface Request {
      sessionStore: RedisStore;
      context: { db: PrismaClient };
    }
  }
}

function setContext(context: { db: PrismaClient }) {
  return function (req: Request, _res: Response, next: NextFunction) {
    req.context = context;
    next();
  };
}

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
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev: __dev__ }),
    setContext({ db: prisma }),
    sapper.middleware({
      session: (req: Request, _res: Response) => {
        // res.setHeader("cache-control", "no-cache, no-store");
        return { user: req.session?.user };
      },
    })
  );

app.listen(process.env.PORT);
