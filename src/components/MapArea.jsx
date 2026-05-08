import React from 'react';
import './MapArea.css';

const MapArea = () => {
  return (
    <div className="map-area card">
      <div className="map-background"></div>
      
      {/* Map Controls */}
      <div className="map-controls-left">
        <button className="map-control-btn">+</button>
        <div className="map-control-divider"></div>
        <button className="map-control-btn">-</button>
        <div className="map-control-divider"></div>
        <button className="map-control-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
          </svg>
        </button>
      </div>

      <div className="map-controls-right">
        <button className="map-dropdown-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Traffic
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* SVG Map Routes */}
      <div className="svg-routes-container">
         <svg viewBox="0 0 800 400" className="routes-svg">
            {/* Route A (Green) */}
            <path d="M 100,200 Q 250,50 400,100 T 700,200" className="route-path route-green-path" />
            <rect x="420" y="80" width="80" height="24" rx="12" className="route-label-bg route-green-label" />
            <text x="460" y="96" className="route-label-text">Route A</text>

            {/* Route B (Red - Straight/Recommended) */}
            <path d="M 100,200 L 700,200" className="route-path route-red-path" />
            <rect x="420" y="188" width="80" height="24" rx="12" className="route-label-bg route-red-label" />
            <text x="460" y="204" className="route-label-text text-white">Route B</text>

            {/* Route C (Blue) */}
            <path d="M 100,200 Q 250,350 400,300 T 700,200" className="route-path route-blue-path" />
            <rect x="420" y="288" width="80" height="24" rx="12" className="route-label-bg route-blue-label" />
            <text x="460" y="304" className="route-label-text text-white">Route C</text>

            {/* Start Node */}
            <circle cx="100" cy="200" r="8" className="node-start" />
            {/* End Node */}
            <circle cx="700" cy="200" r="8" className="node-end" />
         </svg>
         
         {/* Moving Ambulance */}
         <div className="moving-ambulance" style={{ left: '20%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="ambulance-sprite">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7h-3V6a4 4 0 0 0-4-4H4a2 2 0 0 0-2 2v10h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-3zm-9 3H8v2H6v-2H4V8h2V6h2v2h2v2zM7 16a1 1 0 1 1-1-1 1 1 0 0 1 1 1zm10 0a1 1 0 1 1-1-1 1 1 0 0 1 1 1zm4-3h-1.2A3.012 3.012 0 0 0 17 11.2V9l2.4 2.4zM16 8V6a2 2 0 0 0-2-2H4v10h1.2A3.012 3.012 0 0 0 8 12.2V10h6v2.2A3.012 3.012 0 0 0 17 14h3v1z" />
              </svg>
            </div>
         </div>

         {/* Destination Hospital */}
         <div className="destination-hospital" style={{ left: '87.5%', top: '50%', transform: 'translate(-50%, -100%)' }}>
           <div className="hospital-marker">
             <svg viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
             </svg>
           </div>
         </div>
      </div>

      {/* Live Tracking Overlay */}
      <div className="live-tracking-overlay glass">
        <div className="tracking-left">
          <div className="tracking-status">
            <span className="live-dot pulse"></span>
            LIVE TRACKING
          </div>
          <div className="tracking-message">Ambulance moving...</div>
        </div>
        <div className="tracking-right">
          <div className="distance-value">6.2 km</div>
          <div className="distance-label">to destination</div>
        </div>
      </div>
    </div>
  );
};

export default MapArea;
