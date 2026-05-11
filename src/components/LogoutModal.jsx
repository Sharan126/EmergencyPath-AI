import React from 'react';
import { LogOut } from 'lucide-react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-container warning">
            <LogOut size={24} className="modal-icon" />
          </div>
          <h2 className="modal-title">Confirm Logout</h2>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to sign out of EmergencyPath? You will stop receiving live alerts and updates.</p>
        </div>
        
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
