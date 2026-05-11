import express from 'express';
import * as hospitalController from '../controllers/hospitalController.js';

const router = express.Router();

// Base routes
router.get('/', hospitalController.getHospitals);
router.get('/search', hospitalController.searchHospitals);
router.get('/filter', hospitalController.filterHospitals);

// Live data
router.get('/live-status', hospitalController.getLiveStatus);
router.get('/alerts', hospitalController.getAlerts);

// ID specific routes
router.get('/:id', hospitalController.getHospitalById);
router.post('/favorite/:id', hospitalController.toggleFavorite);

export default router;
