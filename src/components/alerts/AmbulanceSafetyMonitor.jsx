import React from 'react';
import { Activity, Gauge, Thermometer, MapPinOff } from 'lucide-react';
import './AmbulanceSafetyMonitor.css';

const safetyAlerts = [
  { id: 1, vehicle: 'KA 01 AB 1234', type: 'Speed', message: 'Excessive Speed (92 km/h) in Residential Zone', icon: Gauge, level: 'warning' },
  { id: 2, vehicle: 'MH 04 XY 9876', type: 'Vitals', message: 'Patient Oxygen dropped below 90%', icon: Activity, level: 'critical' },
  { id: 3, vehicle: 'DL 01 ZZ 5555', type: 'Route', message: 'Route Deviation Detected (+2 mins delay)', icon: MapPinOff, level: 'info' }
];

const AmbulanceSafetyMonitor = () => {
  return (
    <div className="card safety-monitor">
      <h3 className="section-title mb-3">AMBULANCE TELEMETRY ALERTS</h3>
      
      <div className="telemetry-list">
        {safetyAlerts.map(alert => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`telemetry-item tele-${alert.level}`}>
              <div className="tele-icon-wrapper">
                <Icon size={16} />
              </div>
              <div className="tele-content">
                <div className="flex justify-between items-center mb-1">
                  <span className="tele-vehicle font-bold">{alert.vehicle}</span>
                  <span className="tele-type badge-small">{alert.type}</span>
                </div>
                <p className="tele-message">{alert.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AmbulanceSafetyMonitor;
