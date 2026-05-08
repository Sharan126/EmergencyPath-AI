import React from 'react';
import './AnalyticsPage.css';
import OverviewKPIs from '../components/analytics/OverviewKPIs';
import PerformanceCharts from '../components/analytics/PerformanceCharts';
import AIPredictionPanel from '../components/analytics/AIPredictionPanel';
import LiveMonitoringWidget from '../components/analytics/LiveMonitoringWidget';

const AnalyticsPage = () => {
  return (
    <div className="analytics-dashboard-container">
      <div className="analytics-top-row">
        <OverviewKPIs />
      </div>

      <div className="analytics-grid">
        <div className="analytics-main-col">
          <PerformanceCharts />
        </div>
        
        <div className="analytics-side-col">
          <AIPredictionPanel />
          <LiveMonitoringWidget />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
