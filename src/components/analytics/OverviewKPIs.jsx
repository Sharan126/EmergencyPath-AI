import React from 'react';
import { Activity, Truck, Clock, Building2, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import './OverviewKPIs.css';

const dummySparkline = [
  { val: 10 }, { val: 25 }, { val: 15 }, { val: 30 }, { val: 22 }, { val: 40 }, { val: 35 }
];

const KPICard = ({ title, value, icon: Icon, colorClass, trend, isLive }) => (
  <div className="kpi-dash-card">
    <div className="kpi-dash-header">
      <span className="kpi-dash-title">{title}</span>
      {isLive && <span className="kpi-live-dot"></span>}
    </div>
    <div className="kpi-dash-body">
      <div className={`kpi-dash-icon ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div className="kpi-dash-stats">
        <span className="kpi-dash-value">{value}</span>
        <span className={`kpi-dash-trend ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
    </div>
    <div className="kpi-dash-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dummySparkline}>
          <Area type="monotone" dataKey="val" stroke="currentColor" fill="currentColor" fillOpacity={0.1} strokeWidth={2} className={colorClass} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const OverviewKPIs = () => {
  return (
    <div className="overview-kpi-grid">
      <KPICard title="Total Emergencies" value="1,284" icon={Activity} colorClass="text-blue-500" trend={12.5} isLive={false} />
      <KPICard title="Active Ambulances" value="42" icon={Truck} colorClass="text-green-500" trend={5.2} isLive={true} />
      <KPICard title="Avg Response Time" value="8.4m" icon={Clock} colorClass="text-amber-500" trend={-15.3} isLive={false} />
      <KPICard title="Hospitals Online" value="18/20" icon={Building2} colorClass="text-purple-500" trend={0} isLive={true} />
      <KPICard title="Success Rate" value="98.2%" icon={TrendingUp} colorClass="text-emerald-500" trend={2.1} isLive={false} />
      <KPICard title="Active Alerts" value="7" icon={AlertTriangle} colorClass="text-red-500" trend={45.0} isLive={true} />
    </div>
  );
};

export default OverviewKPIs;
