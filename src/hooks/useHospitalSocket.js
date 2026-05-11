import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useHospitalSocket = () => {
  const [liveStatus, setLiveStatus] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('live-status', (data) => {
      setLiveStatus(data);
    });

    socket.on('alerts', (data) => {
      setAlerts(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { liveStatus, alerts, isConnected };
};
