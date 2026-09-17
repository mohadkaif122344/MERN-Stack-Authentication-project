import express from "express";
import userAuthMiddleware from "../middleware/useAuthMiddleware.js";
import {deleteNotification, getUserData, getUserNotifications } from "../controllers/userController.js";
import useAuthMiddleware from "../middleware/useAuthMiddleware.js";
import { isAuthenticated } from "../controllers/authController.js";

const userRouter = express.Router();


userRouter.get("/is-auth", useAuthMiddleware, isAuthenticated);

userRouter.get("/data", userAuthMiddleware, getUserData);

userRouter.get("/notifications", useAuthMiddleware, getUserNotifications);

userRouter.delete("/notifications/:id", useAuthMiddleware, deleteNotification);
export default userRouter;
