import React, { createContext } from 'react';
import PatientControls from '../components/PatientControls';
import MapArea from '../components/MapArea';
import RouteOptions from '../components/RouteOptions';
import StatusDashboard from '../components/StatusDashboard';
import { useDashboardData } from '../hooks/useDashboardData';

export const DashboardContext = createContext();

const MainDashboard = () => {
  const dashboardData = useDashboardData();

  return (
    <DashboardContext.Provider value={dashboardData}>
      <div className="dashboard-grid">
        <div className="left-col">
          <PatientControls />
        </div>
        <div className="center-col">
          <MapArea />
        </div>
        <div className="right-col">
          <RouteOptions />
        </div>
        <div className="bottom-row">
          <StatusDashboard />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default MainDashboard;
