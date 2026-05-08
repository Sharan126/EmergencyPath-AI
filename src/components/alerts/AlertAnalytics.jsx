import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './AlertAnalytics.css';

const sparklineData = [
  { val: 12 }, { val: 18 }, { val: 15 }, { val: 25 }, { val: 22 }, { val: 30 }, { val: 28 }, { val: 40 }
];

const AlertAnalytics = () => {
  return (
    <div className="alert-analytics-bar">
      <div className="analytics-stat-card">
        <div className="stat-icon-bg bg-red-100 text-red-600">
          <AlertOctagon size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Critical Alerts</span>
          <span className="stat-value text-red-600">24</span>
        </div>
        <div className="stat-sparkline">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="val" stroke="#dc2626" strokeWidth={2} dot={false} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-stat-card">
        <div className="stat-icon-bg bg-orange-100 text-orange-600">
          <ShieldAlert size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">High Priority</span>
          <span className="stat-value text-orange-600">45</span>
        </div>
      </div>

      <div className="analytics-stat-card">
        <div className="stat-icon-bg bg-green-100 text-green-600">
          <CheckCircle2 size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Resolved Today</span>
          <span className="stat-value text-green-600">182</span>
        </div>
      </div>

      <div className="analytics-stat-card">
        <div className="stat-icon-bg bg-blue-100 text-blue-600">
          <Activity size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Avg Response</span>
          <span className="stat-value text-blue-600">4.2m</span>
        </div>
        <div className="stat-trend text-green-500 font-bold text-xs">-12% ▼</div>
      </div>
    </div>
  );
};

export default AlertAnalytics;
