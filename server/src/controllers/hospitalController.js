import * as hospitalService from '../services/hospitalService.js';

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchHospitals = async (req, res) => {
  try {
    const { q } = req.query;
    const hospitals = await hospitalService.searchHospitals(q);
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterHospitals = async (req, res) => {
  try {
    const { zone, specialty, emergencyType } = req.query;
    const hospitals = await hospitalService.filterHospitals({ zone, specialty, emergencyType });
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHospitalById = async (req, res) => {
  try {
    const hospital = await hospitalService.getHospitalById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const hospital = await hospitalService.toggleFavorite(req.params.id);
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const alerts = await hospitalService.getAlerts();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLiveStatus = async (req, res) => {
  try {
    const status = await hospitalService.getLiveStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHospitalRoute = async (req, res) => {
  try {
    const { hospitalId, originLat, originLng } = req.body;
    if (!hospitalId || !originLat || !originLng) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    const routeInfo = await hospitalService.getRouteToHospital(hospitalId, originLat, originLng);
    res.json(routeInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
