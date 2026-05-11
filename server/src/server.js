import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import setupAmbulanceSocket from './sockets/ambulanceSocket.js';

const app = express();
const server = http.createServer(app);

// Enable CORS for all origins during development
app.use(cors({ origin: '*' }));
app.use(express.json());

// Set up API routes
app.use('/api', apiRoutes);
app.use('/api/settings', settingsRoutes);

// Set up Socket.io
const io = new Server(server, {
  cors: { origin: '*' }
});

setupAmbulanceSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
