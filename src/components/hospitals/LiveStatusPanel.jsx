import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, AlertOctagon, Info } from 'lucide-react';
import './LiveStatusPanel.css';

const LiveStatusPanel = ({ liveStatus, alerts }) => {
  const bedData = liveStatus?.bedData || [
    { name: 'ICU Beds', available: 0, total: 1 },
    { name: 'Emergency', available: 0, total: 1 },
    { name: 'Oxygen', available: 0, total: 1 },
    { name: 'Ventilators', available: 0, total: 1 },
    { name: 'Trauma', available: 0, total: 1 },
  ];

  const currentAlerts = alerts || [];

  return (
    <div className="live-status-container">
      {/* Quick Analytics Cards */}
      <div className="quick-analytics-grid">
        <div className="analytics-card">
          <span className="analytics-title">Available ICU</span>
          <span className="analytics-value text-green">
            {bedData.find(b => b.name === 'ICU Beds')?.available || 0}
          </span>
        </div>
        <div className="analytics-card">
          <span className="analytics-title">Overloaded</span>
          <span className="analytics-value text-red">{liveStatus?.overloaded || 0}</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-title">Active Ambs</span>
          <span className="analytics-value text-blue">{liveStatus?.activeAmbulances || 0}</span>
        </div>
      </div>

      {/* Bed Availability Chart */}
      <div className="card chart-card">
        <h3 className="section-title">
          LIVE AVAILABILITY
          <Activity size={14} className="text-green ml-2" />
        </h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bedData} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
              />
              <Bar dataKey="available" radius={[0, 4, 4, 0]} barSize={12}>
                {bedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.available < 10 ? 'var(--status-amber)' : 'var(--status-blue)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="card alerts-card">
        <h3 className="section-title">REAL-TIME ALERTS</h3>
        <div className="alerts-list">
          {currentAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type === 'critical' ? 'alert-critical' : 'alert-warning'}`}>
              <div className="alert-icon-wrapper">
                {alert.type === 'critical' ? <AlertOctagon size={16} /> : <Info size={16} />}
              </div>
              <span>{alert.message}</span>
            </div>
          ))}
          {currentAlerts.length === 0 && (
            <div className="text-sm text-gray-500 p-2 text-center">No active alerts</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStatusPanel;
