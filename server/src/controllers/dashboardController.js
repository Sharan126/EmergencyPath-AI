import { dashboardStatus } from '../data/mockData.js';

export const getDashboardStatus = (req, res) => {
  try {
    res.json(dashboardStatus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard status" });
  }
};
