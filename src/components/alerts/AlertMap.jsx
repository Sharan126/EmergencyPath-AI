import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { ShieldAlert, CloudRain, AlertTriangle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './AlertMap.css';

const MAP_CENTER = [12.9716, 77.5946];

const createHazardIcon = (type) => {
  let html = '';
  let className = 'hazard-icon-marker';
  
  if (type === 'critical') {
    html = `
      <div class="hazard-icon-inner critical-hazard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div class="hazard-pulse-ring critical-pulse"></div>
    `;
  } else if (type === 'weather') {
    html = `
      <div class="hazard-icon-inner weather-hazard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/>
          <path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>
        </svg>
      </div>
    `;
  } else {
    html = `
      <div class="hazard-icon-inner warning-hazard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
    `;
  }

  return divIcon({
    className,
    html,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

const AlertMap = () => {
  return (
    <div className="card alert-map-container">
      <div className="alert-map-header flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h3 className="section-title">LIVE HAZARD MAP</h3>
        <div className="flex gap-3 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Weather</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning</span>
        </div>
      </div>
      
      <div className="alert-leaflet-wrapper">
        <MapContainer center={MAP_CENTER} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          {/* Light modern map for clear visibility of alerts */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Critical Accident Zone */}
          <Circle center={[12.9750, 77.6000]} radius={300} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2, stroke: false }}>
            <Marker position={[12.9750, 77.6000]} icon={createHazardIcon('critical')}>
              <Popup className="hazard-popup">
                <div className="p-1">
                  <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
                    <ShieldAlert size={16} /> MULTI-VEHICLE ACCIDENT
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Outer Ring Road completely blocked. Emergency services on scene.</p>
                  <div className="bg-red-50 p-2 rounded border border-red-100 text-xs text-red-700">
                    <strong>AI Recommendation:</strong> Diverting all ambulances to Route B. Do not approach sector 4.
                  </div>
                </div>
              </Popup>
            </Marker>
          </Circle>

          {/* Flood Warning Zone */}
          <Circle center={[12.9600, 77.5800]} radius={500} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.2, weight: 1, dashArray: '4' }}>
            <Marker position={[12.9600, 77.5800]} icon={createHazardIcon('weather')}>
              <Popup className="hazard-popup">
                <div className="p-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                    <CloudRain size={16} /> SEVERE FLOODING
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Water logging &gt; 2ft in underpass.</p>
                  <div className="bg-blue-50 p-2 rounded border border-blue-100 text-xs text-blue-700">
                    <strong>AI Recommendation:</strong> Routing ambulances via flyover.
                  </div>
                </div>
              </Popup>
            </Marker>
          </Circle>

          {/* Construction Warning */}
          <Marker position={[12.9800, 77.5700]} icon={createHazardIcon('warning')}>
            <Popup className="hazard-popup">
               <div className="p-1">
                  <div className="flex items-center gap-2 text-amber-600 font-bold mb-1">
                    <AlertTriangle size={16} /> ROADWORKS
                  </div>
                  <p className="text-xs text-gray-600">Expected delay: 10 mins.</p>
                </div>
            </Popup>
          </Marker>

        </MapContainer>
      </div>
    </div>
  );
};

export default AlertMap;
