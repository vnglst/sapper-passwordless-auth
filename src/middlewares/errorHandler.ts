import type { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

export const errorHandler: ErrorRequestHandler = function (
  error,
  _req,
  res,
  next
) {
  if (error instanceof ValidationError) {
    return res.status(422).json(error);
  }

  // TODO implement error handling
  return next(error);
};
