import pino from "pino";
import { __dev__ } from "../constants";

export const logger = pino({
  prettyPrint: __dev__ ? { colorize: true } : false,
});
