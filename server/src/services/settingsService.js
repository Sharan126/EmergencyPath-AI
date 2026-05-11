import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SETTINGS_FILE_PATH = path.join(__dirname, '../data/settings.json');

export const getSettings = () => {
  try {
    const data = fs.readFileSync(SETTINGS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings.json:', error);
    return null;
  }
};

export const saveSettings = (newSettings) => {
  try {
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(newSettings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing settings.json:', error);
    return false;
  }
};
