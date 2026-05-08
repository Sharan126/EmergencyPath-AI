import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Route Planner', path: '/route-planner', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { name: 'Hospitals', path: '/hospitals', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Alerts', path: '/alerts', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { name: 'Live Traffic', path: '/traffic', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { name: 'Analytics', path: '/analytics', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
  { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div className="logo-text">
          <h1>EmergencyPath</h1>
          <p>Safer route. Better care.</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="emergency-call-btn">
          <div className="call-header">EMERGENCY CALL</div>
          <div className="call-number">
            <svg className="phone-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            108
          </div>
          <div className="call-sub">TAP TO CALL</div>
        </button>

        <div className="ambulance-status-card">
          <div className="status-header">
            <span>AMBULANCE STATUS</span>
            <div className="live-indicator">
              <div className="pulse"></div>
              <span>Live</span>
            </div>
          </div>
          <div className="ambulance-icon-large">
             <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 7h-3V6a4 4 0 0 0-4-4H4a2 2 0 0 0-2 2v10h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-3zm-9 3H8v2H6v-2H4V8h2V6h2v2h2v2zM7 16a1 1 0 1 1-1-1 1 1 0 0 1 1 1zm10 0a1 1 0 1 1-1-1 1 1 0 0 1 1 1zm4-3h-1.2A3.012 3.012 0 0 0 17 11.2V9l2.4 2.4zM16 8V6a2 2 0 0 0-2-2H4v10h1.2A3.012 3.012 0 0 0 8 12.2V10h6v2.2A3.012 3.012 0 0 0 17 14h3v1z" />
            </svg>
          </div>
          <div className="vehicle-id">KA 01 AB 1234</div>
          <div className="vehicle-speed">
            <svg className="speed-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            62 km/h
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
