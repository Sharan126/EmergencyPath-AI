import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, AlertOctagon, Info } from 'lucide-react';
import './LiveStatusPanel.css';

const bedData = [
  { name: 'ICU Beds', available: 12, total: 50 },
  { name: 'Emergency', available: 8, total: 30 },
  { name: 'Oxygen', available: 45, total: 100 },
  { name: 'Ventilators', available: 5, total: 20 },
  { name: 'Trauma', available: 3, total: 10 },
];

const alerts = [
  { id: 1, type: 'critical', message: 'Manipal Hospital ICU Full' },
  { id: 2, type: 'warning', message: 'Oxygen shortage reported at City Care' },
];

const LiveStatusPanel = () => {
  return (
    <div className="live-status-container">
      {/* Quick Analytics Cards */}
      <div className="quick-analytics-grid">
        <div className="analytics-card">
          <span className="analytics-title">Available ICU</span>
          <span className="analytics-value text-green">12</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-title">Overloaded</span>
          <span className="analytics-value text-red">3</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-title">Active Ambs</span>
          <span className="analytics-value text-blue">24</span>
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
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type === 'critical' ? 'alert-critical' : 'alert-warning'}`}>
              <div className="alert-icon-wrapper">
                {alert.type === 'critical' ? <AlertOctagon size={16} /> : <Info size={16} />}
              </div>
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStatusPanel;
