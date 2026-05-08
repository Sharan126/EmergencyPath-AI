import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import PatientControls from './components/PatientControls';
import MapArea from './components/MapArea';
import RouteOptions from './components/RouteOptions';
import StatusDashboard from './components/StatusDashboard';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
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
      </div>
    </div>
  );
}

export default App;
