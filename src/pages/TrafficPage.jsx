import React from 'react';
import './TrafficPage.css';
import TrafficMap from '../components/traffic/TrafficMap';
import SmartRoutePanel from '../components/traffic/SmartRoutePanel';
import IncidentFeed from '../components/traffic/IncidentFeed';
import TrafficAnalytics from '../components/traffic/TrafficAnalytics';
import VehiclePriorityAlerts from '../components/traffic/VehiclePriorityAlerts';

const TrafficPage = () => {
  return (
    <div className="traffic-dashboard-grid">
      <div className="t-left-col">
        <SmartRoutePanel />
        <TrafficAnalytics />
      </div>
      
      <div className="t-center-col relative">
        <TrafficMap />
        
        {/* Floating Vehicle Priority Alert at the bottom of the map */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] w-[80%] max-w-[500px]">
          <VehiclePriorityAlerts />
        </div>
      </div>
      
      <div className="t-right-col">
        <IncidentFeed />
      </div>
    </div>
  );
};

export default TrafficPage;
