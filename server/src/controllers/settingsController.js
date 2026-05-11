import { getSettings, saveSettings } from '../services/settingsService.js';

export const getAllSettings = (req, res) => {
  const settings = getSettings();
  if (settings) {
    res.json(settings);
  } else {
    res.status(500).json({ error: 'Failed to retrieve settings' });
  }
};

export const updateAppearanceSettings = (req, res) => {
  const settings = getSettings();
  if (!settings) return res.status(500).json({ error: 'Failed to retrieve settings' });

  settings.appearance = { ...settings.appearance, ...req.body };
  
  if (saveSettings(settings)) {
    res.json(settings.appearance);
  } else {
    res.status(500).json({ error: 'Failed to save appearance settings' });
  }
};

export const updateNotificationSettings = (req, res) => {
  const settings = getSettings();
  if (!settings) return res.status(500).json({ error: 'Failed to retrieve settings' });

  settings.notifications = { ...settings.notifications, ...req.body };
  
  if (saveSettings(settings)) {
    res.json(settings.notifications);
  } else {
    res.status(500).json({ error: 'Failed to save notification settings' });
  }
};

export const updateAISettings = (req, res) => {
  const settings = getSettings();
  if (!settings) return res.status(500).json({ error: 'Failed to retrieve settings' });

  settings.ai = { ...settings.ai, ...req.body };
  
  if (saveSettings(settings)) {
    res.json(settings.ai);
  } else {
    res.status(500).json({ error: 'Failed to save AI settings' });
  }
};

export const updateMapSettings = (req, res) => {
  const settings = getSettings();
  if (!settings) return res.status(500).json({ error: 'Failed to retrieve settings' });

  settings.map = { ...settings.map, ...req.body };
  
  if (saveSettings(settings)) {
    res.json(settings.map);
  } else {
    res.status(500).json({ error: 'Failed to save map settings' });
  }
};
