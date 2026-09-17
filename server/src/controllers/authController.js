import userModel from "../module/userModel.js";
import jwt from "jsonwebtoken";
import {
  sendWelcomeEmail,
  sendVerifyOtpEmail,
  sendResetOtpEmail,
} from "../services/emailService.js";
import cloudinary from "../config/cloudinary.js";
import { createAutoNotification } from "../services/notificationService.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const user = new userModel({ name, email, password });
    await user.save();

    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Sending welcome email
    sendWelcomeEmail(email).catch(console.error);

    const msg = "User registered successfully";
     createAutoNotification(user._id, msg);
    return res.status(201).json({ success: true, message: msg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const msg = "Logged in successfully";
    await createAutoNotification(user._id, msg);
    return res.status(200).json({ success: true, message: msg });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Logout
export const logout = async (_, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await userModel.findByIdAndDelete(req.userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Send verification otp on Email
export const sendVerifyOtp = async (req, res) => {
  try {
     const userId = req.userId || req.body?.userId; 
    const user = await userModel.findById(userId);
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    await sendVerifyOtpEmail(user.email, user.name, otp);

    const successMsg = "Verification OTP send to your email";
    await createAutoNotification(userId, successMsg);
    return res.json({ success: true, message: successMsg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Email using OTP
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "OTP is required",
    });
  }
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    const successMsg = "Email verified successfully";
    await createAutoNotification(req.userId, successMsg);
    return res.status(200).json({
      success: true,
      message: successMsg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//check if user is authenticated
export const isAuthenticated = async (_, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User is authenticated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Send Forgot Password OTP
export const sendForgotOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    await sendResetOtpEmail(user.email, otp);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Forgot User Password
export const forgotPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP, and password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }
    user.password = newPassword;

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    const successMsg = "Password has been reset successfully";
    await createAutoNotification(user._id, successMsg);
    return res.status(200).json({ success: true, message: successMsg });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Change Password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All password fields are required",
    });
  }
  try {
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Google account does not have a password",
      });
    }
    const isCorrect = await user.isPasswordCorrect(currentPassword);

    if (!isCorrect) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    const msg = "Password updated successfully";
    await createAutoNotification(req.userId, msg);
    return res.status(200).json({ success: true, message: msg });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId; 

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please select an image" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadStream();

    if (user.removeImagePublicId) {
      await cloudinary.uploader.destroy(user.removeImagePublicId);
    }
    user.profileImage = result.secure_url;
    user.removeImagePublicId = result.public_id;
    await user.save();

    const msg = "Profile picture uploaded successfully";
    await createAutoNotification(userId, msg);
    return res
      .status(200)
      .json({ success: true, message: msg, image: user.profileImage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Remove profile Image
export const removeProfileImage = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.removeImagePublicId) {
      await cloudinary.uploader.destroy(user.removeImagePublicId);
    }

    user.profileImage = "";
    user.removeImagePublicId = "";
    await user.save();

    const msg = "Profile picture removed successfully";
    await createAutoNotification(req.userId, msg);
    return res.status(200).json({ success: true, message: msg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



