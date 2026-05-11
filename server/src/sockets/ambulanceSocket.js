const setupAmbulanceSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    let distance = 6.2; // initial km
    let lat = 12.9716; // mock start lat
    let lng = 77.5946; // mock start lng
    
    const interval = setInterval(() => {
      // Simulate movement
      distance = Math.max(0, distance - 0.1);
      lat += 0.0005;
      lng += 0.0005;
      
      const speed = Math.floor(Math.random() * (75 - 55 + 1) + 55); // Random speed between 55 and 75
      
      socket.emit('ambulanceUpdate', {
        status: distance > 0 ? "Live" : "Arrived",
        speed: `${speed} km/h`,
        distanceRemaining: `${distance.toFixed(1)} km`,
        position: [lat, lng],
        vehicleNumber: "KA 01 AB 1234"
      });
      
      if (distance <= 0) {
        clearInterval(interval);
      }
    }, 3000); // Update every 3 seconds

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      clearInterval(interval);
    });
  });
};

export default setupAmbulanceSocket;
