import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Map as MapIcon, Layers, Radio } from 'lucide-react';
import './TrafficMap.css';

// Map center for Bangalore concept
const MAP_CENTER = [12.9716, 77.5946];

// Simulated Route Path
const routePoints = [
  [12.9716, 77.5946], // Start
  [12.9720, 77.5970], // Green
  [12.9740, 77.5990], // Yellow
  [12.9750, 77.6010], // Red (traffic)
  [12.9780, 77.6030], // Green
  [12.9816, 77.6046]  // End (Hospital)
];

// Colored segments for traffic simulation
const segment1 = [routePoints[0], routePoints[1], routePoints[2]]; // Smooth
const segment2 = [routePoints[2], routePoints[3]]; // Heavy Traffic
const segment3 = [routePoints[3], routePoints[4], routePoints[5]]; // Smooth

// Create Custom Icons
const createSmartIcon = (type) => {
  let htmlContent = '';
  let className = 'smart-leaflet-icon';

  if (type === 'ambulance') {
    htmlContent = `
      <div class="ambulance-marker glow-pulse">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-3V6a4 4 0 0 0-4-4H4a2 2 0 0 0-2 2v10h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-3zm-9 3H8v2H6v-2H4V8h2V6h2v2h2v2z"/>
        </svg>
      </div>
      <div class="radar-sweep"></div>
    `;
  } else if (type === 'signal') {
    htmlContent = `
      <div class="traffic-signal active-green">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
    `;
  } else if (type === 'hospital') {
    htmlContent = `
      <div class="hospital-target-marker">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
      </div>
    `;
  }

  return divIcon({
    className,
    html: htmlContent,
    iconSize: type === 'signal' ? [20, 40] : [36, 36],
    iconAnchor: type === 'signal' ? [10, 20] : [18, 18],
    popupAnchor: [0, -20]
  });
};

const TrafficMap = () => {
  const [ambPos, setAmbPos] = useState(routePoints[0]);

  // Simulate ambulance moving
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % routePoints.length;
      setAmbPos(routePoints[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card advanced-traffic-map">
      <div className="map-toolbar">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <MapIcon size={18} className="text-blue-500" />
          SMART TRAFFIC CONTROL
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-small"><Layers size={14} /> Layers</button>
          <button className="btn btn-outline btn-small text-red-500 border-red-200 bg-red-50">
            <Radio size={14} /> Live View
          </button>
        </div>
      </div>

      <div className="leaflet-container-wrapper">
        <MapContainer center={MAP_CENTER} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          {/* Dark map theme for futuristic look */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
          />

          {/* Traffic Route Segments */}
          <Polyline positions={segment1} color="#22c55e" weight={6} opacity={0.8} />
          <Polyline positions={segment2} color="#ef4444" weight={6} opacity={0.8} className="congested-path" />
          <Polyline positions={segment3} color="#22c55e" weight={6} opacity={0.8} />

          {/* AI Route Highlight Glow */}
          <Polyline positions={routePoints} color="#3b82f6" weight={12} opacity={0.3} className="route-glow" />

          {/* Danger Zones (Heatmaps) */}
          {/* Flood Zone */}
          <Circle center={[12.9730, 77.5950]} radius={150} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.3, weight: 1 }}>
            <Popup className="dark-popup">Flood Warning Zone</Popup>
          </Circle>
          
          {/* Pothole / Accident Zone */}
          <Circle center={[12.9755, 77.6015]} radius={100} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.4, weight: 1, dashArray: '4' }}>
            <Popup className="dark-popup">Accident Zone - Rerouting advised</Popup>
          </Circle>

          {/* Smart Signals */}
          <Marker position={[12.9720, 77.5970]} icon={createSmartIcon('signal')} />
          <Marker position={[12.9780, 77.6030]} icon={createSmartIcon('signal')} />

          {/* Ambulance */}
          <Marker position={ambPos} icon={createSmartIcon('ambulance')}>
            <Popup className="dark-popup tracking-popup">
              <strong>KA 01 AB 1234</strong>
              <div className="text-green-400 font-bold">Emergency Priority</div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Speed: 65 km/h</span>
                <span>ETA: 9 min</span>
              </div>
            </Popup>
          </Marker>

          {/* Hospital */}
          <Marker position={routePoints[5]} icon={createSmartIcon('hospital')} />

        </MapContainer>

        {/* Floating Map Legends */}
        <div className="map-floating-legend">
          <div className="legend-row"><span className="legend-color bg-green-500"></span> Smooth</div>
          <div className="legend-row"><span className="legend-color bg-yellow-500"></span> Moderate</div>
          <div className="legend-row"><span className="legend-color bg-red-500"></span> Heavy Traffic</div>
          <div className="legend-row"><span className="legend-color bg-blue-500 opacity-50"></span> Smart Corridor</div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
