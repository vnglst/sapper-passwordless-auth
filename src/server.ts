import * as sapper from "@sapper/server";
import compression from "compression";
import express from "express";
import sirv from "sirv";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__, COOKIE_NAME } from "./constants";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);

express()
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
    }),
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT);
