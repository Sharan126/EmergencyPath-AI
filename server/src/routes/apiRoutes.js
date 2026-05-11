import express from 'express';
import { calculateRoute } from '../controllers/routeController.js';
import { getDashboardStatus } from '../controllers/dashboardController.js';
import { getAmbulanceLive } from '../controllers/ambulanceController.js';

const router = express.Router();

router.post('/routes/calculate', calculateRoute);
router.get('/dashboard/status', getDashboardStatus);
router.get('/ambulance/live', getAmbulanceLive);

export default router;
