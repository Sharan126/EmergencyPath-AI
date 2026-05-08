import React, { useState } from 'react';
import './PatientControls.css';

const PatientControls = () => {
  const [severity, setSeverity] = useState('Critical');
  
  return (
    <div className="card patient-controls">
      <h2 className="section-title">PATIENT DETAILS</h2>
      
      <div className="control-group">
        <label className="control-label">Severity Level</label>
        <div className="severity-toggle">
          {['Minor', 'Serious', 'Critical'].map(level => (
            <button 
              key={level}
              className={`severity-btn ${severity === level ? 'active' : ''} ${level === 'Critical' && severity === 'Critical' ? 'critical-active' : ''}`}
              onClick={() => setSeverity(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      {severity === 'Critical' && (
        <div className="alert-box critical-alert">
          <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="alert-content">
            <strong>Critical patient selected</strong>
            <p>AI will prioritize safest and smoothest route.</p>
          </div>
        </div>
      )}

      <div className="control-group">
        <label className="control-label">Destination Hospital</label>
        <div className="hospital-input-wrapper">
          <svg className="hospital-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <input type="text" value="City Hospital, Bangalore" readOnly className="hospital-input" />
          <button className="clear-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Route Preferences</label>
        <div className="preferences-list">
          {['Avoid Potholes', 'Consider Traffic', 'Consider Weather', 'Smoothest Route'].map((pref, index) => (
            <label key={index} className="checkbox-label">
              <div className="checkbox-custom active">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                   <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
              </div>
              <span>{pref}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="btn btn-primary btn-large find-route-btn">
        FIND SAFEST ROUTE
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default PatientControls;
