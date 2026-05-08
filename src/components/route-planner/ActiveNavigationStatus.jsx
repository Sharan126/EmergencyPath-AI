import React, { useState, useEffect } from 'react';
import { Mic, Navigation, Clock, Activity, AlertTriangle } from 'lucide-react';
import './ActiveNavigationStatus.css';

const voicePrompts = [
  "In 500 meters, stay on the left to avoid construction.",
  "Pothole cluster detected ahead. Slowing recommended.",
  "Rerouting via 4th Block due to heavy traffic build-up.",
  "Traffic signals ahead synchronized. Proceed with caution.",
  "ETA to City Hospital is 6 minutes. Patient condition stable.",
];

const ActiveNavigationStatus = ({ activeRoute }) => {
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % voicePrompts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const routeDetails = {
    'A': { speed: '62 km/h', eta: '8m 45s', dist: '4.2 km' },
    'B': { speed: '58 km/h', eta: '6m 12s', dist: '5.1 km' },
    'C': { speed: '45 km/h', eta: '12m 30s', dist: '4.8 km' },
  };

  const activeDetails = routeDetails[activeRoute];

  return (
    <div className="card active-nav-panel">
      <div className="nav-header">
        <div className="nav-pulse-container">
          <div className="nav-pulse-ring"></div>
          <div className="nav-icon-bg">
            <Navigation size={20} className="text-white" />
          </div>
        </div>
        <div className="nav-header-text">
          <h2 className="nav-title">EMERGENCY PRIORITY ACTIVE</h2>
          <p className="nav-subtitle">Unit: KA-01-A-111 • Code Red</p>
        </div>
      </div>

      <div className="nav-telemetry-grid">
        <div className="telemetry-item">
          <Clock size={16} className="telemetry-icon text-blue-500" />
          <div className="telemetry-data">
            <span className="telemetry-label">Live ETA</span>
            <span className="telemetry-value">{activeDetails.eta}</span>
          </div>
        </div>
        
        <div className="telemetry-item">
          <Activity size={16} className="telemetry-icon text-green-500" />
          <div className="telemetry-data">
            <span className="telemetry-label">Speed</span>
            <span className="telemetry-value">{activeDetails.speed}</span>
          </div>
        </div>
        
        <div className="telemetry-item">
          <Navigation size={16} className="telemetry-icon text-purple-500" />
          <div className="telemetry-data">
            <span className="telemetry-label">Distance</span>
            <span className="telemetry-value">{activeDetails.dist}</span>
          </div>
        </div>
      </div>

      <div className="voice-assistant-box">
        <div className="voice-assistant-header">
          <Mic size={14} className="voice-mic-icon animate-pulse" />
          <span>AI Navigation Assistant</span>
        </div>
        <div className="voice-transcription">
          "{voicePrompts[promptIndex]}"
        </div>
        <div className="voice-wave-animation">
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveNavigationStatus;
