import * as sapper from "@sapper/server";
import compression from "compression";
import express, { Request } from "express";
import { json } from "body-parser";
import sirv from "sirv";
import Redis from "ioredis";
import session from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import { __prod__, COOKIE_NAME, __dev__ } from "./constants";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
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
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev: __dev__ }),
    sapper.middleware({
      session: (req: Request) => {
        return { user: req.session?.user };
      },
    })
  );
// .use((error: any, _req: any, res: any) => {
//   console.log("middelware", typeof error);
//   if (!error.statusCode) error.statusCode = 500;

//   if (error.statusCode === 301) {
//     return res.status(301).redirect("/not-found");
//   }

//   return res.status(error.statusCode).json({ error: error.toString() });
// });

app.listen(process.env.PORT);
