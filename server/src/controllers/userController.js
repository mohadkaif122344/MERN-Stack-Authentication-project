import userModel from "../module/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select(
        "-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt",
      );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      userData: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const isAuthenticated = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is authenticated",
  });
};
