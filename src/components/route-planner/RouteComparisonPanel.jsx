import React from 'react';
import { ShieldCheck, Zap, AlertOctagon, TrendingDown, ThermometerSnowflake } from 'lucide-react';
import './RouteComparisonPanel.css';

const routes = [
  {
    id: 'A',
    name: 'Fastest Route',
    eta: '8m 45s',
    dist: '4.2 km',
    safety: 75,
    tag: 'HIGH TRAFFIC',
    icon: Zap,
    colorClass: 'route-blue',
    warnings: ['Heavy congestion at MG Road', 'Pothole cluster detected'],
    aiReason: 'Route A is geographically shortest but contains moderate traffic risks.'
  },
  {
    id: 'B',
    name: 'AI Recommended (Safest & Smooth)',
    eta: '6m 12s',
    dist: '5.1 km',
    safety: 98,
    tag: 'OPTIMIZED',
    icon: ShieldCheck,
    colorClass: 'route-green',
    warnings: [],
    aiReason: 'Route B selected because Route A contains severe potholes and heavy traffic which may affect critical patient stability. V2X signals are pre-cleared.'
  },
  {
    id: 'C',
    name: 'Alternative (Weather Bypass)',
    eta: '12m 30s',
    dist: '4.8 km',
    safety: 85,
    tag: 'AVOIDING FLOODS',
    icon: ThermometerSnowflake,
    colorClass: 'route-amber',
    warnings: ['Slippery road conditions'],
    aiReason: 'Route C completely bypasses the East underpass which is currently flooded.'
  }
];

const RouteComparisonPanel = ({ activeRoute, setActiveRoute }) => {
  return (
    <div className="route-comparison-container">
      <h3 className="section-title mb-3 px-1 text-gray-200">AI ROUTE COMPARISON</h3>
      
      <div className="route-cards-wrapper">
        {routes.map(route => {
          const Icon = route.icon;
          const isActive = activeRoute === route.id;
          
          return (
            <div 
              key={route.id} 
              className={`route-card ${route.colorClass} ${isActive ? 'active' : ''}`}
              onClick={() => setActiveRoute(route.id)}
            >
              {isActive && <div className="active-glow-overlay"></div>}
              
              <div className="route-card-header">
                <div className="flex items-center gap-2">
                  <div className="route-letter">{route.id}</div>
                  <h4 className="route-name">{route.name}</h4>
                </div>
                {isActive && <span className="active-badge">SELECTED</span>}
              </div>

              <div className="route-metrics">
                <div className="metric-box">
                  <span className="metric-label">ETA</span>
                  <span className="metric-value">{route.eta}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Distance</span>
                  <span className="metric-value">{route.dist}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Safety Score</span>
                  <span className={`metric-value ${route.safety > 90 ? 'text-green-400' : 'text-amber-400'}`}>
                    {route.safety}/100
                  </span>
                </div>
              </div>

              {isActive && (
                <div className="route-ai-reasoning">
                  <strong>⚡ Why AI selected this route:</strong>
                  <p>{route.aiReason}</p>
                </div>
              )}

              {route.warnings.length > 0 && (
                <div className="route-warnings">
                  {route.warnings.map((warn, idx) => (
                    <div key={idx} className="warning-item">
                      <AlertOctagon size={12} /> {warn}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RouteComparisonPanel;
