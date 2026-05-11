import * as notificationService from '../services/notificationService.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);
    res.json(notification);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const notifications = await notificationService.markAllAsRead();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearAll = async (req, res) => {
  try {
    const notifications = await notificationService.clearAllNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
