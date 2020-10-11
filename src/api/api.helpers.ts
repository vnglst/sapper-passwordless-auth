import type { Handler } from "express";

export const handleAsyncErrors = (fn: Handler): Handler =>
  function asyncUtilWrap(req, res, next) {
    const fnReturn = fn(req, res, next);
    return Promise.resolve(fnReturn).catch(next);
  };
