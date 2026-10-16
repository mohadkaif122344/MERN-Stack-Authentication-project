import express from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  login,
  logout,
  manageImage,
  register,
  sendForgotOtp,
  sendVerifyOtp,
  updateProfile,
  verifyEmail,
} from "../controllers/authController.js";

import upload from "../middleware/uploadMiddleware.js";
import useAuthMiddleware from "../middleware/useAuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/send-forgot-otp", sendForgotOtp)

authRouter.post("/forgot-password", forgotPassword);

authRouter.delete("/deleteUser", useAuthMiddleware, deleteUser);

authRouter.post("/send-verify-otp", useAuthMiddleware, sendVerifyOtp);

authRouter.post("/verify-account", useAuthMiddleware, verifyEmail);


authRouter.post("/change-password", useAuthMiddleware, changePassword);

authRouter.post("/profile-image/:id", useAuthMiddleware,upload.single("image"),manageImage);

authRouter.put("/update-profile/:id", useAuthMiddleware, updateProfile);

export default authRouter;
