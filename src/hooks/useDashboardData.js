import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { calculateRouteAPI, getDashboardStatusAPI } from '../services/api';

export const useDashboardData = () => {
  const [dashboardStatus, setDashboardStatus] = useState(null);
  const [routesData, setRoutesData] = useState({ recommendedRoute: null, allRoutes: [] });
  const [ambulanceData, setAmbulanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial dashboard status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getDashboardStatusAPI();
        setDashboardStatus(data);
      } catch (err) {
        console.error("Failed to fetch dashboard status", err);
        setError("Failed to load dashboard status");
      }
    };
    fetchStatus();
  }, []);

  // Connect to WebSocket for ambulance updates
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('ambulanceUpdate', (data) => {
      setAmbulanceData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const calculateRoute = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await calculateRouteAPI(payload);
      setRoutesData(data);
    } catch (err) {
      console.error("Failed to calculate route", err);
      setError("Failed to calculate route");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dashboardStatus,
    routesData,
    ambulanceData,
    loading,
    error,
    calculateRoute
  };
};
