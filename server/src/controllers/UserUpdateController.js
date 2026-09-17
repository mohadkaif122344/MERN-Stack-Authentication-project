import userModel from "../module/userModel.js";
import { createAutoNotification } from "../services/notificationService.js";

// Update Name
export const updateName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { name: name.trim() },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const msg = "Name updated successfully";
    await createAutoNotification(req.userId, msg);
    return res.json({
      success: true,
      message: msg,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update Email
export const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const formattedEmail = email.toLowerCase().trim();
    const exists = await userModel.findOne({
      email: formattedEmail,
      _id: { $ne: req.userId },
    });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      {
        email: formattedEmail,
        isAccountVerified: false,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const msg = "Email updated successfully";
    await createAutoNotification(req.userId, msg);
    return res.json({
      success: true,
      message: msg,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Bio Create and Update
export const createBio = async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({
        success: false,
        message: "Bio is required",
      });
    }
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { bio: bio.trim() },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const msg = "Bio saved successfully";
    await createAutoNotification(req.userId, msg);
    return res.status(200).json({
      success: true,
      message: msg,
      bio: user.bio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};