import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { RadioTower, Ambulance } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './LiveMonitoringWidget.css';

const MAP_CENTER = [12.9716, 77.5946];

const createLiveAmbulanceIcon = (status) => {
  const colorClass = status === 'emergency' ? 'amb-emergency' : 'amb-active';
  
  const html = `
    <div class="live-amb-marker">
      <div class="live-amb-inner ${colorClass}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      </div>
      <div class="live-amb-pulse ${colorClass}-pulse"></div>
    </div>
  `;

  return divIcon({
    className: 'live-amb-div-icon',
    html,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const activeAmbulances = [
  { id: 1, pos: [12.9750, 77.6000], status: 'emergency', unit: 'KA-01-A-111', speed: '65 km/h' },
  { id: 2, pos: [12.9600, 77.5800], status: 'active', unit: 'KA-01-B-222', speed: '42 km/h' },
  { id: 3, pos: [12.9800, 77.5700], status: 'emergency', unit: 'KA-01-C-333', speed: '70 km/h' }
];

const LiveMonitoringWidget = () => {
  return (
    <div className="card live-monitoring-widget">
      <div className="flex justify-between items-center mb-3">
        <h3 className="section-title flex items-center gap-2">
          <RadioTower size={16} className="text-green-500 animate-pulse" />
          LIVE SECTOR MAP
        </h3>
        <span className="live-status-badge">3 ACTIVE</span>
      </div>
      
      <div className="mini-map-container">
        <MapContainer center={MAP_CENTER} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false} dragging={false} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {activeAmbulances.map(amb => (
            <Marker key={amb.id} position={amb.pos} icon={createLiveAmbulanceIcon(amb.status)}>
              <Popup>
                <div className="text-xs font-bold text-gray-800">{amb.unit}</div>
                <div className="text-xs text-gray-500">Speed: {amb.speed}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Code Red (2)</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> En Route (1)</span>
      </div>
    </div>
  );
};

export default LiveMonitoringWidget;
