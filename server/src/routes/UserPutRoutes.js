import express from "express";
import {createBio, updateEmail, updateName } from "../controllers/UserUpdateController.js";
import { removeProfileImage, uploadProfileImage } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";
import useAuthMiddleware from "../middleware/useAuthMiddleware.js";

const UpdateRouter = express.Router();

UpdateRouter.put(
  "/profile/image",useAuthMiddleware,upload.single("profileImage"),
  uploadProfileImage);

UpdateRouter.delete("/profile/image",useAuthMiddleware, useAuthMiddleware, removeProfileImage);

UpdateRouter.put("/update-name",useAuthMiddleware, updateName);

UpdateRouter.put("/update-email",useAuthMiddleware, updateEmail);

UpdateRouter.put("/update-bio",useAuthMiddleware, createBio);

export default UpdateRouter;

