import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import authRoutes from './routes/authRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import setupAmbulanceSocket from './sockets/ambulanceSocket.js';
import setupHospitalSocket from './sockets/hospitalSocket.js';
import setupNotificationSocket from './sockets/notificationSocket.js';

const app = express();
const server = http.createServer(app);

// Enable CORS for all origins during development
app.use(cors({ origin: '*' }));
app.use(express.json());

// Set up API routes
app.use('/api', apiRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// Set up Socket.io
const io = new Server(server, {
  cors: { origin: '*' }
});

setupAmbulanceSocket(io);
setupHospitalSocket(io);
setupNotificationSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
