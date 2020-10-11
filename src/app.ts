import dotenv from "dotenv";
import * as sapper from "@sapper/server";
import { json } from "body-parser";
import compression from "compression";
import express, { Request } from "express";
import session from "express-session";
import helmet from "helmet";
import sirv from "sirv";
import apiRoutes from "./api/api.routes";
import { COOKIE_NAME, __dev__, __prod__ } from "./constants";
import { RedisStore, redis } from "./services/redis";

dotenv.config({ path: ".env" });

export const app = express()
  .use(
    helmet({
      // TODO: review security settings, especially CSP
      contentSecurityPolicy: __prod__
        ? {
            reportOnly: true,
          }
        : false,
    })
  )
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
      secret: process.env.COOKIE_SECRET!,
      resave: false,
    })
  )
  .use("/api", apiRoutes)
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
