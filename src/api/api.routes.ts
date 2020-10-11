import express from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { handleAsyncErrors } from "./api.helpers";
import { getHealth } from "./health";
import { postLogin, getLogout, postRegister, getToken } from "./users";

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
