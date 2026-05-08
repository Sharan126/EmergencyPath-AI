import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingDown, Clock, Activity } from 'lucide-react';
import './TrafficAnalytics.css';

const delayData = [
  { time: '08:00', delay: 15 },
  { time: '10:00', delay: 25 },
  { time: '12:00', delay: 18 },
  { time: '14:00', delay: 12 },
  { time: '16:00', delay: 30 },
  { time: '18:00', delay: 45 },
  { time: '20:00', delay: 20 },
];

const efficiencyData = [
  { day: 'Mon', original: 40, aiRoute: 25 },
  { day: 'Tue', original: 35, aiRoute: 22 },
  { day: 'Wed', original: 45, aiRoute: 28 },
  { day: 'Thu', original: 30, aiRoute: 20 },
  { day: 'Fri', original: 50, aiRoute: 30 },
];

const TrafficAnalytics = () => {
  return (
    <div className="traffic-analytics-container">
      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-blue-50 text-blue-500">
            <Clock size={16} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Avg Delay Avoided</span>
            <span className="kpi-value">14 min</span>
          </div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-icon-wrapper bg-green-50 text-green-500">
            <TrendingDown size={16} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Reroute Success</span>
            <span className="kpi-value">94.2%</span>
          </div>
        </div>
      </div>

      {/* Traffic Delay Trend */}
      <div className="card analytics-chart-card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="section-title flex items-center gap-2">
            <Activity size={16} className="text-red-500" />
            TODAY'S DELAY TREND
          </h3>
          <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Peak at 6 PM</span>
        </div>
        
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={delayData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDelay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
              <Area type="monotone" dataKey="delay" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorDelay)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Efficiency Chart */}
      <div className="card analytics-chart-card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="section-title flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-500" />
            AI ROUTE EFFICIENCY
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-2">AI Routing vs Standard GPS (Travel Time in mins)</p>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={efficiencyData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
              <Line type="monotone" dataKey="original" stroke="#94a3b8" strokeWidth={2} strokeDasharray="3 3" dot={false} name="Standard GPS" />
              <Line type="monotone" dataKey="aiRoute" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3 }} name="AI Smart Route" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalytics;
