import express from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { handleAsyncErrors } from "./apiHelpers/asyncUtil";
import { getHealth } from "./controllers/health";
import { postLogin } from "./controllers/login";
import { getLogout } from "./controllers/logout";
import { postRegister } from "./controllers/register";
import { getToken } from "./controllers/token";

const router = express.Router();

// routes
router.get("/health", handleAsyncErrors(getHealth));
router.get("/login/:token", handleAsyncErrors(getToken));
router.post("/login", handleAsyncErrors(postLogin));
router.post("/register", handleAsyncErrors(postRegister));
router.get("/logout", handleAsyncErrors(getLogout));

// middlewares
router.use(errorHandler);

export default router;
