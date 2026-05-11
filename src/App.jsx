import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
          <Route path="/hospitals" element={<ProtectedRoute><HospitalsPage /></ProtectedRoute>} />
          <Route path="/traffic" element={<ProtectedRoute><TrafficPage /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/route-planner" element={<ProtectedRoute><RoutePlannerPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<AppContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
