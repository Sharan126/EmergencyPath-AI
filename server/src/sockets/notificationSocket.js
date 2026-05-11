import * as notificationService from '../services/notificationService.js';

export default function setupNotificationSocket(io) {
  const notificationNamespace = io.of('/notifications');

  notificationNamespace.on('connection', (socket) => {
    console.log(`Notification Socket connected: ${socket.id}`);

    const emitInitialNotifications = async () => {
      try {
        const notifications = await notificationService.getAllNotifications();
        socket.emit('initial_notifications', notifications);
      } catch (err) {
        console.error('Error emitting initial notifications', err);
      }
    };
    emitInitialNotifications();

    socket.on('disconnect', () => {
      console.log(`Notification Socket disconnected: ${socket.id}`);
    });
  });

  const sampleNotifications = [
    { title: 'Ambulance Route Updated', description: 'Ambulance KA-01-AB-1234 has been rerouted due to traffic.', type: 'info' },
    { title: 'Emergency Nearby', description: 'Multiple casualty accident reported 2km away.', type: 'critical' },
    { title: 'Hospital Status Changed', description: 'Fortis Healthcare is now on backup power.', type: 'warning' },
    { title: 'Weather Alert', description: 'Heavy rain expected in 30 minutes, expect delays.', type: 'info' }
  ];

  // Emit a random new notification every 30 seconds
  setInterval(async () => {
    try {
      const randomNotif = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      
      const newNotification = {
        id: Date.now().toString(),
        title: randomNotif.title,
        description: randomNotif.description,
        type: randomNotif.type,
        isRead: false,
        timestamp: new Date().toISOString()
      };
      
      // We don't save these to the JSON in this mock to prevent file bloat, 
      // but in a real app, we would save to DB then emit.
      notificationNamespace.emit('new_notification', newNotification);
    } catch (err) {
      console.error('Error in notification interval', err);
    }
  }, 30000);
}
