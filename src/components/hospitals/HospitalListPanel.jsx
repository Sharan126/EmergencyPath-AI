import React from 'react';
import { Star, Navigation, Clock, Activity, Users, ShieldAlert, Heart, CheckCircle2 } from 'lucide-react';
import './HospitalListPanel.css';

const HospitalListPanel = ({ hospitals, onSelectHospital, onToggleFavorite }) => {
  return (
    <div className="hospital-list-panel">
      <div className="panel-header">
        <h3 className="panel-title">NEARBY HOSPITALS ({hospitals?.length || 0})</h3>
        <span className="sort-by">Sort by: AI Match</span>
      </div>

      <div className="hospital-cards-container">
        {hospitals?.map((hospital) => (
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
              <button 
                className={`favorite-btn ${hospital.isFavorite ? 'text-red-500' : ''}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(hospital.id);
                }}
              >
                <Heart size={18} fill={hospital.isFavorite ? 'currentColor' : 'none'} />
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
              <button className="btn btn-outline view-btn" onClick={(e) => {
                  e.stopPropagation();
                  onSelectHospital(hospital);
              }}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalListPanel;
