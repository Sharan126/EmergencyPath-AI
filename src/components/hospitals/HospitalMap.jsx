import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Clock } from 'lucide-react';
import { hospitalService } from '../../services/hospitalService';
import './HospitalMap.css';

// Mock data
const ambulancePos = [12.9716, 77.5946];

// Custom icons using Leaflet divIcon
const createCustomIcon = (color, type) => {
  return divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="marker-pin" style="background-color: ${color}">
        <svg viewBox="0 0 24 24" fill="white" class="w-4 h-4">
          ${type === 'ambulance' 
            ? '<path d="M19 7h-3V6a4 4 0 0 0-4-4H4a2 2 0 0 0-2 2v10h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-3zm-9 3H8v2H6v-2H4V8h2V6h2v2h2v2z"/>' 
            : '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>'
          }
        </svg>
      </div>
      ${type === 'ambulance' ? '<div class="pulse-ring"></div>' : ''}
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const ambulanceIcon = createCustomIcon('var(--accent-red)', 'ambulance');
const hospitalIcon = createCustomIcon('var(--status-blue)', 'hospital');
const recommendedHospitalIcon = createCustomIcon('var(--status-green)', 'hospital');

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 14, { animate: true });
    }
  }, [center, map]);
  return null;
};

const HospitalMap = ({ hospitals, selectedHospital, onSelectHospital }) => {
  const [routePositions, setRoutePositions] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    if (selectedHospital) {
      const fetchRoute = async () => {
        try {
          const info = await hospitalService.getRouteToHospital(selectedHospital.id, ambulancePos[0], ambulancePos[1]);
          setRoutePositions(info.routeCoordinates);
          setRouteInfo(info);
        } catch (err) {
          console.error("Failed to fetch route");
        }
      };
      fetchRoute();
    } else {
      setRoutePositions([]);
      setRouteInfo(null);
    }
  }, [selectedHospital]);

  const mapCenter = selectedHospital ? [selectedHospital.location.lat, selectedHospital.location.lng] : ambulancePos;

  return (
    <div className="card map-container">
      <div className="map-header">
        <h3 className="section-title">LIVE EMERGENCY MAP</h3>
        <div className="map-legend">
          <span className="legend-item"><span className="legend-color" style={{backgroundColor: 'var(--accent-red)'}}></span> Ambulance</span>
          <span className="legend-item"><span className="legend-color" style={{backgroundColor: 'var(--status-green)'}}></span> Recommended</span>
          <span className="legend-item"><span className="legend-color" style={{backgroundColor: 'rgba(239, 68, 68, 0.2)'}}></span> Danger Zone</span>
        </div>
      </div>
      
      <div className="leaflet-wrapper">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-sm)' }}>
          <MapUpdater center={mapCenter} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* Ambulance Marker */}
          <Marker position={ambulancePos} icon={ambulanceIcon}>
            <Popup className="custom-popup">
              <strong>KA 01 AB 1234</strong><br/>
              Speed: 62 km/h
            </Popup>
          </Marker>

          {/* Target Recommended Hospital / All Hospitals */}
          {hospitals?.map(hospital => (
            <Marker 
              key={hospital.id}
              position={[hospital.location.lat, hospital.location.lng]} 
              icon={hospital.aiRecommended ? recommendedHospitalIcon : hospitalIcon}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <strong>{hospital.name}</strong>
                  {hospital.aiRecommended && (
                    <span className="text-green text-xs font-bold block mb-1">AI Best Match</span>
                  )}
                  <div className="flex gap-2 text-xs mt-1">
                    <span className="flex items-center gap-1"><Navigation size={12}/> {hospital.distance}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {hospital.eta}</span>
                  </div>
                  <button 
                    className="btn btn-primary w-full mt-2 py-1 text-xs"
                    onClick={() => onSelectHospital(hospital)}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Route Polyline */}
          {routePositions.length > 0 && (
             <Polyline positions={routePositions} color="var(--status-blue)" weight={4} dashArray="8, 8" />
          )}
          
          {/* Danger Zone (Traffic/Potholes) */}
          <Circle center={[12.9730, 77.5970]} radius={200} pathOptions={{ color: 'var(--accent-red)', fillColor: 'var(--accent-red)', fillOpacity: 0.2, weight: 1 }} />
        </MapContainer>
      </div>

      {selectedHospital && routeInfo && (
        <div className="map-overlay-card">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-500 font-semibold mb-1">NAVIGATING TO</div>
              <div className="font-bold text-gray-800">{selectedHospital.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">{routeInfo.eta}</div>
              <div className="text-xs text-gray-500">{routeInfo.distance}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalMap;
