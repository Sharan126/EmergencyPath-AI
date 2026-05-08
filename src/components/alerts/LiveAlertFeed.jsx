import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, Filter, Zap } from 'lucide-react';
import './LiveAlertFeed.css';

const MOCK_ALERTS = [
  {
    id: 1,
    priority: 'critical', // critical, high, medium, low
    title: 'Multi-Vehicle Accident',
    location: 'Outer Ring Road (Sector 4)',
    time: 'Just now',
    source: 'AI Traffic Engine',
    aiAction: 'Critical patient detected. Avoid Route A due to severe potholes and heavy rain. Rerouting all active ambulances to Route B.',
  },
  {
    id: 2,
    priority: 'high',
    title: 'Hospital ICU Overload',
    location: 'Apollo City Hospital',
    time: '4 mins ago',
    source: 'Hospital Node',
    aiAction: 'Diverting non-critical trauma cases to Fortis Healthcare (ETA +5 mins).',
  },
  {
    id: 3,
    priority: 'medium',
    title: 'Severe Flooding Detected',
    location: 'Silk Board Underpass',
    time: '12 mins ago',
    source: 'Weather API',
    aiAction: 'Marking underpass as Danger Zone. Triggering alternate route calculations.',
  },
  {
    id: 4,
    priority: 'low',
    title: 'Ambulance GPS Reconnected',
    location: 'Vehicle KA 01 AB 1234',
    time: '25 mins ago',
    source: 'Telemetry System',
    aiAction: null,
  }
];

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 'critical': return <AlertOctagon size={18} className="icon-critical" />;
    case 'high': return <AlertTriangle size={18} className="icon-high" />;
    case 'medium': return <AlertCircle size={18} className="icon-medium" />;
    case 'low': return <Info size={18} className="icon-low" />;
    default: return <Info size={18} />;
  }
};

import { AlertOctagon } from 'lucide-react';

const LiveAlertFeed = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="card live-alert-feed">
      <div className="feed-header flex justify-between items-center mb-4">
        <h3 className="section-title flex items-center gap-2">
          <Zap size={16} className="text-amber-500" />
          SMART ALERT ENGINE
        </h3>
        <button className="btn btn-outline btn-small flex items-center gap-1">
          <Filter size={12} /> Filter
        </button>
      </div>

      <div className="alert-filters flex gap-2 mb-4">
        <span className={`filter-badge ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</span>
        <span className={`filter-badge ${filter === 'critical' ? 'active-critical' : ''}`} onClick={() => setFilter('critical')}>Critical</span>
        <span className={`filter-badge ${filter === 'high' ? 'active-high' : ''}`} onClick={() => setFilter('high')}>High</span>
      </div>

      <div className="feed-container">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className={`alert-card priority-${alert.priority}`}>
            <div className="alert-card-header">
              <div className="flex items-center gap-2">
                <PriorityIcon priority={alert.priority} />
                <h4 className="alert-title">{alert.title}</h4>
              </div>
              <span className="alert-time">{alert.time}</span>
            </div>
            
            <div className="alert-details">
              <span className="alert-location">📍 {alert.location}</span>
              <span className="alert-source">Source: {alert.source}</span>
            </div>

            {alert.aiAction && (
              <div className="alert-ai-action">
                <strong>AI Action:</strong> {alert.aiAction}
              </div>
            )}
            
            <div className="alert-actions mt-3 flex gap-2">
              <button className="btn btn-small btn-primary">Acknowledge</button>
              <button className="btn btn-small btn-outline">Resolve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAlertFeed;
