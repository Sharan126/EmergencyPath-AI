import React from 'react';
import './StatusDashboard.css';

const StatusDashboard = () => {
  return (
    <>
      {/* Card 1: Traffic Status */}
      <div className="status-card">
        <div className="status-card-header">
           <div className="status-icon icon-amber">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
             </svg>
           </div>
           <div className="status-title-group">
             <h4>TRAFFIC STATUS</h4>
             <span className="status-value text-amber">Moderate</span>
           </div>
        </div>
        <p className="status-desc">Some congestion on outer ring road.</p>
        <div className="bar-chart-mini">
           <div className="bar" style={{height: '40%', backgroundColor: '#f59e0b'}}></div>
           <div className="bar" style={{height: '70%', backgroundColor: '#f59e0b'}}></div>
           <div className="bar" style={{height: '30%', backgroundColor: '#f59e0b'}}></div>
           <div className="bar" style={{height: '50%', backgroundColor: '#f59e0b'}}></div>
        </div>
      </div>

      {/* Card 2: Road Conditions */}
      <div className="status-card">
        <div className="status-card-header">
           <div className="status-icon icon-gray">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
             </svg>
           </div>
           <div className="status-title-group">
             <h4>ROAD CONDITIONS</h4>
             <span className="status-value text-amber">Fair</span>
           </div>
        </div>
        <p className="status-desc">Some potholes detected on current route.</p>
        <div className="pothole-indicator">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
             <path d="M12 21c-5 0-9-2-9-4.5s4-4.5 9-4.5 9 2 9 4.5-4 4.5-9 4.5z" />
          </svg>
        </div>
      </div>

      {/* Card 3: Weather */}
      <div className="status-card">
        <div className="status-card-header">
           <div className="status-icon icon-blue">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
           </div>
           <div className="status-title-group">
             <h4>WEATHER</h4>
             <span className="status-value text-blue">Raining</span>
           </div>
        </div>
        <p className="status-desc">Drive carefully. Roads may be slippery.</p>
      </div>

      {/* Card 4: Signal Pre-emption */}
      <div className="status-card">
        <div className="status-card-header">
           <div className="status-icon icon-green">
             <svg fill="currentColor" viewBox="0 0 24 24">
               <rect x="8" y="2" width="8" height="20" rx="4" />
               <circle cx="12" cy="6" r="2" fill="#ef4444" />
               <circle cx="12" cy="12" r="2" fill="#f59e0b" />
               <circle cx="12" cy="18" r="2" fill="#22c55e" />
             </svg>
           </div>
           <div className="status-title-group">
             <h4>SIGNAL PRE-EMPTION</h4>
             <span className="status-value text-green">Active</span>
           </div>
        </div>
        <p className="status-desc">Traffic lights will turn green on your path.</p>
        <div className="progress-bar-container">
           <div className="progress-bar-fill" style={{width: '75%', backgroundColor: '#22c55e'}}></div>
        </div>
      </div>

      {/* Card 5: Civilian Alerts */}
      <div className="status-card">
        <div className="status-card-header">
           <div className="status-icon icon-purple">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
             </svg>
           </div>
           <div className="status-title-group">
             <h4>CIVILIAN ALERTS</h4>
             <span className="status-value text-purple">Active</span>
           </div>
        </div>
        <p className="status-desc">Drivers notified within 300m radius.</p>
        <div className="flex items-center gap-2 mt-2 text-purple-600">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
           </svg>
        </div>
      </div>

      {/* Card 6: Hospital Status */}
      <div className="status-card">
        <div className="status-card-header">
           <div className="status-icon icon-red">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
             </svg>
           </div>
           <div className="status-title-group">
             <h4>HOSPITAL STATUS</h4>
             <span className="status-value text-green">Best Match</span>
           </div>
        </div>
        <ul className="hospital-features">
          <li>
            <svg fill="currentColor" viewBox="0 0 20 20" className="check-icon">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            ICU Available
          </li>
          <li>
            <svg fill="currentColor" viewBox="0 0 20 20" className="check-icon">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Cardiac Specialist On Duty
          </li>
        </ul>
      </div>
    </>
  );
};

export default StatusDashboard;
