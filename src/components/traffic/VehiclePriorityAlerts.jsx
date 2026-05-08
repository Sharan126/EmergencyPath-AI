import React from 'react';
import { Volume2, RadioTower } from 'lucide-react';
import './VehiclePriorityAlerts.css';

const VehiclePriorityAlerts = () => {
  return (
    <div className="vehicle-priority-container">
      <div className="priority-header">
        <div className="flex items-center gap-2">
          <div className="broadcasting-icon">
            <RadioTower size={16} />
            <span className="broadcast-waves"></span>
          </div>
          <span className="font-bold text-sm tracking-wide">V2X PRIORITY BROADCAST</span>
        </div>
        <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
          <Volume2 size={14} className="animate-pulse" />
          ACTIVE
        </div>
      </div>
      
      <div className="priority-body">
        <div className="alert-message-box blink-warning">
          <strong>"AMBULANCE APPROACHING — PLEASE CLEAR LEFT LANE"</strong>
        </div>
        <div className="broadcast-stats mt-2 flex justify-between text-xs text-gray-400">
          <span>Range: 500m ahead</span>
          <span>Vehicles Notified: 42</span>
        </div>
      </div>
    </div>
  );
};

export default VehiclePriorityAlerts;
