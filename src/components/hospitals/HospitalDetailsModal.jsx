import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, Phone, Send, HeartPulse, Activity, User, FileText, Clock, ShieldCheck } from 'lucide-react';
import './HospitalDetailsModal.css';

const HospitalDetailsModal = ({ hospital, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div 
          className="modal-content glass-dark-modal"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="modal-header">
            <div className="modal-hospital-img">
               <div className="img-placeholder">
                  {hospital.name.charAt(0)}
               </div>
            </div>
            <div className="modal-hospital-title">
              <h2>{hospital.name}</h2>
              <p>{hospital.type} • {hospital.rating} Rating</p>
              <div className="flex gap-2 mt-2">
                <span className="badge badge-green">Open 24/7</span>
                {hospital.specialties?.map(spec => (
                  <span key={spec} className="badge badge-blue capitalize">{spec}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-quick-actions">
              <button className="btn btn-outline btn-icon-only">
                <a href={`tel:${hospital.emergencyContact}`} style={{color:'inherit'}}><Phone size={18} /></a>
              </button>
              <button className="btn btn-primary">
                <Navigation size={18} />
                NAVIGATE NOW
              </button>
            </div>
          </div>

          <div className="modal-tabs">
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`tab-btn ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')}>Digital Patient Transfer</button>
            <button className={`tab-btn ${activeTab === 'facilities' ? 'active' : ''}`} onClick={() => setActiveTab('facilities')}>Facilities</button>
          </div>

          <div className="modal-body">
            {activeTab === 'overview' && (
              <div className="tab-content overview-grid">
                <div className="info-card">
                  <h4 className="flex items-center gap-2"><Clock size={16} className="text-blue-500" /> Wait Time & Readiness</h4>
                  <div className="flex justify-between mt-3 mb-2">
                    <span className="text-sm text-gray-400">Est. ETA</span>
                    <strong className="text-green-400">{hospital.eta}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Readiness Score</span>
                    <strong className="text-blue-400">{hospital.readiness}</strong>
                  </div>
                </div>

                <div className="info-card">
                  <h4 className="flex items-center gap-2"><Activity size={16} className="text-red-500" /> Live ICU Status</h4>
                  <div className="flex justify-between mt-3 mb-2">
                    <span className="text-sm text-gray-400">Available Beds</span>
                    <strong className="text-green-400">{hospital.stats?.icuBedsAvailable} / {hospital.stats?.icuBedsTotal}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Ventilators</span>
                    <strong className="text-amber-400">{hospital.stats?.ventilatorsAvailable} Available</strong>
                  </div>
                </div>

                <div className="info-card full-width">
                  <h4 className="flex items-center gap-2"><User size={16} className="text-purple-500" /> On-Duty Specialists</h4>
                  <div className="specialists-list mt-3">
                    <div className="specialist-item">{hospital.doctorsAvailable} Doctors On-Call</div>
                    <div className="specialist-item">Emergency Type Support: {hospital.emergencyTypes?.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transfer' && (
              <div className="tab-content transfer-form">
                <div className="alert-box alert-blue mb-4">
                  <ShieldCheck size={20} />
                  <div>
                    <strong>Secure Digital Handover</strong>
                    <p className="text-xs">Send patient vitals directly to {hospital.name} ER team before arrival.</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Patient Severity</label>
                    <select className="form-input">
                      <option>Critical</option>
                      <option>Serious</option>
                      <option>Minor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Heart Rate (BPM)</label>
                    <input type="number" className="form-input" placeholder="e.g. 110" />
                  </div>
                  <div className="form-group">
                    <label>Blood Pressure</label>
                    <input type="text" className="form-input" placeholder="e.g. 120/80" />
                  </div>
                  <div className="form-group">
                    <label>Oxygen Level (SpO2 %)</label>
                    <input type="number" className="form-input" placeholder="e.g. 95" />
                  </div>
                  <div className="form-group full-width">
                    <label>Emergency Notes</label>
                    <textarea className="form-input" rows="3" placeholder="Brief description of patient condition..."></textarea>
                  </div>
                </div>
                
                <button className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2">
                  <Send size={18} />
                  SEND VITALS TO ER
                </button>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div className="tab-content text-gray-300 text-sm">
                <p>Advanced diagnostic imaging, 24/7 blood bank, burn unit, cardiac catheterization lab.</p>
                <div className="mt-4">
                  <strong>Oxygen Capacity:</strong> {hospital.stats?.oxygenAvailable} / {hospital.stats?.oxygenTotal} units <br/>
                  <strong>Emergency Beds:</strong> {hospital.stats?.emergencyAvailable} / {hospital.stats?.emergencyTotal}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HospitalDetailsModal;
