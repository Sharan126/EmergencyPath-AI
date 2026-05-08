import React from 'react';
import PatientControls from '../components/PatientControls';
import MapArea from '../components/MapArea';
import RouteOptions from '../components/RouteOptions';
import StatusDashboard from '../components/StatusDashboard';

const MainDashboard = () => {
  return (
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
  );
};

export default MainDashboard;
