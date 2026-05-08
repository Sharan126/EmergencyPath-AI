import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Circle } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NavigationMap.css';

// Approximate coordinates in Bangalore
const ORIGIN = [12.9716, 77.5946]; // Vidhana Soudha
const DESTINATION = [12.9352, 77.6245]; // Koramangala

// Mock Route Coordinates (Simplified paths)
const routeACoords = [
  ORIGIN,
  [12.9650, 77.5980],
  [12.9550, 77.6050],
  [12.9450, 77.6150],
  DESTINATION
];

const routeBCoords = [
  ORIGIN,
  [12.9680, 77.6050],
  [12.9580, 77.6180],
  [12.9420, 77.6200],
  DESTINATION
];

const routeCCoords = [
  ORIGIN,
  [12.9600, 77.5850],
  [12.9400, 77.5950],
  [12.9300, 77.6100],
  DESTINATION
];

const createCustomIcon = (type) => {
  let html = '';
  if (type === 'hospital') {
    html = `<div class="map-icon-dest"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></div>`;
  } else if (type === 'ambulance') {
    html = `
      <div class="map-icon-amb-container">
        <div class="map-icon-amb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7h-3V6a4 4 0 0 0-4-4H4a2 2 0 0 0-2 2v10h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-3z"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg></div>
        <div class="map-icon-amb-pulse"></div>
      </div>
    `;
  }

  return divIcon({
    className: 'custom-div-icon',
    html,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const NavigationMap = ({ activeRoute }) => {
  // Simulate ambulance movement along active route
  const [ambulancePos, setAmbulancePos] = useState(ORIGIN);

  useEffect(() => {
    // Reset to start when route changes
    setAmbulancePos(ORIGIN);
    
    // In a real app, this would interpolate along the polyline.
    // For demo purposes, we'll just snap it to a mid-point after a delay.
    let targetRoute = routeBCoords;
    if (activeRoute === 'A') targetRoute = routeACoords;
    if (activeRoute === 'C') targetRoute = routeCCoords;

    const timer = setTimeout(() => {
      setAmbulancePos(targetRoute[1]); // Move to first node
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeRoute]);

  const getPolylineColor = (id) => {
    if (id === activeRoute) {
      if (id === 'A') return '#3b82f6'; // Blue
      if (id === 'B') return '#22c55e'; // Green
      if (id === 'C') return '#f59e0b'; // Amber
    }
    return '#475569'; // Inactive Gray
  };

  const getPolylineWidth = (id) => (id === activeRoute ? 6 : 3);
  const getPolylineOpacity = (id) => (id === activeRoute ? 1 : 0.4);

  return (
    <div className="navigation-map-wrapper">
      <MapContainer 
        center={[12.95, 77.605]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />

        {/* Hazards */}
        <Circle center={[12.9550, 77.6050]} radius={300} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.3 }} />
        <Circle center={[12.9400, 77.5950]} radius={400} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.3 }} />

        {/* Routes */}
        <Polyline positions={routeACoords} pathOptions={{ color: getPolylineColor('A'), weight: getPolylineWidth('A'), opacity: getPolylineOpacity('A') }} />
        <Polyline positions={routeBCoords} pathOptions={{ color: getPolylineColor('B'), weight: getPolylineWidth('B'), opacity: getPolylineOpacity('B') }} className={activeRoute === 'B' ? 'glow-path-green' : ''} />
        <Polyline positions={routeCCoords} pathOptions={{ color: getPolylineColor('C'), weight: getPolylineWidth('C'), opacity: getPolylineOpacity('C') }} />

        {/* Origin / Ambulance */}
        <Marker position={ambulancePos} icon={createCustomIcon('ambulance')}>
          <Popup>Unit KA-01-A-111<br/>Speed: 62km/h</Popup>
        </Marker>

        {/* Destination */}
        <Marker position={DESTINATION} icon={createCustomIcon('hospital')}>
          <Popup>City Trauma Center<br/>ICU Beds Available</Popup>
        </Marker>

      </MapContainer>

      {/* Map Overlays */}
      <div className="map-overlay-top">
        <div className="map-badge">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE TRACKING
        </div>
        <div className="map-badge">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          V2X ACTIVE
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;
