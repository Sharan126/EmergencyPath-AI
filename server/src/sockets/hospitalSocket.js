import * as hospitalService from '../services/hospitalService.js';

export default function setupHospitalSocket(io) {
  io.on('connection', (socket) => {
    console.log(`Hospital Socket connected: ${socket.id}`);

    // Emit initial live status and alerts on connection
    const emitInitialData = async () => {
      try {
        const liveStatus = await hospitalService.getLiveStatus();
        const alerts = await hospitalService.getAlerts();
        socket.emit('live-status', liveStatus);
        socket.emit('alerts', alerts);
      } catch (err) {
        console.error('Error emitting initial socket data', err);
      }
    };
    emitInitialData();

    socket.on('disconnect', () => {
      console.log(`Hospital Socket disconnected: ${socket.id}`);
    });
  });

  // Mock real-time updates every 10 seconds to simulate dynamic hospital metrics
  setInterval(async () => {
    try {
      const liveStatus = await hospitalService.getLiveStatus();
      
      // slightly mutate bed availability to simulate live data
      const randomMutate = (val, max) => {
        let diff = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        let newVal = val + diff;
        if (newVal < 0) newVal = 0;
        if (newVal > max) newVal = max;
        return newVal;
      };

      liveStatus.bedData = liveStatus.bedData.map(b => ({
        ...b,
        available: randomMutate(b.available, b.total)
      }));

      io.emit('live-status', liveStatus);
    } catch (err) {
      console.error('Error in live-status interval', err);
    }
  }, 10000);

  // Mock real-time new alerts every 20 seconds
  const sampleAlerts = [
    { type: 'critical', message: 'Traffic heavy on Outer Ring Road, delaying ambulances' },
    { type: 'warning', message: 'Manipal Hospital ICU reaching capacity' },
    { type: 'warning', message: 'Oxygen levels stabilizing at City Care' },
    { type: 'critical', message: 'New multiple casualty accident reported at North Zone' }
  ];

  setInterval(async () => {
    try {
      const currentAlerts = await hospitalService.getAlerts();
      const randomAlert = sampleAlerts[Math.floor(Math.random() * sampleAlerts.length)];
      
      const newAlert = {
        id: Date.now(),
        type: randomAlert.type,
        message: randomAlert.message,
        timestamp: new Date().toISOString()
      };
      
      // keep only the latest 4 alerts
      const updatedAlerts = [newAlert, ...currentAlerts.slice(0, 3)];
      io.emit('alerts', updatedAlerts);
    } catch (err) {
      console.error('Error in alerts interval', err);
    }
  }, 20000);
}
