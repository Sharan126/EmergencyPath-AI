import React from 'react';
import './AlertsPage.css';
import AlertAnalytics from '../components/alerts/AlertAnalytics';
import LiveAlertFeed from '../components/alerts/LiveAlertFeed';
import AmbulanceSafetyMonitor from '../components/alerts/AmbulanceSafetyMonitor';
import AlertMap from '../components/alerts/AlertMap';
import SmartNotificationCenter from '../components/alerts/SmartNotificationCenter';

const AlertsPage = () => {
  return (
    <div className="alerts-dashboard-container">
      <div className="alerts-top-row">
        <AlertAnalytics />
      </div>

      <div className="alerts-grid">
        <div className="alerts-left-col">
          <LiveAlertFeed />
          <AmbulanceSafetyMonitor />
        </div>
        
        <div className="alerts-center-col">
          <AlertMap />
        </div>
        
        <div className="alerts-right-col">
          <SmartNotificationCenter />
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
