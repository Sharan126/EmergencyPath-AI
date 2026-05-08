import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MainDashboard from './pages/MainDashboard';
import HospitalsPage from './pages/HospitalsPage';
import TrafficPage from './pages/TrafficPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import RoutePlannerPage from './pages/RoutePlannerPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/traffic" element={<TrafficPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/route-planner" element={<RoutePlannerPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
