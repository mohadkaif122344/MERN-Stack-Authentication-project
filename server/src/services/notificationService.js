import notificationModel from "../module/notificationModel.js";

export const createAutoNotification = async (userId, message) => {
  try {
    const notification = new notificationModel({
      userId,
      message: message.trim(),
      isRead: false
    });
    await notification.save();
  } catch (error) {
    console.error("Error creating simple notification:", error.message);
  }
};
