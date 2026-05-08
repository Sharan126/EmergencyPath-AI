import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { Activity, Map, Ambulance } from 'lucide-react';
import './PerformanceCharts.css';

const responseTimeData = [
  { time: '00:00', avg: 12, target: 10 },
  { time: '04:00', avg: 9, target: 10 },
  { time: '08:00', avg: 15, target: 10 },
  { time: '12:00', avg: 14, target: 10 },
  { time: '16:00', avg: 18, target: 10 },
  { time: '20:00', avg: 11, target: 10 },
];

const trafficAnalyticsData = [
  { zone: 'North', congestion: 85, reroutes: 42, efficiency: 75 },
  { zone: 'South', congestion: 45, reroutes: 12, efficiency: 92 },
  { zone: 'East', congestion: 65, reroutes: 28, efficiency: 81 },
  { zone: 'West', congestion: 30, reroutes: 8, efficiency: 95 },
  { zone: 'Central', congestion: 95, reroutes: 65, efficiency: 60 },
];

const PerformanceCharts = () => {
  return (
    <div className="performance-charts-container">
      
      {/* Emergency Response Time Trend */}
      <div className="card analytics-big-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="section-title flex items-center gap-2">
            <Activity size={16} className="text-blue-500" />
            EMERGENCY RESPONSE TIME TREND (MINUTES)
          </h3>
          <span className="badge badge-outline">Last 24 Hours</span>
        </div>
        
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={responseTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', color: 'white', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="avg" name="Actual Response Time" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
              <Area type="step" dataKey="target" name="Target (<10m)" stroke="#ef4444" strokeWidth={2} fill="none" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-grid-2col">
        {/* Traffic & Route Analytics */}
        <div className="card analytics-small-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-title flex items-center gap-2">
              <Map size={16} className="text-amber-500" />
              TRAFFIC & REROUTE IMPACT
            </h3>
          </div>
          <div className="chart-wrapper-small">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trafficAnalyticsData} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Bar yAxisId="left" dataKey="congestion" name="Congestion Level" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Route Efficiency %" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ambulance Utilization */}
        <div className="card analytics-small-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-title flex items-center gap-2">
              <Ambulance size={16} className="text-purple-500" />
              FLEET DEPLOYMENT
            </h3>
          </div>
          <div className="chart-wrapper-small">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficAnalyticsData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="zone" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} width={50} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="reroutes" name="Active Ambulances" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PerformanceCharts;
