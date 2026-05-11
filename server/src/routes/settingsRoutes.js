import express from 'express';
import {
  getAllSettings,
  updateAppearanceSettings,
  updateNotificationSettings,
  updateAISettings,
  updateMapSettings
} from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getAllSettings);
router.put('/appearance', updateAppearanceSettings);
router.put('/notifications', updateNotificationSettings);
router.put('/ai', updateAISettings);
router.put('/map', updateMapSettings);

export default router;
