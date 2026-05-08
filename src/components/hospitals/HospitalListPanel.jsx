import React from 'react';
import { Star, Navigation, Clock, Activity, Users, ShieldAlert, Heart, CheckCircle2 } from 'lucide-react';
import './HospitalListPanel.css';

const hospitalsData = [
  {
    id: 1,
    name: 'Apollo City Hospital',
    type: 'Multi-Specialty • Level 1 Trauma',
    distance: '4.2 km',
    eta: '11 min',
    safetyScore: 92,
    crowdStatus: 'available', // available, moderate, full
    aiRecommended: true,
    aiReason: 'Recommended because ICU available + trauma support + low waiting time.',
    rating: 4.8,
    readiness: 'High'
  },
  {
    id: 2,
    name: 'Manipal Hospital',
    type: 'General • Cardiac Center',
    distance: '3.1 km',
    eta: '14 min',
    safetyScore: 78,
    crowdStatus: 'moderate',
    aiRecommended: false,
    rating: 4.5,
    readiness: 'Medium'
  },
  {
    id: 3,
    name: 'Fortis Healthcare',
    type: 'Multi-Specialty',
    distance: '6.5 km',
    eta: '22 min',
    safetyScore: 85,
    crowdStatus: 'full',
    aiRecommended: false,
    rating: 4.2,
    readiness: 'Low'
  }
];

const HospitalListPanel = ({ onSelectHospital }) => {
  return (
    <div className="hospital-list-panel">
      <div className="panel-header">
        <h3 className="panel-title">NEARBY HOSPITALS (12)</h3>
        <span className="sort-by">Sort by: AI Match</span>
      </div>

      <div className="hospital-cards-container">
        {hospitalsData.map((hospital) => (
          <div 
            key={hospital.id} 
            className={`hospital-card ${hospital.aiRecommended ? 'ai-recommended-card' : ''}`}
            onClick={() => onSelectHospital(hospital)}
          >
            {hospital.aiRecommended && (
              <div className="ai-badge">
                <CheckCircle2 size={14} />
                AI BEST MATCH
              </div>
            )}
            
            <div className="hospital-card-header">
              <div className="hospital-info-main">
                <h4>{hospital.name}</h4>
                <span className="hospital-type">{hospital.type}</span>
              </div>
              <button className="favorite-btn" onClick={(e) => e.stopPropagation()}>
                <Heart size={18} />
              </button>
            </div>

            {hospital.aiRecommended && (
              <div className="ai-reasoning">
                <strong>Why chosen: </strong>
                {hospital.aiReason}
              </div>
            )}

            <div className="hospital-metrics-grid">
              <div className="metric">
                <Navigation size={14} className="metric-icon" />
                <span>{hospital.distance}</span>
              </div>
              <div className="metric">
                <Clock size={14} className="metric-icon" />
                <span>{hospital.eta} ETA</span>
              </div>
              <div className="metric">
                <ShieldAlert size={14} className="metric-icon" />
                <span>{hospital.safetyScore}/100 Safe</span>
              </div>
              <div className="metric">
                <Star size={14} className="metric-icon text-amber-500" />
                <span>{hospital.rating}</span>
              </div>
            </div>

            <div className="hospital-card-footer">
              <div className="status-badges">
                <div className={`crowd-badge status-${hospital.crowdStatus}`}>
                  <Users size={12} />
                  {hospital.crowdStatus.toUpperCase()}
                </div>
                <div className="readiness-badge">
                  <Activity size={12} />
                  {hospital.readiness} Readiness
                </div>
              </div>
              <button className="btn btn-outline view-btn">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalListPanel;
