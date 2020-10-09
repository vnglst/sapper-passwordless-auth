import type { Response, Request, NextFunction, RequestHandler } from "express";

export const setContext: {
  (context: Express.RequestContext): RequestHandler;
} = function (context) {
  return function (req: Request, _res: Response, next: NextFunction) {
    req.context = context;
    next();
  };
};
