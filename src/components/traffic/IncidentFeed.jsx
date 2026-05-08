import React from 'react';
import { AlertCircle, Construction, CloudRain, ShieldAlert } from 'lucide-react';
import './IncidentFeed.css';

const incidents = [
  { id: 1, type: 'accident', title: 'Major Accident', desc: 'Outer Ring Road, 2 lanes blocked.', time: 'Just now', icon: ShieldAlert, colorClass: 'text-red-500' },
  { id: 2, type: 'flood', title: 'Severe Flooding', desc: 'Underpass flooded near Silk Board.', time: '2 mins ago', icon: CloudRain, colorClass: 'text-blue-500' },
  { id: 3, type: 'construction', title: 'Road Construction', desc: 'MG Road expected delay 10 mins.', time: '15 mins ago', icon: Construction, colorClass: 'text-amber-500' },
  { id: 4, type: 'congestion', title: 'Severe Congestion', desc: 'Traffic crawling at 5km/h on Route A.', time: '22 mins ago', icon: AlertCircle, colorClass: 'text-red-500' }
];

const IncidentFeed = () => {
  return (
    <div className="incident-feed card">
      <div className="feed-header">
        <h3 className="section-title flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500 pulse-icon" />
          LIVE INCIDents & ALERTS
        </h3>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="incident-list">
        {incidents.map(incident => {
          const IconComponent = incident.icon;
          return (
            <div key={incident.id} className="incident-item">
              <div className={`incident-icon ${incident.type}-bg`}>
                <IconComponent size={16} className={incident.colorClass} />
              </div>
              <div className="incident-content">
                <div className="incident-title-row">
                  <h4>{incident.title}</h4>
                  <span className="incident-time">{incident.time}</span>
                </div>
                <p>{incident.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default IncidentFeed;
