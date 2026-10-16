import express from "express";
import userAuthMiddleware from "../middleware/useAuthMiddleware.js";
import { getUserData, isAuthenticated } from "../controllers/userController.js";
import useAuthMiddleware from "../middleware/useAuthMiddleware.js";

const userRouter = express.Router();

userRouter.get("/is-auth", useAuthMiddleware, isAuthenticated);

userRouter.get("/data", userAuthMiddleware, getUserData);

export default userRouter;
