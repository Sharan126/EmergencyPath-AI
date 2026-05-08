import React from 'react';
import { Activity, Wifi, Map, Database, Server, Cpu, RefreshCw } from 'lucide-react';
import './SystemHealthPanel.css';

const HealthCard = ({ title, status, icon: Icon, latency }) => {
  const isHealthy = status === 'Operational';
  const colorClass = isHealthy ? 'text-green-500' : 'text-amber-500';
  const bgClass = isHealthy ? 'bg-green-100' : 'bg-amber-100';

  return (
    <div className="health-card">
      <div className={`health-icon ${bgClass} ${colorClass}`}>
        <Icon size={20} />
      </div>
      <div className="health-details">
        <span className="health-title">{title}</span>
        <div className="flex items-center gap-2 mt-1">
          <span className={`health-status-dot ${isHealthy ? 'dot-healthy' : 'dot-warning'}`}></span>
          <span className={`text-xs font-bold ${colorClass}`}>{status}</span>
        </div>
      </div>
      <div className="health-latency text-xs text-gray-500 font-mono">
        {latency}ms
      </div>
    </div>
  );
};

const SystemHealthPanel = () => {
  return (
    <div className="settings-panel animate-fade-in">
      <div className="settings-panel-header flex justify-between items-start">
        <div>
          <h2 className="settings-panel-title flex items-center gap-2">
            <Activity size={20} className="text-green-500" /> System Health & Diagnostics
          </h2>
          <p className="settings-panel-desc">Real-time monitoring of all core EmergencyPath infrastructure and external APIs.</p>
        </div>
        <button className="btn btn-outline btn-small flex items-center gap-1">
          <RefreshCw size={12} /> Run Diagnostics
        </button>
      </div>

      <div className="settings-section">
        <h4 className="settings-section-title">Core Services</h4>
        <div className="health-grid">
          <HealthCard title="Main API Server" status="Operational" icon={Server} latency={42} />
          <HealthCard title="Real-time WebSocket" status="Operational" icon={Activity} latency={12} />
          <HealthCard title="Central Database" status="Operational" icon={Database} latency={8} />
          <HealthCard title="AI Prediction Engine" status="Degraded" icon={Cpu} latency={845} />
        </div>
      </div>

      <div className="settings-section pt-6 border-t border-gray-200">
        <h4 className="settings-section-title">External Integrations</h4>
        <div className="health-grid">
          <HealthCard title="Live GPS Telemetry" status="Operational" icon={Wifi} latency={115} />
          <HealthCard title="Map Service (Carto)" status="Operational" icon={Map} latency={65} />
        </div>
      </div>

      <div className="settings-section pt-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
          <h5 className="font-bold text-sm mb-2 text-gray-800">System Logs & Backups</h5>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2 border-b border-gray-200 pb-2">
            <span>Last Automated Backup</span>
            <span className="font-mono">Today, 04:00 AM (Success)</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-200 pb-2 mb-4">
            <span>Active Cloud Storage Used</span>
            <span className="font-mono">42.8 GB / 100 GB</span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-small">Download Activity Logs</button>
            <button className="btn btn-outline btn-small">Force Cloud Sync</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SystemHealthPanel;
