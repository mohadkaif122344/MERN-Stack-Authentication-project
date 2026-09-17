import express from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  login,
  logout,
  register,
  sendForgotOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import useAuthMiddleware from "../middleware/useAuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register",useAuthMiddleware, register);

authRouter.post("/login",useAuthMiddleware, login);

authRouter.post("/logout",useAuthMiddleware, logout);

authRouter.delete("/deleteUser", useAuthMiddleware, deleteUser);

authRouter.post("/send-verify-otp", useAuthMiddleware, sendVerifyOtp);

authRouter.post("/verify-account", useAuthMiddleware, verifyEmail);

authRouter.post("/send-forgot-otp", sendForgotOtp);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/change-password", useAuthMiddleware, changePassword);


export default authRouter;
