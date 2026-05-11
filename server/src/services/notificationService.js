import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notificationsPath = path.join(__dirname, '../data/notifications.json');

// Helper to read data
async function getNotificationsData() {
  try {
    const data = await fs.readFile(notificationsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to write data
async function writeNotificationsData(data) {
  try {
    await fs.writeFile(notificationsPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing notifications data:', error);
  }
}

export const getAllNotifications = async () => {
  return await getNotificationsData();
};

export const markAsRead = async (id) => {
  const notifications = await getNotificationsData();
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications[index].isRead = true;
    await writeNotificationsData(notifications);
    return notifications[index];
  }
  throw new Error('Notification not found');
};

export const markAllAsRead = async () => {
  const notifications = await getNotificationsData();
  const updated = notifications.map(n => ({ ...n, isRead: true }));
  await writeNotificationsData(updated);
  return updated;
};

export const clearAllNotifications = async () => {
  await writeNotificationsData([]);
  return [];
};
