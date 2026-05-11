import { evaluateRoutes } from '../services/routeLogic.js';
import { dashboardStatus } from '../data/mockData.js';

export const calculateRoute = (req, res) => {
  try {
    const { severity, destination, preferences } = req.body;
    
    // Evaluate the routes based on input logic
    const { recommendedRoute, allRoutes } = evaluateRoutes(severity, preferences, dashboardStatus);
    
    res.json({
      recommendedRoute,
      allRoutes
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate route" });
  }
};
