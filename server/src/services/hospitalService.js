import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hospitalsPath = path.join(__dirname, '../data/hospitals.json');
const alertsPath = path.join(__dirname, '../data/alerts.json');

// Helper to read data
async function getHospitalsData() {
  try {
    const data = await fs.readFile(hospitalsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading hospitals data:', error);
    return [];
  }
}

// Helper to write data
async function writeHospitalsData(data) {
  try {
    await fs.writeFile(hospitalsPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing hospitals data:', error);
  }
}

export const getAllHospitals = async () => {
  return await getHospitalsData();
};

export const searchHospitals = async (query) => {
  const hospitals = await getHospitalsData();
  if (!query) return hospitals;
  
  const q = query.toLowerCase();
  return hospitals.filter(h => 
    h.name.toLowerCase().includes(q) || 
    h.type.toLowerCase().includes(q) ||
    h.specialties.some(s => s.toLowerCase().includes(q))
  );
};

export const filterHospitals = async (filters) => {
  const hospitals = await getHospitalsData();
  
  return hospitals.filter(h => {
    let matches = true;
    if (filters.zone && h.zone !== filters.zone) matches = false;
    if (filters.specialty && !h.specialties.includes(filters.specialty)) matches = false;
    if (filters.emergencyType && !h.emergencyTypes.includes(filters.emergencyType)) matches = false;
    return matches;
  });
};

export const getHospitalById = async (id) => {
  const hospitals = await getHospitalsData();
  return hospitals.find(h => h.id === parseInt(id));
};

export const toggleFavorite = async (id) => {
  const hospitals = await getHospitalsData();
  const index = hospitals.findIndex(h => h.id === parseInt(id));
  if (index !== -1) {
    hospitals[index].isFavorite = !hospitals[index].isFavorite;
    await writeHospitalsData(hospitals);
    return hospitals[index];
  }
  throw new Error('Hospital not found');
};

export const getAlerts = async () => {
  try {
    const data = await fs.readFile(alertsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading alerts data:', error);
    return [];
  }
};

export const getLiveStatus = async () => {
  const hospitals = await getHospitalsData();
  
  // Aggregate stats from all hospitals to represent city-wide overall live status
  let totalIcu = 0, availIcu = 0;
  let totalEmerg = 0, availEmerg = 0;
  let totalOxy = 0, availOxy = 0;
  let totalVent = 0, availVent = 0;
  let totalTrauma = 0, availTrauma = 0;
  
  hospitals.forEach(h => {
    totalIcu += h.stats.icuBedsTotal; availIcu += h.stats.icuBedsAvailable;
    totalEmerg += h.stats.emergencyTotal; availEmerg += h.stats.emergencyAvailable;
    totalOxy += h.stats.oxygenTotal; availOxy += h.stats.oxygenAvailable;
    totalVent += h.stats.ventilatorsTotal; availVent += h.stats.ventilatorsAvailable;
    totalTrauma += h.stats.traumaTotal; availTrauma += h.stats.traumaAvailable;
  });

  return {
    bedData: [
      { name: 'ICU Beds', available: availIcu, total: totalIcu },
      { name: 'Emergency', available: availEmerg, total: totalEmerg },
      { name: 'Oxygen', available: availOxy, total: totalOxy },
      { name: 'Ventilators', available: availVent, total: totalVent },
      { name: 'Trauma', available: availTrauma, total: totalTrauma }
    ],
    overloaded: hospitals.filter(h => h.crowdStatus === 'full').length,
    activeAmbulances: 24 // mock fixed value
  };
};

export const getRouteToHospital = async (hospitalId, originLat, originLng) => {
  const hospital = await getHospitalById(hospitalId);
  if (!hospital) throw new Error('Hospital not found');

  // Generate a mock polyline between origin and hospital location
  // Just a simple 2-point line or slightly interpolated for mock purposes
  const destLat = hospital.location.lat;
  const destLng = hospital.location.lng;

  const routeCoordinates = [
    [originLat, originLng],
    // midpoint for curve maybe, or just straight line
    [(originLat + destLat) / 2 + 0.005, (originLng + destLng) / 2 + 0.005],
    [destLat, destLng]
  ];

  return {
    routeCoordinates,
    eta: hospital.eta,
    distance: hospital.distance,
    safetyScore: hospital.safetyScore
  };
};
