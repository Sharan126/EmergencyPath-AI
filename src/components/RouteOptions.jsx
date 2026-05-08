import React from 'react';
import './RouteOptions.css';

const routes = [
  {
    id: 'B',
    name: 'Route B',
    recommended: true,
    eta: '11 min',
    potholes: '2',
    score: '85',
    colorClass: 'route-red',
    reason: 'Critical patient + rain makes potholes very dangerous. 3 min delay is worth zero pothole risk.'
  },
  {
    id: 'A',
    name: 'Route A',
    recommended: false,
    eta: '8 min',
    potholes: '12',
    score: '45',
    colorClass: 'route-green',
    reason: 'Faster but has more potholes and wet road conditions.'
  },
  {
    id: 'C',
    name: 'Route C',
    recommended: false,
    eta: '9 min',
    potholes: '6',
    score: '62',
    colorClass: 'route-blue',
    reason: 'Moderate traffic and medium road smoothness.'
  }
];

const RouteOptions = () => {
  return (
    <div className="route-options-container">
      <h2 className="section-title">
        <span className="dot-pulse"></span>
        AI RECOMMENDED ROUTE
      </h2>
      
      <div className="routes-list">
        {routes.map(route => (
          <div key={route.id} className={`route-card ${route.colorClass} ${route.recommended ? 'recommended' : ''}`}>
            <div className="route-header">
              <h3>
                {route.name}
                {route.recommended && <span className="recommended-badge">(Recommended)</span>}
              </h3>
              {route.recommended && (
                <div className="star-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="route-stats">
              <div className="stat-item">
                <span className="stat-value">{route.eta}</span>
                <span className="stat-label">ETA</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{route.potholes}</span>
                <span className="stat-label">Potholes</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{route.score} <span className="score-max">/100</span></span>
                <span className="stat-label">Safety Score</span>
              </div>
            </div>
            
            <div className="route-reason">
              {route.recommended ? <strong>Reason: </strong> : ''}
              {route.reason}
            </div>
          </div>
        ))}
      </div>
      
      <button className="btn btn-outline compare-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        COMPARE ALL ROUTES
      </button>
    </div>
  );
};

export default RouteOptions;
